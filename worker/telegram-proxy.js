/**
 * Cloudflare Worker: chuyển tiếp đơn từ trang giadatbtb sang Telegram mà KHÔNG lộ Bot Token.
 *
 * Triển khai (miễn phí, khoảng 5 phút):
 *   1. dash.cloudflare.com → Workers & Pages → Create → Worker → dán file này → Deploy.
 *   2. Settings → Variables and Secrets, thêm:
 *        TG_BOT_TOKEN   (Secret)  token lấy từ @BotFather
 *        TG_CHAT_ID     (Text)    chat ID nhận đơn (nhắn /start cho bot trước)
 *        ALLOWED_ORIGIN (Text)    VD: https://nguyennang384.github.io  (nhiều origin cách nhau dấu phẩy)
 *   3. Copy URL Worker (VD https://tbsb-tg.<tên>.workers.dev) vào CONFIG.TG_PROXY_URL trong index.html.
 *
 * Trang gửi POST multipart tới <URL>/sendPhoto (photo + caption), <URL>/sendMediaGroup (photo0..photo9 + caption:
 * ảnh bill và tối đa 3 ảnh Giấy chứng nhận) hoặc <URL>/sendMessage (text).
 * Worker tự gắn chat_id từ biến môi trường, bỏ qua chat_id do trình duyệt gửi.
 * Lưu ý: kiểm tra Origin chỉ chặn trang web khác gọi qua trình duyệt; công cụ ngoài trình duyệt vẫn giả được Origin.
 * Muốn chặn spam kỹ hơn, bật Rate Limiting của Cloudflare cho route này.
 */
const MAX_PHOTO = 5 * 1024 * 1024, MAX_GROUP = 10;
const badPhoto = p => !p || typeof p === 'string' ? 'Thiếu ảnh' : p.size > MAX_PHOTO ? 'Ảnh quá 5 MB' : (p.type && !/^image\//.test(p.type)) ? 'Chỉ nhận ảnh' : '';

export default {
  async fetch(req, env) {
    const origin = req.headers.get('Origin') || '';
    const allowed = String(env.ALLOWED_ORIGIN || '').split(',').map(s => s.trim()).filter(Boolean);
    const okOrigin = !allowed.length || allowed.includes(origin);
    const cors = {
      'Access-Control-Allow-Origin': okOrigin && origin ? origin : (allowed[0] || '*'),
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Vary': 'Origin'
    };
    const json = (obj, status = 200) => new Response(JSON.stringify(obj), { status, headers: { ...cors, 'Content-Type': 'application/json' } });

    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (req.method !== 'POST') return json({ ok: false, description: 'Method not allowed' }, 405);
    if (!okOrigin) return json({ ok: false, description: 'Origin not allowed' }, 403);
    if (!env.TG_BOT_TOKEN || !env.TG_CHAT_ID) return json({ ok: false, description: 'Worker chưa cấu hình TG_BOT_TOKEN / TG_CHAT_ID' }, 500);

    const method = new URL(req.url).pathname.split('/').filter(Boolean).pop();
    if (!['sendPhoto', 'sendMessage', 'sendMediaGroup'].includes(method)) return json({ ok: false, description: 'Not found' }, 404);

    let form;
    try { form = await req.formData(); } catch (e) { return json({ ok: false, description: 'Bad form data' }, 400); }
    const out = new FormData();
    out.set('chat_id', env.TG_CHAT_ID);
    if (method === 'sendPhoto') {
      const photo = form.get('photo'), err = badPhoto(photo);
      if (err) return json({ ok: false, description: err }, 400);
      out.set('photo', photo, 'bill.jpg');
      out.set('caption', String(form.get('caption') || '').slice(0, 1024));
    } else if (method === 'sendMediaGroup') {
      // Tự dựng tham số media (không tin JSON do trình duyệt gửi); chú thích gắn vào ảnh đầu
      const caption = String(form.get('caption') || '').slice(0, 1024), media = [];
      for (let i = 0; i < MAX_GROUP; i++) {
        const p = form.get('photo' + i);
        if (!p) break;
        const err = badPhoto(p);
        if (err) return json({ ok: false, description: err }, 400);
        out.set('photo' + i, p, `anh${i}.jpg`);
        media.push(Object.assign({ type: 'photo', media: 'attach://photo' + i }, i === 0 && caption ? { caption } : {}));
      }
      if (media.length < 2) return json({ ok: false, description: 'Cần từ 2 ảnh' }, 400);
      out.set('media', JSON.stringify(media));
    } else {
      const text = String(form.get('text') || '').slice(0, 4000);
      if (!text) return json({ ok: false, description: 'Thiếu nội dung' }, 400);
      out.set('text', text);
    }
    const r = await fetch(`https://api.telegram.org/bot${env.TG_BOT_TOKEN}/${method}`, { method: 'POST', body: out });
    const body = await r.text();
    return new Response(body, { status: r.status, headers: { ...cors, 'Content-Type': 'application/json' } });
  }
};

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
 * Trang gửi POST multipart tới <URL>/sendPhoto (photo + caption) hoặc <URL>/sendMessage (text).
 * Worker tự gắn chat_id từ biến môi trường, bỏ qua chat_id do trình duyệt gửi.
 * Lưu ý: kiểm tra Origin chỉ chặn trang web khác gọi qua trình duyệt; công cụ ngoài trình duyệt vẫn giả được Origin.
 * Muốn chặn spam kỹ hơn, bật Rate Limiting của Cloudflare cho route này.
 */
const MAX_PHOTO = 5 * 1024 * 1024;

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
    if (method !== 'sendPhoto' && method !== 'sendMessage') return json({ ok: false, description: 'Not found' }, 404);

    let form;
    try { form = await req.formData(); } catch (e) { return json({ ok: false, description: 'Bad form data' }, 400); }
    const out = new FormData();
    out.set('chat_id', env.TG_CHAT_ID);
    if (method === 'sendPhoto') {
      const photo = form.get('photo');
      if (!photo || typeof photo === 'string') return json({ ok: false, description: 'Thiếu ảnh' }, 400);
      if (photo.size > MAX_PHOTO) return json({ ok: false, description: 'Ảnh quá 5 MB' }, 413);
      if (photo.type && !/^image\//.test(photo.type)) return json({ ok: false, description: 'Chỉ nhận ảnh' }, 415);
      out.set('photo', photo, 'bill.jpg');
      out.set('caption', String(form.get('caption') || '').slice(0, 1024));
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

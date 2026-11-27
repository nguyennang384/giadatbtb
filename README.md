# giadatbtb – Hệ thống Tra cứu & THÔNG BÁO SƠ BỘ GIÁ BĐS Nghệ An – Hà Tĩnh

Ứng dụng web một trang, gồm `index.html`, HTML5, Tailwind, JavaScript thuần, Leaflet và html2canvas. Ứng dụng tra **khung giá trị tham chiếu thị trường** cho một thửa đất từ kho dữ liệu thị trường độc lập, rồi xuất ảnh **THÔNG BÁO SƠ BỘ GIÁ** và ảnh **Sơ đồ vị trí & khoảng cách** (`Sodovitri.png`) để gửi qua Zalo.

Ứng dụng chạy thẳng trên GitHub Pages, không cần máy chủ và không cần API key.

> Kết quả chỉ mang tính tham khảo thị trường. Đây không phải văn bản định giá chính thức và không có giá trị pháp lý để làm căn cứ giao dịch, công chứng hay cam kết khoản vốn.

## Tính năng

### Trang khách (4 bước trên điện thoại, giao diện xanh lục bảo – kem)

| Bước | Nội dung |
|---|---|
| 1. Nhu cầu | Lời chào, chọn 1 trong 4 dịch vụ, tự chuyển sang bước 2 |
| 2. Vị trí | Dán link Google Maps (nút Dán) hoặc nhập `Lat, Lng`; bản đồ hiện sẵn để chạm/kéo ghim; nút "Vị trí của tôi" |
| 3. Thông số | Diện tích (m²), Tỷ lệ đất ở (%, nút nhanh 100/80/50/30), Đường (4 loại), Hình dáng (3 mức), Đính kèm Giấy chứng nhận (không bắt buộc, tối đa 3 ảnh, cần tích đồng ý) |
| 4. Thanh toán & Hoàn tất | Tóm tắt + tổng tiền, VietQR (ND `TBSB XXXX`), thẻ ảnh bill, số Zalo 10 chữ số → màn hình hoàn tất có mã đơn + Copy, nút **Gửi nhanh qua Zalo Quản trị (0986.299.731)** và **Tra cứu lô khác** |

| Dịch vụ | Giá |
|---|---|
| Định giá sơ bộ | 150.000đ |
| Check quy hoạch | 150.000đ |
| Combo Định giá + Check quy hoạch (Phổ biến nhất) | 300.000đ |
| Khảo sát thị trường (kiểm tra thực địa) | 500.000đ |

Bản đồ của khách có ghim màu theo loại đường nhưng **không hiện đơn giá**, để không lộ kho giá.

### Tab Quản trị (nút "Quản trị" ở chân trang, hoặc thêm `#quantri` vào link)
- Danh sách đơn đặt trên chính trình duyệt này: SĐT, dịch vụ, trạng thái Telegram, huy hiệu **Có ảnh GCN**, ảnh Bill và GCN xếp cạnh nhau (chạm để phóng to). Bấm **Mở xử lý** để nạp ca.
- Ảnh được nén trên máy khách (rộng tối đa 1.200 px, JPEG 0,75) và lưu trong IndexedDB, nên không làm đầy localStorage.
- Dán tin nhắn Zalo / Telegram có dòng `#SBG2|...` để đọc ca từ máy khách.
- Bản đồ Leaflet: ghim màu theo loại đường hoặc khung giá, ghim xanh 1-2-3 nối nét đứt, ghim xám tham khảo; chạm thẻ để bật/tắt điểm.
- Công cụ bổ trợ: chiết trừ – hao mòn, vốn hóa thu nhập, thặng dư.
- Xuất **THÔNG BÁO SƠ BỘ GIÁ (PNG)** và **Sơ đồ vị trí (`Sodovitri.png`)**.

## Thuật toán (tóm tắt)

1. Lọc điểm cùng loại đường (1–4), chỉ lấy trong cùng huyện/thị/thành phố.
2. Giữ điểm trong bán kính Haversine: 2.000 m (đô thị) hoặc 5.000 m (nông thôn).
   - Thiếu điểm thì nới bán kính gấp đôi.
   - Vẫn thiếu thì mượn loại đường liền kề, có quy đổi hệ số.
3. Chuẩn hóa chiều sâu: phần ≤ 25 m tính 100%, phần vượt tính 55–60%.
4. Lọc nhiễu: loại điểm lệch quá ±25% so với trung vị (khi có từ 4 điểm).
5. Lấy 5 điểm gần nhất. Mặc định đưa 3 điểm vào công thức, với trọng số `W = 1/(d² + 100)`.
6. Nhân hệ số hình dáng (cố định): Vuông 1,00 · Không vuông 0,98 · Kém 0,90.
   - Giá trị đất = Đơn giá × (Diện tích đất ở + Diện tích vườn × 35%).
7. Kiểm soát chênh lệch giữa mức giá đại diện và từng mức giá chỉ dẫn:
   - ≤ 10%: đạt
   - 10–15%: cảnh báo
   - > 15%: không đạt
8. Tính khung giá trị, độ tin cậy A/B/C và mức tham chiếu vốn dự kiến (70% – 80% mức thấp của khung).

Chi tiết công thức nằm trong `.claude/skills/tinh-gia-bds/SKILL.md` và `docs/`.

## Dữ liệu (Google Sheets)

Sheet có 7 cột:

| Tọa độ (Lat, Lng) | Khu vực | Diện tích (m2) | Mặt tiền (m) | Loại đường (1-4) | Đơn giá đất tham chiếu (tr/m2) | Ghi chú đặc điểm |
|---|---|---|---|---|---|---|
| "18.6712, 105.6990" | P. Hà Huy Tập, TP Vinh | 100 | 5 | 2 | 42 | Đường ô tô tránh |

- Cột "Khu vực" nên ghi dạng `<phường/xã>, <huyện/thị/TP>`. Hệ thống dùng phần sau dấu phẩy để không lấy nhầm điểm khác địa bàn.
- Chia sẻ Sheet ở chế độ "Bất kỳ ai có link", sau đó dán link vào **Cài đặt → Đồng bộ Google Sheets**.
- Lưu ý: link CSV công khai cho phép bất kỳ ai tải toàn bộ kho giá.

## Cấu hình cho điện thoại khách (`CONFIG` đầu mã nguồn)

Cài đặt trong tab Quản trị và danh sách đơn chỉ lưu trong trình duyệt của máy đang mở (localStorage). Điện thoại khách không đọc được. Vì vậy các giá trị dưới đây phải điền thẳng vào khối `CONFIG` trong `index.html` rồi đẩy lên GitHub:

| Khóa | Dùng để | Ghi chú |
|---|---|---|
| `PAY_BIN`, `PAY_ACC`, `PAY_NAME` | VietQR trên máy khách | Bắt buộc. Để trống thì khách thấy tài khoản mẫu `0000000000` |
| `SHEET_CSV` | Ghim dữ liệu thật trên bản đồ khách | Link CSV công khai: ai có link tải được toàn bộ kho giá |
| `TG_PROXY_URL` | Báo đơn kèm ảnh bill về Telegram | **Khuyến nghị.** URL Cloudflare Worker, token nằm trên máy chủ |
| `TG_BOT_TOKEN`, `TG_CHAT_ID` | Như trên, gọi thẳng Telegram | **Không khuyến nghị**: ai xem mã nguồn cũng đọc được token |
| `ADMIN_ZALO` | Nút Zalo quản trị | Mặc định `0986299731` |

### Dựng Cloudflare Worker cho Telegram (miễn phí)
1. Tạo bot với @BotFather, nhắn `/start` cho bot, lấy chat ID.
2. Cloudflare → Workers & Pages → Create Worker → dán `worker/telegram-proxy.js` → Deploy.
3. Thêm biến: `TG_BOT_TOKEN` (Secret), `TG_CHAT_ID`, `ALLOWED_ORIGIN` = `https://nguyennang384.github.io`.
4. Điền URL Worker vào `CONFIG.TG_PROXY_URL`, commit, push.

Chưa dựng Worker thì đơn từ máy khách chỉ đến được qua nút Zalo (khách tự dán nội dung và gửi ảnh bill).

## Triển khai GitHub Pages

1. Vào **Settings → Pages**.
2. Chọn Source: *Deploy from a branch*, Branch: `main`, thư mục `/ (root)`.
3. Truy cập `https://nguyennang384.github.io/giadatbtb/`.

GPS cần HTTPS; GitHub Pages đã có sẵn.

## Lưu ý kỹ thuật & rủi ro

| Vấn đề | Ảnh hưởng | Cách xử lý trong app |
|---|---|---|
| Tile Google (`mt1.google.com/vt`) gọi trực tiếp, không qua Google Maps Platform | Không đúng điều khoản sử dụng của Google, có thể bị chặn hoặc đổi bất kỳ lúc nào | Tự chuyển nền dự phòng Esri / OSM khi tile lỗi; có nút "Dự phòng" |
| Ảnh `Sodovitri.png` cần tile có CORS | Nếu nguồn không cho phép, canvas không chụp được nền | Thử lần lượt Google → Esri / OSM. Nếu tất cả lỗi thì dùng lưới tọa độ và báo rõ trên giao diện |
| Bản tĩnh không có máy chủ | Đơn và cài đặt lưu theo từng trình duyệt; tab Quản trị không có mật khẩu thật; toàn bộ dữ liệu và thuật toán nằm trong trình duyệt | Nhận đơn qua Telegram (Worker) và Zalo; đối soát chuyển khoản thủ công theo ND `TBSB XXXX` |
| Ảnh bill do khách tải lên | Có thể là ảnh giả hoặc ảnh cũ | Luôn đối chiếu sao kê theo mã đơn trước khi xử lý |
| Trọng số `1/(d² + 100)` | Điểm gần nhất có thể chiếm hơn 90% trọng số | Cân nhắc `1/(d + 100)²` hoặc giới hạn trọng số mỗi điểm |
| Hệ số địa phương | Chưa đối chiếu văn bản gốc | Khóa trong khung cho phép, chỉnh ở **Cài đặt** |

## Kiểm tra tuân thủ ngôn ngữ

Danh sách từ cấm nằm ở `.claude/skills/tinh-gia-bds/tu-cam.txt`. Chạy lệnh sau trước mỗi lần phát hành:

```bash
LC_ALL=C.UTF-8 grep -inEf .claude/skills/tinh-gia-bds/tu-cam.txt index.html README.md .claude/skills/tinh-gia-bds/SKILL.md
```

Kết quả phải rỗng.

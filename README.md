# giadatbtb – Hệ thống Tra cứu & THÔNG BÁO SƠ BỘ GIÁ BĐS Nghệ An – Hà Tĩnh

Ứng dụng web một trang, gồm `index.html`, HTML5, Tailwind, JavaScript thuần, Leaflet và html2canvas. Ứng dụng tra **khung giá trị tham chiếu thị trường** cho một thửa đất từ kho dữ liệu thị trường độc lập, rồi xuất ảnh **THÔNG BÁO SƠ BỘ GIÁ** và ảnh **Sơ đồ vị trí & khoảng cách** (`Sodovitri.png`) để gửi qua Zalo.

Ứng dụng chạy thẳng trên GitHub Pages, không cần máy chủ và không cần API key.

> Kết quả chỉ mang tính tham khảo thị trường. Đây không phải văn bản định giá chính thức và không có giá trị pháp lý để làm căn cứ giao dịch, công chứng hay cam kết khoản vốn.

## Tính năng

### Tab "Tra cứu & Gửi yêu cầu"

**Chọn vị trí trên bản đồ**
- Chạm bản đồ, kéo ghim cam hoặc bấm **Vị trí hiện tại (GPS)**. Vẫn dán được link Google Maps hoặc nhập tọa độ như cũ.
- Thẻ tọa độ nổi trên bản đồ hiện Lat, Lng theo thời gian thực, có nút Copy.
- Lớp nền gồm **Vệ tinh + tên đường** và **Giao thông**, chuyển ở góc dưới phải. Có nền dự phòng Esri / OpenStreetMap.

**Ghim và danh sách điểm đối chiếu**
- Ghim màu cho toàn bộ kho dữ liệu, tô màu theo loại đường hoặc theo khung giá, kèm chú thích.
- Danh sách 5 điểm dữ liệu đối chiếu gần nhất:
  - 3 ghim xanh đánh số 1-2-3 được đưa vào công thức;
  - các ghim xám là điểm tham khảo mở rộng.
- Chạm vào một điểm để bật/tắt nó; khung giá được tính lại ngay.

**Gói dịch vụ**
- Nhóm A, hội viên tra tự động không giới hạn:
  - 1 tháng: 299.000đ
  - 3 tháng: 790.000đ
  - 6 tháng: 1.390.000đ
- Mã QR được tạo theo SĐT, nội dung chuyển khoản `TBSB 1T/3T/6T <SĐT>`.
- Nhóm B, gói lẻ:
  - Tra nhanh: 49.000đ
  - Thông báo sơ bộ + quy hoạch từ xa: 300.000đ
  - Khảo sát thực địa: 500.000đ
- Gói lẻ có mã `TBSB-XXXX`, VietQR động và nút Copy gửi Zalo.

### Tab "Quản trị hệ thống"
- Đọc yêu cầu từ tin nhắn Zalo (dòng `#SBG|...`).
- Xem từng bước lọc dữ liệu: loại đường, bán kính, lọc nhiễu, kiểm soát chênh lệch.
- Công cụ bổ trợ: chiết trừ – hao mòn, vốn hóa thu nhập, thặng dư. Kết quả được đối chiếu lên thông báo.
- Xuất **THÔNG BÁO SƠ BỘ GIÁ (PNG)** và **Sơ đồ vị trí (PNG)**.

## Thuật toán (tóm tắt)

1. Lọc điểm cùng loại đường (1–4), chỉ lấy trong cùng huyện/thị/thành phố.
2. Giữ điểm trong bán kính Haversine: 2.000 m (đô thị) hoặc 5.000 m (nông thôn).
   - Thiếu điểm thì nới bán kính gấp đôi.
   - Vẫn thiếu thì mượn loại đường liền kề, có quy đổi hệ số.
3. Chuẩn hóa chiều sâu: phần ≤ 25 m tính 100%, phần vượt tính 55–60%.
4. Lọc nhiễu: loại điểm lệch quá ±25% so với trung vị (khi có từ 4 điểm).
5. Lấy 5 điểm gần nhất. Mặc định đưa 3 điểm vào công thức, với trọng số `W = 1/(d² + 100)`.
6. Nhân hệ số hình dáng:
   - Vuông vắn: 1,00
   - Nở hậu: 1,03–1,05
   - Thóp hậu: 0,92–0,95
   - Chữ L / đâm đường: 0,85–0,90
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
| Bản tĩnh không có máy chủ | Không tự khóa được quyền hội viên hay số lượt tra; toàn bộ dữ liệu và thuật toán nằm trong trình duyệt | Kích hoạt hội viên thủ công qua đối soát chuyển khoản. Cần máy chủ (VD: Cloudflare Worker) nếu muốn thu phí thật |
| Trọng số `1/(d² + 100)` | Điểm gần nhất có thể chiếm hơn 90% trọng số | Cân nhắc `1/(d + 100)²` hoặc giới hạn trọng số mỗi điểm |
| Hệ số địa phương | Chưa đối chiếu văn bản gốc | Khóa trong khung cho phép, chỉnh ở **Cài đặt** |

## Kiểm tra tuân thủ ngôn ngữ

Danh sách từ cấm nằm ở `.claude/skills/tinh-gia-bds/tu-cam.txt`. Chạy lệnh sau trước mỗi lần phát hành:

```bash
LC_ALL=C.UTF-8 grep -inEf .claude/skills/tinh-gia-bds/tu-cam.txt index.html README.md .claude/skills/tinh-gia-bds/SKILL.md
```

Kết quả phải rỗng.

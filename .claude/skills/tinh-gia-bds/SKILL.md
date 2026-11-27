---
name: tinh-gia-bds
description: Tính khung giá trị tham chiếu BĐS Nghệ An – Hà Tĩnh theo 4 phương pháp (so sánh có lọc không gian, chiết trừ – hao mòn, vốn hóa thu nhập, thặng dư) và xuất "THÔNG BÁO SƠ BỘ GIÁ"; dùng khi tra giá, chốt đơn giá, viết code/Excel cho giadatbtb.
---

# Kỹ năng tính giá BĐS – "Thông báo sơ bộ giá" (giadatbtb)

## 0. Phạm vi, nguồn và quy tắc ngôn ngữ

**Nguồn đã đối chiếu trong dự án:**
- Giáo trình Định giá đất & BĐS, Chương 3 → `cong-thuc-tinh-gia-chuan.md`
- Dự thảo thông tư về phương pháp thặng dư → `quy-tac-tinh-gia.md`

**Nguồn chưa đối chiếu (gắn nhãn [CĐC]):** tài liệu AVM Citics, Bảng điều chỉnh Hoàng Quân, NĐ 71/2024/NĐ-CP, TT 32/2024. Các file này chưa có trong dự án. Thông số mang nhãn này lấy theo yêu cầu của chủ dự án và phải kiểm lại khi có văn bản gốc.

**Nhãn nguồn:**

| Nhãn | Ý nghĩa |
|---|---|
| [GT] | Giáo trình |
| [DT] | Dự thảo thông tư |
| [CĐC] | Chưa đối chiếu |
| [GĐ] | Giả định, chờ kiểm chứng (backtest) |

**Quy tắc ngôn ngữ (bắt buộc với mọi đầu ra: UI, ảnh, văn bản, code hiển thị):**
- Không dùng bất kỳ từ nào trong danh sách từ cấm lưu tại `tu-cam.txt` (cùng thư mục skill; tách riêng để chính file này cũng sạch). Danh sách gồm tên gọi loại hình tổ chức cấp vốn, tên nghề/văn bản định giá chính thức và các từ viết tắt tài sản. Tên đơn vị nhận tiền hiển thị bằng mã (VCB, BIDV, MB…).
- Dùng thuật ngữ thay thế:
  - BĐS mục tiêu / thửa đất cần tra cứu
  - Điểm đối chiếu / BĐS so sánh
  - Mức giá chỉ dẫn
  - Khung giá trị tham chiếu thị trường
  - Mức tham chiếu vốn dự kiến (70% – 80%)
  - Người xử lý / phân tích viên
  - Mã TBSB-xxxx
- Mọi kết quả luôn kèm khuyến cáo: "không phải văn bản định giá chính thức, không có giá trị pháp lý để làm căn cứ giao dịch, công chứng hay cam kết khoản vốn".
- Kiểm tra bắt buộc trước khi giao:
  `LC_ALL=C.UTF-8 grep -inEf .claude/skills/tinh-gia-bds/tu-cam.txt index.html README.md .claude/skills/tinh-gia-bds/SKILL.md` phải trả về 0 dòng.

**Đơn vị:** đơn giá tính bằng tr/m², giá trị bằng triệu đồng, khoảng cách bằng mét.

**Chọn phương pháp:**

| Loại BĐS | Phương pháp chính | Kiểm tra chéo |
|---|---|---|
| Đất ở, nhà phố có điểm đối chiếu gần | Trụ cột 1 | Trụ cột 2 (nếu có nhà) |
| Nhà + đất | Trụ cột 2, rồi đưa kết quả vào Trụ cột 1 | Trụ cột 3 nếu đang cho thuê |
| Nhà phố / mặt bằng cho thuê | Trụ cột 3 | Trụ cột 1 |
| Đất diện tích lớn phân lô, nhà cũ phá dỡ | Trụ cột 4 | Trụ cột 1 |

Khi dữ liệu thưa hoặc thị trường biến động, dùng **tối thiểu 2 phương pháp** [GT]. Kết quả hai phương pháp lệch nhau quá ±20% thì không phát hành tự động, chuyển người xử lý [GĐ].

---

## 1. Trụ cột 1 – So sánh & lọc dữ liệu không gian

### 1.1 Pipeline (thứ tự bắt buộc)

| Bước | Quy tắc | Nhãn |
|---|---|---|
| 1. Lọc loại đường | Giữ điểm cùng `Loại đường (1–4)` với thửa mục tiêu | [CĐC] |
| 2. Lọc bán kính | Haversine ≤ **2.000 m** (đô thị: phường, thị trấn) hoặc ≤ **5.000 m** (nông thôn: xã) | [CĐC] |
| 3. Thiếu mẫu (< 3 điểm) | Nới bán kính ×2. Nếu vẫn thiếu, mượn điểm loại đường liền kề (±1) và quy đổi theo `ROAD_K = {1: 1.00, 2: 0.60, 3: 0.45, 4: 0.30}`. Hạ độ tin cậy | [GĐ] |
| 4. Chuẩn hóa | Đưa đơn giá điểm đối chiếu về chiều sâu chuẩn: `std = price / kDepth(depth_comp)` | [SL] |
| 5. Lọc nhiễu | Chỉ khi **n ≥ 4**: loại điểm có \|std/median − 1\| > **25%** (median đúng nghĩa: n chẵn lấy trung bình 2 giá trị giữa) | [CĐC] |
| 5b. Xếp hạng | Lấy **5 điểm gần nhất** sau lọc: mặc định **3 điểm đầu vào công thức** (ghim xanh 1-2-3), 2 điểm còn lại là tham khảo mở rộng (ghim xám). Người dùng bật/tắt từng điểm, tối thiểu 2 điểm | [Chủ dự án] |
| 6. Trọng số | **W_i = 1 / (d_i² + 100)**, d tính bằng mét | [CĐC] |
| 7. Đơn giá chuẩn | `base = Σ(W_i × std_i) / ΣW_i` | |
| 8. Áp hệ số thửa mục tiêu | `unit = base × kDepth(D) × kShape`. D = Diện tích / Mặt tiền khi có mặt tiền; chưa có mặt tiền thì `kDepth = 1` | |
| 8b. Giá trị đất | `Đất = unit × (S_ở + S_vườn × 35%)`, xem 1.2 | [Chủ dự án] |
| 9. Kiểm soát | Chênh lệch giữa mức giá đại diện và **từng** mức giá chỉ dẫn: ≤ 10% đạt; 10–15% cảnh báo; > 15% không đạt, phải loại điểm hoặc bổ sung mẫu | [GT 10%] / [CĐC 15%] |

```js
const R = 6371000, rad = x => x * Math.PI / 180;
const haversine = (a, b) => 2 * R * Math.asin(Math.sqrt(
  Math.sin(rad(b.lat - a.lat) / 2) ** 2 +
  Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(rad(b.lng - a.lng) / 2) ** 2));
const median = a => { const s = [...a].sort((x, y) => x - y), m = s.length >> 1;
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
const weight = d => 1 / (d * d + 100);
```

### 1.2 Hệ số đặc thù Nghệ An – Hà Tĩnh [CĐC]

**Chiều sâu:** phần ≤ 25 m tính 100% đơn giá; phần vượt 25 m tính hệ số **0,55–0,60** (mặc định 0,60).

```
kDepth(D) = (min(D, 25) + k_deep × max(0, D − 25)) / D
```
Ví dụ: D = 32 m, k = 0,6 → (25 + 0,6×7)/32 = **0,9125**.
Excel: `=(MIN(D2,25)+0.6*MAX(0,D2-25))/D2`

**Hình dáng (hệ số cố định, thay khung cũ Nở hậu / Thóp hậu / Chữ L):** [Chủ dự án]

| Mã | Hình dáng | Hệ số |
|---|---|---|
| VU | Vuông | 1,00 |
| KV | Không vuông | 0,98 |
| KEM | Kém (méo, chữ L, đâm đường) | 0,90 |

Mã cũ trong tin nhắn `#SBG|...` được quy đổi: VU, NO → VU; TH → KV; LD → KEM.

**Tỷ lệ đất ở & đất vườn:** [Chủ dự án]
- Khách nhập Diện tích S và Tỷ lệ đất ở r (mặc định 100%, nút nhanh 100 / 80 / 50 / 30).
- `S_ở = S × r`, `S_vườn = S × (1 − r)`.
- Đất ở tính 100% đơn giá đất ở; đất vườn, phần còn lại tính **35%** đơn giá đất ở.
- `Giá trị đất = unit × (S_ở + 0,35 × S_vườn)`.
- Dính hành lang: diện tích trừ hành lang trừ vào đất ở trước, thừa mới trừ vào vườn (thận trọng).
- Ví dụ: S = 200, r = 80%, unit = 41,17 → 41,17 × (160 + 0,35 × 40) = 41,17 × 174 = **7.164 tr**.
- Excel: `=Unit*(S*r+0.35*S*(1-r))`

### 1.3 Nguyên tắc điều chỉnh từng yếu tố [GT tr.77–92]

- Thửa mục tiêu làm chuẩn: điểm đối chiếu **kém hơn → cộng (+)**, **tốt hơn → trừ (−)**.
- Quy đổi %: `(Hệ số mục tiêu − Hệ số so sánh) / Hệ số so sánh`.
  - Ví dụ: ngõ 10m (100%) so với 8m (90%) → +11,11%.
- Gộp điều chỉnh:
  - Nhóm giao dịch (pháp lý, thanh toán, thời điểm) **nhân liên tiếp**.
  - Nhóm đặc điểm (vị trí, kích thước, hướng, thoát nước…) **cộng gộp**.
- Chọn mức giá đại diện theo thứ tự:
  1. Tổng điều chỉnh gộp (Σ|adj|) nhỏ nhất;
  2. Ít lần điều chỉnh nhất;
  3. Biên độ từng yếu tố nhỏ nhất.

### 1.4 Khung giá trị & độ tin cậy [GĐ]

```
spread = min(0.25, max(0.08, 1.5·CV) + 0.05·borrowed + 0.05·(avgD > 5 km))
Khung = Tổng × (1 ± spread)
Mức tham chiếu vốn = Mức thấp của khung × 70% – 80%
```

| Hạng | Điều kiện |
|---|---|
| A | n ≥ 3, CV ≤ 10%, kiểm soát ≤ 10%, không mượn đường, không nới bán kính |
| C | n < 3, hoặc CV > 20%, hoặc kiểm soát > 15% |
| B | Còn lại |

---

## 2. Trụ cột 2 – Chiết trừ & hao mòn công trình [GT tr.96–106] [CĐC TT32/2024]

```
V_công_trình = S_sàn × ĐG_xây_mới × (1 − Tỷ_lệ_hao_mòn)
Giá trị đất  = Giá giao dịch − Tài sản không phải BĐS − V_công_trình
Đơn giá đất thuần = Giá trị đất / Diện tích thửa      → đưa vào Trụ cột 1
V_BĐS mục tiêu = Đơn giá đất × Diện tích + V_công_trình (mục tiêu)
```

**Hao mòn, cách A – tuổi đời:**
`HM = Tuổi đời hiệu quả / Tuổi đời kinh tế`
(tuổi đời kinh tế = tuổi đời hiệu quả + tuổi đời kinh tế còn lại)

**Hao mòn, cách B – kết cấu chính:**
`HM = Σ(H_i × T_i) / ΣT_i`, với H_i = 1 − % chất lượng còn lại của kết cấu i.

| Kết cấu | Tỷ trọng mặc định [GĐ] |
|---|---|
| Móng | 10% |
| Khung, cột, dầm | 30% |
| Tường | 20% |
| Mái | 20% |
| Nền, sàn | 20% |

Excel: `=SUMPRODUCT(T2:T6,1-C2:C6)/SUM(T2:T6)`

**Hao mòn, cách C – chiết trừ thị trường:**
`HM/năm = (Chi phí XD mới − Giá trị nhà chiết ra) / Chi phí XD mới / Tuổi đời hiệu quả`
Lấy bình quân của các điểm đối chiếu, rồi nhân với tuổi đời hiệu quả của BĐS mục tiêu.

**Khung đơn giá xây mới tham chiếu Nghệ An – Hà Tĩnh** [CĐC]:

| Loại nhà | tr/m² sàn | Mặc định |
|---|---|---|
| Nhà cấp 4 | 2,5 – 3,5 | 3,0 |
| Nhà 2–3 tầng | 5,5 – 6,5 | 6,0 |
| Nhà 4+ tầng / biệt thự | 6,5 – 8,0 | 7,25 |

**Cờ cảnh báo:**
- Giá trị công trình > 70% giá giao dịch → đơn giá đất chiết ra kém tin cậy.
- Đơn giá xây mới ngoài khung → cảnh báo.
- Hao mòn lỗi thời chức năng = chi phí khắc phục − chi phí nếu thiết kế đúng từ đầu.

---

## 3. Trụ cột 3 – Vốn hóa thu nhập (nhà phố, mặt bằng cho thuê) [GT tr.106–115]

```
Doanh thu năm (PGI) = Giá thuê tháng × 12
I (NOI) = PGI × (1 − Tỷ lệ trống [10%] − Thất thu nợ dây dưa [0–2%]) − Chi phí vận hành, duy tu
V = I / R          (R khu vực phổ biến 10% – 14%/năm [CĐC])
```

- Chi phí vận hành **không gồm khấu hao** [GT].
- R ưu tiên rút từ thị trường: `R = NOI / Giá bán` của BĐS cho thuê tương tự, lấy bình quân [GT].
- Kiểm tra chéo R bằng phương pháp đầu tư: `R = M×Rm + (1−M)×Re` [GT].
- Dòng thu nhập không đều → dùng DCF:
  `V = Σ CF_t/(1+r)^t + V_n/(1+r)^n`, với `V_n = NOI_(n+1)/R`.

Ví dụ [GT]: (360 − 10 − 98) / 12% = **2.100 tr**.
Excel: `=(Thue_thang*12*(1-Trong-NoXau)-ChiPhi)/R`

---

## 4. Trụ cột 4 – Thặng dư (đất lớn phân lô, nhà cũ phá dỡ) [DT] [GT tr.117–124]

```
Một kỳ:   V = DT − CP
Nhiều kỳ: V = Σ_{t=0..n} (DT_t − CP_t) / (1 + r)^t
```

- **DT** = tổng doanh thu bán lô / sản phẩm sau tách thửa, phát triển (giá bán lấy từ Trụ cột 1).
- **CP** gồm:
  - phá dỡ, san lấp, hạ tầng kỹ thuật cơ bản;
  - thuế, phí;
  - quản lý, bán hàng;
  - lãi vay;
  - **lợi nhuận nhà đầu tư = % × (CP không gồm lãi vay)** [DT].
- **Không tính** chi phí bồi thường, hỗ trợ, tái định cư (GPMB) [DT].
- r = lãi suất cho vay trung hạn BĐS bình quân trên địa bàn [DT].
- Giáo trình tính lợi nhuận bằng 20% doanh thu và có tính bồi thường. Cách này **không dùng**, vì mâu thuẫn với [DT].
- Độ nhạy: DT giảm 10% → V giảm khoảng 13–15%. Luôn đối chiếu với Trụ cột 1.

Excel: `=SUMPRODUCT((B2:B12-C2:C12)/(1+r)^A2:A12)` (cột A = t bắt đầu từ 0).
Chi tiết hạng mục và ví dụ: `quy-tac-tinh-gia.md`.

---

## 5. Checklist trước khi phát hành Thông báo sơ bộ giá

- [ ] Tọa độ nằm trong Nghệ An – Hà Tĩnh; loại đường đúng thực tế.
- [ ] Có ít nhất 3 điểm đối chiếu sau lọc; ghi rõ có nới bán kính hoặc mượn đường hay không.
- [ ] Kiểm soát chênh lệch ≤ 15% (lý tưởng ≤ 10%).
- [ ] Phần sâu > 25 m đã chiết giảm (khi có mặt tiền); hình dáng đúng 1 trong 3 mức 1,00 / 0,98 / 0,90.
- [ ] Tỷ lệ đất ở khớp giấy chứng nhận; phần vườn tính 35% đơn giá đất ở.
- [ ] Công trình đã trừ hao mòn; đơn giá xây mới nằm trong khung.
- [ ] Nếu dùng Trụ cột 3 hoặc 4: lệch so với Trụ cột 1 không quá ±20%.
- [ ] Quy hoạch: ghi trạng thái; nếu dính hành lang, đã trừ diện tích.
- [ ] Đã quét từ cấm (0 dòng); có khuyến cáo miễn trừ, hiệu lực 30 ngày.
- [ ] Gửi kèm ảnh `Sodovitri.png` (3 điểm 1-2-3 khớp với điểm đang tính trong công thức).

---

## 6. Bản đồ & ghim (giao diện giadatbtb)

**Thư viện và lớp nền**
- Thư viện: Leaflet 1.9.4 (unpkg). Tâm mặc định: `18.6795, 105.6813`.
- Lớp nền chuyển nhanh ở góc dưới phải:
  - **Vệ tinh + tên đường**: `lyrs=y` (mặc định)
  - **Giao thông**: `lyrs=m`
- Dự phòng: tự chuyển sang Esri World Imagery / OpenStreetMap khi tile Google lỗi; có nút "Dự phòng" để chuyển tay.
- Cảnh báo pháp lý: gọi tile `mt1.google.com` trực tiếp không nằm trong điều khoản Google Maps Platform và có thể bị chặn bất kỳ lúc nào.

**Hai bản đồ**

| Bản đồ | Nơi dùng | Nội dung |
|---|---|---|
| Bản đồ khách | Bước 1, nút "Chạm chọn ghim trên bản đồ" | Ghim cam kéo/chạm để chọn vị trí; ghim kho dữ liệu tô theo loại đường. Popup chỉ có khu vực và loại đường, **không hiện đơn giá** (tránh lộ kho giá miễn phí) |
| Bản đồ quản trị | Tab Quản trị, mục 2 | Ghim kho dữ liệu tô theo loại đường hoặc khung giá, popup có đơn giá; ghim xanh 1-2-3 nối nét đứt; ghim xám tham khảo; kéo ghim cam để đổi tọa độ ca |

**Thẻ tọa độ nổi** trên bản đồ khách hiện Lat, Lng, nguồn cập nhật kèm giờ, có nút Copy.

**Quy ước màu ghim**

| Ghim | Ý nghĩa |
|---|---|
| Cam (giọt nước) | Vị trí tra cứu |
| Xanh dương đánh số 1-2-3 | Điểm dữ liệu đối chiếu đưa vào công thức. Có nét đứt nối từ ghim cam |
| Xám | Điểm tham khảo mở rộng (trong 5 điểm gần nhất, không đưa vào công thức) |

**Ghim kho dữ liệu:**
- Theo loại đường: Đỏ = loại 1, Cam = loại 2, Xanh dương = loại 3, Xanh lá = loại 4.
- Theo khung giá (chỉ bản đồ quản trị): Xanh lá < 10 tr, Xanh dương 10–25 tr, Cam 25–50 tr, Đỏ > 50 tr.

**Danh sách điểm (tab Quản trị):** 5 điểm gần nhất sau lọc kèm điểm bị loại nhiễu. Chạm thẻ để bật/tắt điểm, tối thiểu 2 điểm; số thứ tự, đơn giá gợi ý và ảnh Sodovitri tính lại theo lựa chọn.

## 7. Ảnh "Sơ đồ vị trí & khoảng cách" (`Sodovitri.png`)

**Khổ ảnh:** 800 × 450 (16:9), xuất ở scale 2x thành 1600 × 900.

**Bố cục**
- **Trái 65% (520 px):** nền bản đồ tự căn khung ôm ghim cam và 3 ghim xanh 1-2-3. Có nét đứt kèm nhãn khoảng cách (m), thước tỷ lệ và dòng ghi nguồn nền.
- **Phải 35% (280 px):** tiêu đề "Thông tin khoảng cách, tọa độ". Liệt kê Vị trí tra cứu và các điểm 1, 2, 3, mỗi điểm gồm ghim, khoảng cách (m), đơn giá và tọa độ Lat, Lng.

**Cách dựng nền bản đồ**
- Không chụp trực tiếp khung Leaflet, vì html2canvas dựng sai transform và tile khác nguồn.
- Thay vào đó, tải tile với `crossOrigin` theo thứ tự nguồn rồi vẽ lên canvas:
  - Vệ tinh: Google → Esri.
  - Giao thông: Google → OSM.
- Nếu mọi nguồn đều lỗi: dùng lưới tọa độ và báo rõ cho người dùng.
- Cột chữ bên phải ghép bằng html2canvas.

**Khoảng cách:** đường chim bay (Haversine), làm tròn đến mét.

## 8. Dịch vụ & luồng đặt yêu cầu (4 bước)

| Mã | Dịch vụ | Giá |
|---|---|---|
| `dg` | Định giá sơ bộ | 150.000đ |
| `qh` | Check quy hoạch | 150.000đ |
| `combo` | Combo Định giá + Check quy hoạch (Phổ biến nhất) | 300.000đ |
| `ks` | Khảo sát thị trường (kiểm tra thực địa) | 500.000đ |

Gói hội viên 1/3/6 tháng và gói tra nhanh 49.000đ **đã bỏ**.

**Các bước** (thanh tiến trình 4 vạch: 1. Nhu cầu → 2. Vị trí → 3. Thông số → 4. Thanh toán & Hoàn tất)
1. **Nhu cầu:** chọn 1 trong 4 thẻ, tự chuyển sang bước Vị trí.
2. **Vị trí:** dán link Google Maps (`@lat,lng`, `?q=lat,lng`) hoặc nhập `Lat, Lng` (có nút Dán), bản đồ hiện sẵn để chạm/kéo ghim, nút "Vị trí của tôi" (GPS). Chặn nếu ngoài Nghệ An – Hà Tĩnh.
3. **Thông số:** Diện tích (m²), Tỷ lệ đất ở (%), Đường (1–4), Hình dáng (VU / KV / KEM), Đính kèm Giấy chứng nhận (không bắt buộc, tối đa 3 ảnh: trang thông tin thửa đất và trang sơ đồ). Có ảnh thì khách phải tích ô đồng ý gửi ảnh mới đi tiếp.
4. **Thanh toán:** tóm tắt (có dòng `Giấy chứng nhận: Đã đính kèm X ảnh / Chưa đính kèm`) + mã `TBSB-XXXX`; VietQR đúng số tiền, nội dung `TBSB XXXX`; ảnh bill (chụp hoặc chọn ảnh có sẵn); số Zalo 10 chữ số. Nút "Hoàn tất" chỉ bật khi số Zalo hợp lệ; thiếu bill chỉ cảnh báo nhẹ.
5. **Hoàn tất** (vẫn thuộc vạch 4): lưu đơn, gửi Telegram (nếu cấu hình), hiện khung mã đơn có nút Copy, nút "Gửi nhanh qua Zalo Quản trị (0986.299.731)" (copy nội dung đơn rồi mở `https://zalo.me/0986299731`) và nút "Tra cứu lô khác".
   - Tiêu đề "Đã gửi yêu cầu thành công!" chỉ hiện khi Telegram xác nhận đã nhận. Chưa cấu hình hoặc gửi lỗi thì hiện "Còn 1 bước: gửi yêu cầu qua Zalo" để khách không tưởng đơn đã tới quản trị.

**Giao diện:** nền kem `#FBF8F3`, thẻ trắng viền `#E6E2D8`, màu chính xanh lục bảo `#0D4A3E`, nhấn hổ phách `#F4C16B` / `#D97706`, thành công `#16A34A`, chữ `#1E242B` / `#64748B`; khung tối đa 440px. Ảnh xuất (THÔNG BÁO SƠ BỘ GIÁ, Sodovitri.png) giữ bảng màu cố định riêng.

**Mã đơn trong tin nhắn** (dán vào tab Quản trị để đọc lại):
```
#SBG2|<mã>|<lat>|<lng>|<diện tích>|<tỷ lệ đất ở %>|<VU|KV|KEM>|<loại đường>|<dịch vụ>|<SĐT>|<số ảnh GCN>
```
Mã cũ `#SBG|mã|lat|lng|mt|sau|hình|đường|...` vẫn đọc được (diện tích = mt × sâu, tỷ lệ đất ở 100%).

## 9. Lưu đơn & giới hạn của bản tĩnh

- **Nén ảnh trên máy khách:** ảnh GCN và ảnh bill thu chiều rộng về tối đa 1.200 px (cao tối đa 4.000 px), JPEG chất lượng 0,75. Ảnh 3000×4000 còn khoảng 1200×1600.
- Thông tin đơn lưu `localStorage['tbsb_orders']` (tối đa 30 đơn, mỗi đơn vài trăm byte). Ảnh bill + GCN lưu riêng trong **IndexedDB** (`tbsb/imgs`, khóa `mã-thời điểm`), không chiếm localStorage.
- Đầy bộ nhớ IndexedDB: xóa ảnh của các đơn ngoài 10 đơn mới nhất rồi lưu lại; vẫn lỗi thì đơn ghi "Ảnh đã xóa do đầy bộ nhớ" (thông tin đơn vẫn giữ, ảnh vẫn có trên Telegram).
- Ảnh GCN là dữ liệu cá nhân: chỉ gửi khi khách tích đồng ý; câu cam kết hiển thị là "chỉ dùng để đối chiếu thông số kỹ thuật cho yêu cầu này và không chia sẻ cho bên thứ ba". **Không** ghi "mã hóa", vì ảnh lưu và gửi ở dạng thường.
- **localStorage chỉ nằm trên trình duyệt đã đặt đơn.** Đơn khách đặt trên điện thoại của họ không hiện ở tab Quản trị trên máy quản trị. Kênh nhận đơn từ máy khách là Telegram và Zalo.
- Telegram: 0 ảnh → `sendMessage`; 1 ảnh → `sendPhoto`; bill + GCN (2–4 ảnh) → `sendMediaGroup`, chú thích (≤ 1024 ký tự) ở ảnh đầu. Thứ tự lấy cấu hình: `CONFIG.TG_PROXY_URL` → `CONFIG.TG_BOT_TOKEN/TG_CHAT_ID` → Cài đặt trên máy.
  - Khuyến nghị dùng Cloudflare Worker (`worker/telegram-proxy.js`): token giữ trong biến môi trường, chỉ nhận `sendPhoto/sendMessage`, kiểm tra Origin.
  - Nhúng token thẳng vào `CONFIG` thì ai xem mã nguồn cũng đọc được và có thể spam/chiếm bot.
- Tài khoản nhận tiền (`PAY_BIN/PAY_ACC/PAY_NAME`) và link Google Sheets (`SHEET_CSV`) cũng phải điền trong `CONFIG` thì điện thoại khách mới thấy đúng.
- Tab Quản trị: đơn có ảnh GCN mang huy hiệu `Có ảnh GCN · X`; ảnh Bill, GCN 1–3 xếp cạnh nhau, chạm để phóng to và tải về.
- Tab Quản trị mở bằng nút "Quản trị" ở chân trang hoặc `#quantri`; bản tĩnh không có mật khẩu thật.

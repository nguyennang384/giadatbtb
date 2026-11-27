# CÔNG THỨC TÍNH GIÁ CHUẨN – BỘ LÕI CHO "THÔNG BÁO SƠ BỘ GIÁ"

> Nguồn: Giáo trình Định giá đất & BĐS, **chỉ Chương 3 (tr.48–132)**. Bỏ qua Chương 1, 2, 4.
> Nhãn nguồn: **[GT]** = trích giáo trình (kèm trang) · **[SL]** = suy luận/chuẩn hóa để code · **[GĐ]** = giả định cần kiểm chứng bằng dữ liệu thực.
> Thuật ngữ thống nhất: *BĐS mục tiêu* (tài sản cần xác định giá), *BĐS so sánh* (giao dịch đối chứng), *mức giá chỉ dẫn*, *phân tích viên*.
> Phần thặng dư trùng nội dung với [`quy-tac-tinh-gia.md`](./quy-tac-tinh-gia.md): file này chỉ ghi phần khác biệt.

---

## 0. Cảnh báo trước khi dùng

| # | Vấn đề | Tác động | Xử lý |
|---|---|---|---|
| 1 | Căn cứ pháp lý trong giáo trình (Nghị định 2003–2008, lãi tiền gửi 12 tháng) đã cũ | Sai tỷ suất, sai điều kiện áp dụng | Chỉ dùng **logic toán**; tham số lấy theo quy định hiện hành và dữ liệu thị trường |
| 2 | Ví dụ thặng dư của giáo trình: lợi nhuận = 20% **doanh thu**, có tính bồi thường vào chi phí | Mâu thuẫn dự thảo thông tư (lợi nhuận % trên chi phí trừ chi phí tài chính; không tính bồi thường, GPMB) | App theo dự thảo (`quy-tac-tinh-gia.md`) |
| 3 | Giáo trình nói phương pháp thu nhập **không trừ khấu hao**, nhưng ví dụ DCF cửa hàng lại trừ "khấu hao, tu sửa 3 tỷ" | Nhân đôi giảm giá trị nếu cũng đã khấu hao công trình | App: chi phí vận hành **không gồm khấu hao** |
| 4 | Ví dụ DCF ghi "20.000 m²" nhưng phép tính dùng 2.000 m²; ví dụ vốn hóa so sánh ra 14.281 trong khi 2.000/14,04% = 14.245 | Lỗi in ấn | Đã tính lại ở dưới |
| 5 | Các hệ số % (chiều rộng, hướng, ngõ…) trong ví dụ chỉ mang tính minh họa | Không được hard-code thành chuẩn | Lưu dạng bảng tham số [GĐ], backtest theo địa bàn |

---

## 1. BỘ 1 – SO SÁNH THỊ TRƯỜNG (Market Data Grid)

### 1.1 Nguyên tắc điều chỉnh [GT tr.77–92]

| Quy tắc | Nội dung |
|---|---|
| Chuẩn | Lấy **BĐS mục tiêu làm chuẩn**; điều chỉnh BĐS so sánh về BĐS mục tiêu |
| Dấu | BĐS so sánh **kém hơn → cộng (+)**; **tốt hơn → trừ (−)** |
| Thứ tự | Điều chỉnh theo **số tiền tuyệt đối trước**, % sau; mỗi lần một yếu tố |
| Gộp | Nhóm **giao dịch** (pháp lý, thanh toán, điều kiện bán, thời điểm) → **nhân liên tiếp**; nhóm **đặc điểm BĐS** (vị trí, mặt tiền, chiều sâu, ngõ, hướng, thoát nước…) → **cộng gộp %** trên giá đã điều chỉnh giao dịch |
| Mẫu | Tối thiểu **3 BĐS so sánh**, giao dịch thành công/rao bán đã quy đổi, trong vòng ~1 năm, điều chỉnh thời gian trước |
| Loại trừ | Tách khỏi giá các khoản **không phải BĐS** (nội thất rời, xe, hàng hóa); **cộng** chi phí người mua phải bỏ ngay sau khi mua (sửa chữa bắt buộc) |

### 1.2 Công thức quy đổi % [GT tr.81–88]

Khi có tương quan giá thị trường theo bậc (VD chiều rộng 3–3,8m: 95%; 3,8–4m: 100%; ≥4m: 105%):

```
Tỷ lệ điều chỉnh (%) = (Hệ số BĐS mục tiêu − Hệ số BĐS so sánh) / Hệ số BĐS so sánh
```

| Yếu tố | Mục tiêu | So sánh | Tỷ lệ | Nguồn |
|---|---|---|---|---|
| Ngõ 10m vs 8m | 100% | 90% | +11,11% | [GT] |
| Hai mặt tiền | 100% | 105% | −4,76% | [GT] |
| View công viên | 100% | 105% | −4,76% | [GT] |
| Thoát nước tốt hơn ở BĐS so sánh | 100% | 110% | −9,09% | [GT] |
| Hướng Tây/Bắc vs Đông | 90% | 95% | −5,26% | [GT] |
| Hướng Tây/Bắc vs Đông Nam | 90% | 100% | −10,00% | [GT] |
| Chiều rộng 4m vs 5m (bậc 100/105) | 100% | 105% | −4,76% | [GT tr.105] |
| Chiều rộng 4m vs 3m (bậc 100/95) | 100% | 95% | +5,26% | [GT tr.105] |
| Chiều dài 25m vs 30m (100/96,71) | 100% | 96,71% | +3,41% | [GT tr.105] |
| Diện tích 100 vs 150 m² (100/95) | 100% | 95% | +5,26% | [GT tr.105] |

**Cách chấm điểm** (khi không có tương quan giá) [GT tr.53]: thang điểm, mỗi điểm chênh = x% (ví dụ 5%/điểm).
`Điều chỉnh = (Điểm mục tiêu − Điểm so sánh) × x% × Giá so sánh`.

**Excel** (cột C = hệ số so sánh, D = hệ số mục tiêu):
`=(D2-C2)/C2` → % điều chỉnh; giá chỉ dẫn `=Gia_sau_GD*(1+SUM(E2:E9))`.

### 1.3 Điều chỉnh nhóm giao dịch [GT tr.89–92]

| Yếu tố | Công thức | Ví dụ giáo trình |
|---|---|---|
| Pháp lý | Giá so sánh ± tiền sử dụng đất/chi phí hoàn thiện pháp lý còn thiếu | Cộng/trừ số tiền tuyệt đối |
| Trả chậm | PV = Khoản trả đều × hệ số niên kim `(1−(1+r)^−n)/r` | Hệ số 7,606 |
| Hỗ trợ tài chính (lãi ưu đãi) | Trừ phần PV chênh lệch lãi ưu đãi vs lãi thị trường | — |
| Thời hạn sử dụng (thuê) | Giá × (1 − số năm thiếu × % /năm) | 20 × (1 − 20×1,2%) = **15,2** |
| Xu hướng thị trường | Giá × (1 + g × số tháng) | g = 0,68%/tháng |
| Chi phí ngay sau mua | Giá + chi phí bắt buộc | — |

### 1.4 Chọn mức giá đại diện & luật kiểm soát 10% [GT tr.83–86]

Định nghĩa:
- **Tổng điều chỉnh thuần (net)** = |Σ điều chỉnh có dấu|
- **Tổng điều chỉnh gộp (gross)** = Σ |từng điều chỉnh|
- **Số lần điều chỉnh** = số yếu tố có điều chỉnh ≠ 0

Thứ tự ưu tiên chọn BĐS so sánh đại diện:

| Ưu tiên | Tiêu chí |
|---|---|
| 1 | Tổng điều chỉnh gộp (giá trị tuyệt đối) **nhỏ nhất** |
| 2 | **Ít số lần** điều chỉnh nhất |
| 3 | Biên độ điều chỉnh từng yếu tố nhỏ nhất |

**Luật kiểm soát 10%:** mức giá chọn phải chênh **≤ 10%** so với **từng** mức giá chỉ dẫn. Vi phạm → loại BĐS so sánh lệch hoặc bổ sung mẫu.

Ví dụ [GT tr.84]:

| BĐS so sánh | Giá chỉ dẫn (tr/m²) | Số lần | Net | Gross | Chênh so với 18,31 |
|---|---|---|---|---|---|
| 1 | 17,50 | 4 | 4,40 | 5,50 | 4,6% |
| 2 | 18,40 | 3 | 1,60 | 6,04 | 0,5% |
| **3** | **18,31** | 3 | 4,19 | **4,19** | — |

→ Chọn BĐS 3 (gross nhỏ nhất, ít lần nhất): **18,31 × 56 m² ≈ 1.025 tr**.

**Bao khoảng định tính** [GT]: khi chỉ xếp được "tốt hơn/kém hơn", giá BĐS mục tiêu nằm tại điểm dấu điều chỉnh đổi chiều (ví dụ giáo trình: 80,5).

### 1.5 Logic code cho giadatbtb [SL]

```js
// comps: [{price, txAdj:[%...], propAdj:[%...]}]  (% dạng thập phân, có dấu)
function marketGrid(comps, ctrl = 0.10) {
  const rows = comps.map(c => {
    const afterTx = c.txAdj.reduce((p, a) => p * (1 + a), c.price);   // nhân liên tiếp
    const indicated = afterTx * (1 + c.propAdj.reduce((s, a) => s + a, 0)); // cộng gộp
    const all = [...c.txAdj, ...c.propAdj].filter(a => a !== 0);
    return { ...c, indicated,
      net: Math.abs(all.reduce((s, a) => s + a, 0)),
      gross: all.reduce((s, a) => s + Math.abs(a), 0),
      count: all.length,
      maxOne: Math.max(0, ...all.map(Math.abs)) };
  });
  rows.sort((a, b) => a.gross - b.gross || a.count - b.count || a.maxOne - b.maxOne);
  const rep = rows[0].indicated;
  const breach = rows.filter(r => Math.abs(rep - r.indicated) / r.indicated > ctrl);
  return { rep, rows, pass: breach.length === 0, breach };
}
```

| Excel | Công thức |
|---|---|
| Gross | `=SUMPRODUCT(ABS(E2:L2))` |
| Count | `=COUNTIF(E2:L2,"<>0")` |
| Kiểm soát 10% | `=MAX(ABS(Rep-M2:M4)/M2:M4)<=10%` (nhập mảng / Excel 365) |

---

## 2. BỘ 2 – CHIẾT TRỪ & HAO MÒN

### 2.1 Chiết trừ tách giá đất thuần [GT tr.56–58, 104–106]

```
Giá trị CTXD hiện tại = Đơn giá XD mới × Diện tích sàn × Chất lượng còn lại (%)
                      (đơn giá XD mới gồm chi phí trực tiếp + chung + lợi nhuận nhà thầu + thuế, phí)
Giá trị đất           = Giá giao dịch (nhà + đất) − Giá trị CTXD hiện tại
Đơn giá đất thuần     = Giá trị đất / Diện tích thửa
```
Sau đó đưa đơn giá đất thuần của ≥3 BĐS so sánh vào **Bộ 1** để điều chỉnh.

Ví dụ [GT tr.104–106]:

| | BĐS 1 | BĐS 2 | BĐS 3 |
|---|---|---|---|
| Giá giao dịch (tr) | 614,4 | 591,0 | 1.142,2 |
| CTXD = ĐG × CL × Sàn | 1,8×90%×120 = 194,4 | 2,0×85%×180 = 306,0 | 2,2×95%×200 = 418,0 |
| Giá trị đất (tr) | 420,0 | 285,0 | 724,2 |
| Đơn giá đất (tr/m²) | 5,250 | 4,750 | 4,828 |
| Điều chỉnh % | −4,76% | +5,26% | +3,91% |
| Giá chỉ dẫn | 5,000 | 5,000 | 5,016 |

→ Bình quân 5,005 ≈ **5,0 tr/m²** × 100 m² = 500 tr; CTXD mục tiêu 1,8 × 80% × 150 = 216 tr → **BĐS mục tiêu ≈ 716 tr**.

Ví dụ ngắn [GT tr.57]: CTXD 300 m² × 2,8 tr = 840 tr, hao mòn 10% → 756 tr; đất 3.600 − 756 = 2.844 tr → 28,44 tr/m² → điều chỉnh +6% → ~30,5 tr/m².

### 2.2 Phương pháp chi phí (5 bước) [GT tr.98–99]

```
V_BĐS = Giá đất (coi là đất trống, sử dụng tốt nhất) + [Chi phí XD mới hiện hành − Hao mòn lũy kế]
Hao mòn lũy kế = Hao mòn tự nhiên + Hao mòn lỗi thời chức năng + Hao mòn kinh tế (bên ngoài)
```

### 2.3 Ba cách tính hao mòn tự nhiên [GT tr.100–102]

**Cách 1 – Chiết trừ thị trường:**

```
Tỷ lệ HM lũy kế (so sánh) = (Chi phí XD mới − (Giá bán − Giá đất)) / Chi phí XD mới
Tỷ lệ HM/năm             = Tỷ lệ HM lũy kế / Tuổi đời hiệu quả (so sánh)
Tỷ lệ HM mục tiêu        = Bình quân tỷ lệ HM/năm × Tuổi đời hiệu quả (mục tiêu)
```

| Bước | BĐS so sánh 1 | BĐS so sánh 2 |
|---|---|---|
| Giá bán (tỷ) | 3,550 | 3,100 |
| Giá đất | 2,485 | 2,015 |
| Giá trị nhà | 1,065 | 1,085 |
| Chi phí XD mới | 1,765 | 1,800 |
| HM lũy kế | 0,700 (39,66%) | 0,715 (39,72%) |
| Tuổi đời hiệu quả | 20 | 21 |
| HM/năm | 1,983% | 1,891% |

→ BĐS mục tiêu (22 năm): (1,983% + 1,891%)/2 × 22 = **42,61%**.

**Cách 2 – Tuổi đời:**

```
% hao mòn = Tuổi đời hiệu quả / Tuổi đời kinh tế × 100
Tuổi đời kinh tế = Tuổi đời hiệu quả + Tuổi đời kinh tế còn lại
```
Ví dụ: 10 / (10 + 40) = **20%** → chất lượng còn lại 80%.

| Khái niệm | Định nghĩa [GT tr.97] |
|---|---|
| Tuổi đời thực tế | Năm đã trôi qua từ khi hoàn thành |
| Tuổi đời hiệu quả | Theo tình trạng duy tu: bảo dưỡng tốt → **ngắn hơn** thực tế; kém → **dài hơn** |
| Tuổi đời kinh tế | Số năm công trình còn đóng góp làm tăng giá trị BĐS |

Ví dụ tuổi đời [GT tr.101]: xây 1990, đóng góp đến 2058, nâng cấp năm 2000 kéo dài 8 năm, thời điểm tính 2008 → kinh tế 68 năm, còn lại 58 năm, hiệu quả 10 năm, thực tế 18 năm.

**Cách 3 – Bình quân gia quyền theo kết cấu chính:**

```
        Σ (H_ki × T_ki)
H  =  ------------------      (i = 1…n)
            Σ T_ki
```
- H: hao mòn công trình (%)
- H_ki: hao mòn kết cấu chính thứ i (%)
- T_ki: tỷ trọng giá trị kết cấu i trong công trình
- n: số kết cấu chính

Ví dụ minh họa [SL – tỷ trọng là GĐ, cần thay theo suất vốn đầu tư từng loại nhà]:

| Kết cấu | T_ki | H_ki | H×T |
|---|---|---|---|
| Móng | 10% | 20% | 2,00 |
| Khung, cột | 25% | 30% | 7,50 |
| Tường | 15% | 40% | 6,00 |
| Sàn | 15% | 35% | 5,25 |
| Mái | 10% | 50% | 5,00 |
| Hoàn thiện, điện nước | 25% | 45% | 11,25 |
| **Tổng** | **100%** | | **37,00** |

→ H = 37% → chất lượng còn lại **63%**.
Excel: `=SUMPRODUCT(C2:C7,D2:D7)/SUM(C2:C7)`.

### 2.4 Hao mòn lỗi thời chức năng & kinh tế [GT tr.103]

```
HM chức năng = Chi phí khắc phục thực tế − Chi phí nếu thiết kế đúng từ đầu
```
Ví dụ: (20 + 8 + 32) − 30 = **30 tr**.
HM kinh tế (ô nhiễm, tiếng ồn, quy chuẩn mới, suy thoái): ước tính theo chênh lệch giá thị trường; không có công thức cố định → cờ cảnh báo [SL].

### 2.5 Logic code [SL]

```js
const depAge   = (eff, remain) => eff / (eff + remain);                 // Cách 2
const depParts = parts => parts.reduce((s,p)=>s+p.H*p.T,0) / parts.reduce((s,p)=>s+p.T,0); // Cách 3
function extractLand({price, area, floor, unitBuild, remainPct, nonRE = 0}) {
  const build = unitBuild * floor * remainPct;
  const land  = price - nonRE - build;
  return { build, land, landUnit: land / area, flag: land / price < 0.3 ? 'CTXD chiếm >70% – độ tin cậy thấp' : null };
}
```
Cờ `< 30%` là ngưỡng [GĐ]: khi phần đất quá nhỏ, sai số đơn giá XD khuếch đại lên đơn giá đất.

---

## 3. BỘ 3 – VỐN HÓA THU NHẬP

### 3.1 Vốn hóa trực tiếp [GT tr.108]
Áp dụng khi thu nhập ổn định qua các năm và thời gian khai thác dài, coi như vô hạn.

```
V = I / R        hoặc   V = I × GI   (GI = 1/R)
```

### 3.2 Thu nhập hoạt động ròng [GT tr.109–110]

```
PGI = Đơn giá thuê × Số đơn vị × 12                    (lấp đầy 100%)
EGI = PGI × (1 − Tỷ lệ trống − Tỷ lệ nợ dây dưa)
NOI = EGI − Chi phí vận hành, duy tu (trực tiếp: thuế BĐS, bảo hiểm; gián tiếp: quản lý, điện nước, vệ sinh, tân trang)
```

| Bước | Ví dụ chung cư 20 căn [GT tr.110] |
|---|---|
| PGI | 10×3,2×12 + 10×4,8×12 = **960 tr** |
| Tỷ lệ trống (thị trường 6,8–9,1%) | 9% |
| Nợ dây dưa | 1% |
| EGI | 960 × 90% = **864 tr** |
| Chi phí vận hành (34,6–36% EGI) | 35% → 302,4 tr |
| **NOI** | **≈ 562 tr** |

Ví dụ nhà mặt phố [GT tr.114]: (360 − 10 − 98) / 12% = 252 / 12% = **2.100 tr**.

### 3.3 Xác định tỷ suất vốn hóa R [GT tr.111–114]

| Cách | Công thức | Ví dụ |
|---|---|---|
| 1. Cộng dồn | R = Lãi suất TPCP ≥10 năm + Phụ phí rủi ro (kinh doanh, tài chính, thanh khoản) | — |
| 2. Đầu tư (bình quân gia quyền) | R₀ = M × Rm + (1 − M) × Re (M: tỷ trọng vốn vay; Rm: tỷ suất vốn vay; Re: lợi suất kỳ vọng vốn chủ) | 66%×5% + 34%×8% = **6,02%**; 50%×4,5% + 25%×7% + 25%×10% = **6,5%** |
| 3. So sánh thị trường | R = NOI / Giá bán của BĐS cho thuê tương tự, lấy bình quân | 14,0%; 14,21%; 13,91% → **14,04%** → 2.000 / 14,04% ≈ **14.245 tr** (giáo trình ghi 14.281) |

Các tỷ suất phụ:
- Tỷ suất thu hồi vốn = 100% / tuổi đời kinh tế còn lại. Ví dụ: 100/50 = 2%/năm.
- Tỷ suất thuế thực = Tỷ số định giá thuế × Thuế suất. Ví dụ: 60% × 2% = 1,2%.

**Ưu tiên cho app [SL]:** dùng **Cách 3** (R thị trường từ chính dữ liệu cho thuê đã thu). Cách 1 và 2 chỉ dùng làm kiểm tra chéo.

### 3.4 Biến thể: thu nhập từ đất nông nghiệp [GT tr.54–55]

```
Giá đất = Thu nhập ròng bình quân 3 năm / Lãi suất đối chứng
Thu nhập ròng = Doanh thu − Chi phí sản xuất (không trừ khấu hao)
```
Ví dụ: 8,237 tr / 8,3% ≈ 99,24 tr ≈ 25.000 đ/m².
Lãi suất tiền gửi 12 tháng là quy định cũ, cần thay bằng tỷ suất theo quy định hiện hành.

### 3.5 Logic code [SL]

```js
function directCap({rentMonthly, units = 1, vacancy, badDebt = 0, opexRate, opexFixed = 0, R}) {
  const PGI = rentMonthly * units * 12;
  const EGI = PGI * (1 - vacancy - badDebt);
  const NOI = EGI - (EGI * opexRate + opexFixed);   // KHÔNG gồm khấu hao
  return { PGI, EGI, NOI, V: NOI / R };
}
```
Excel: `=(PGI*(1-Vac-Bad)*(1-Opex))/R`.

---

## 4. BỘ 4 – THẶNG DƯ & DÒNG TIỀN CHIẾT KHẤU

### 4.1 Thặng dư [GT tr.117–124] → **xem đầy đủ tại `quy-tac-tinh-gia.md` §2–§4**

```
V = DT − CP              (tĩnh)
V = Σ DT_t/(1+r)^t − Σ CP_t/(1+r)^t     (động, t = 1…n)
```

| Điểm | Giáo trình | Dự thảo (app dùng) |
|---|---|---|
| Lợi nhuận nhà đầu tư | 20% doanh thu | % trên chi phí (trừ chi phí tài chính) |
| Bồi thường, GPMB | Tính vào CP | **Không tính** |
| r | Không quy định cụ thể | LS cho vay trung hạn BĐS bình quân của 3 tổ chức tín dụng vốn nhà nước trên địa bàn |
| Kết quả ví dụ | 58.254,27 tr ≈ 58 tỷ | Ví dụ Nghi Phú: V = 10.919,9 tr |

### 4.2 DCF tổng quát [GT tr.115]
Dùng khi dòng tiền không đều hoặc có giá trị thu hồi.

```
         n     CF_t         V_n
V  =    Σ   --------- + ---------
        t=1  (1+r)^t     (1+r)^n

Dòng đều: V = CF × [1 − (1+r)^−n]/r + V_n/(1+r)^n
Giá trị thu hồi: V_n = NOI_(n+1) / R
```

| Ví dụ | Tính | Kết quả |
|---|---|---|
| HĐ thuê 5 năm, 252 tr/năm, r = 10% [GT tr.116] | 252 × 3,7908 | **955,3 tr** |
| Cửa hàng 2.000 m² sàn, cho thuê 80%, 1,1 tr/m²/tháng, R = 12% [GT tr.116–117] | Năm 1–4: (21.120 − 3.000 − 1.000 − 1.920 VAT) × 72% = 10.944 tr/năm; năm 5+: (24.288 − 4.250 − 2.208) × 72% = 12.837,6 → V₄ = 106.980 tr; V = 10.944 × 3,0373 + 106.980/1,12⁴ = 33.240 + 67.988 | **≈ 101.228 tr** |

Lưu ý ví dụ cửa hàng: VAT tách theo giá đã gồm thuế (DT/11); khoản "khấu hao, tu sửa" bị trừ chung, xem cảnh báo #3.

### 4.3 IRR nội suy [GT tr.113–114]

```
IRR ≈ r1 + NPV1 × (r2 − r1) / (NPV1 − NPV2)     (NPV1 > 0 > NPV2)
```
Ví dụ: 9% + 7,187 × 2% / (7,187 + 4,977) ≈ **10,18%**. Excel: `=IRR(B2:B7)`.

### 4.4 Excel / JS [SL]

| Mục | Công thức |
|---|---|
| DCF | `=NPV(r,C2:C5)+Vn/(1+r)^n` |
| Dòng đều | `=PV(r,n,-CF)` |
| Thặng dư động | `=SUMPRODUCT((B2:B12-C2:C12)/(1+r)^A2:A12)` (như `quy-tac-tinh-gia.md`) |

```js
const dcf = (cfs, r, Vn = 0) =>
  cfs.reduce((s, cf, i) => s + cf / (1 + r) ** (i + 1), 0) + Vn / (1 + r) ** cfs.length;
```

---

## 5. Ma trận chọn phương pháp cho app [GT tr.62–64 + SL]

| Loại BĐS | Chính | Kiểm tra chéo | Cờ |
|---|---|---|---|
| Đất ở/nhà phố có ≥3 giao dịch gần | Bộ 1 | Bộ 2 (nếu có nhà) | Gross > 25% [GĐ] hoặc vi phạm luật 10% |
| Nhà + đất | Bộ 2 → Bộ 1 | Bộ 3 nếu đang cho thuê | CTXD > 70% giá |
| Nhà cho thuê, ki-ốt, căn hộ dịch vụ | Bộ 3 | Bộ 1 | R lệch > ±2 điểm % so với mặt bằng [GĐ] |
| Đất vườn lớn, nhà cũ phá dỡ | Bộ 4 | Bộ 1 | Lệch > ±20% → không phát hành tự động |

Giáo trình yêu cầu dùng **tối thiểu 2 phương pháp** khi dữ liệu thưa hoặc thị trường biến động; app bám nguyên tắc này để hạ hạng tin cậy (A/B/C).

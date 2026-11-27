# Quy tắc tính giá: Phương pháp thặng dư

Tài liệu này là bộ quy tắc nạp vào hệ thống **Thông báo sơ bộ giá BĐS Nghệ An – Hà Tĩnh (giadatbtb)**.

- **Nguồn:** Dự thảo Thông tư của Bộ Tài chính (2023), chuẩn mực định giá bất động sản, Chương 2 "Phương pháp thặng dư" (Điều 4–9). Văn bản dự kiến có hiệu lực từ 01/7/2024 và thay thế Tiêu chuẩn số 11 (Thông tư 145/2016/TT-BTC).
- **Lưu ý về nguồn:** file là **bản dự thảo**. Cần đối chiếu với văn bản chính thức đã ban hành trước khi khóa tham số.
- **Cách đọc ký hiệu:**
  - **[PDF]** là nội dung có trong văn bản.
  - **[SUY LUẬN]** là phần bổ sung hoặc quy đổi để áp dụng vào app, không có trong văn bản.
  - **[GIẢ ĐỊNH]** là con số mẫu, cần thay bằng số liệu khảo sát thực tế.
- **Quy ước thuật ngữ:** "BĐS cần định giá" thay cho cách gọi của văn bản gốc; "thời điểm tham chiếu" thay cho "thời điểm định giá" của văn bản.

---

## 1. Điều kiện áp dụng phương pháp

**[PDF] Điều 3–4.**
- Phương pháp thặng dư kết hợp cả 3 cách tiếp cận: thị trường, chi phí và thu nhập.
- Phương pháp dùng cho **BĐS có tiềm năng phát triển**, gồm:
  - đất trống để xây dựng;
  - đất có công trình có thể cải tạo, hoặc phá dỡ để xây mới, theo hướng **sử dụng tốt nhất và có hiệu quả nhất**.
- Việc chọn phương pháp căn cứ vào đặc điểm BĐS, mục đích, thời điểm và dữ liệu thu thập được.

**[PDF] Điều 5.** "Sử dụng tốt nhất và có hiệu quả nhất" phải dựa trên:
- hồ sơ pháp lý và đặc điểm BĐS;
- quy hoạch sử dụng đất, quy hoạch xây dựng, quy hoạch giao thông;
- quy định về chuyển mục đích sử dụng đất và quy định đầu tư, xây dựng đã được phê duyệt.

Phương án sử dụng có thể giữ mục đích hiện tại hoặc đổi sang mục đích khác, nhưng phải lập luận được về pháp lý, kinh tế – xã hội và tài chính.

**[SUY LUẬN] Áp vào 4 loại giao dịch thực tế:**

| Loại BĐS | Có dùng thặng dư? | Phương pháp chính trong app | Lý do |
| --- | --- | --- | --- |
| Đất ở lô nhỏ, nhà phố đang ở ổn định | **Không** làm phương pháp chính | So sánh (Haversine + hệ số, đang chạy trong giadatbtb) | Không có "tiềm năng phát triển" khác với hiện trạng; thặng dư chỉ dùng kiểm tra chéo khi lô đủ rộng để xây mới |
| Nhà phố có nhà cũ cần phá dỡ | **Có**, Trường hợp 1 (trong 1 năm) | Thặng dư, đối chiếu với so sánh | Đúng điều kiện "đất có công trình có thể phá dỡ để xây mới" |
| Đất vườn diện tích lớn (đất huyện sâu 30–50m, có thể tách thửa/phân lô) | **Có**, Trường hợp 1 hoặc 2 | Thặng dư là phương pháp chính, so sánh để lấy giá bán lô (DT) | Giá trị nằm ở khả năng tách thửa, chuyển mục đích, làm hạ tầng |
| Đất trống trong khu quy hoạch | **Có** | Thặng dư nếu có phương án xây dựng rõ; còn lại dùng so sánh | Theo Điều 4 khoản 2 |

**Điều kiện bắt buộc trong app [SUY LUẬN]:** chỉ chạy chế độ thặng dư khi trạng thái quy hoạch là "Phù hợp quy hoạch đất ở", và phương án phát triển (số lô, mật độ, tầng cao) không vượt quy định tách thửa và xây dựng của địa phương. Nếu không đạt, app khóa chế độ này và chỉ trả kết quả so sánh.

---

## 2. Công thức và biến số

### 2.1 Công thức gốc [PDF] Điều 4

```
V = DT − CP
```

| Biến | Ý nghĩa |
| --- | --- |
| V | Giá trị của BĐS cần định giá |
| DT | Tổng doanh thu phát triển |
| CP | Tổng chi phí phát triển, **bao gồm lợi nhuận nhà đầu tư** |

**Trường hợp 1:** doanh thu và chi phí phát sinh trong cùng 01 năm. Tính theo mặt bằng giá tại thời điểm tham chiếu, không chiết khấu.

```
V = DT − CP
```

**Trường hợp 2:** phát triển kéo dài nhiều năm (cho thuê, cho thuê một phần, hoặc bán từng phần qua nhiều năm).

```
V = Σ (t = 0 → n) (DTt − CPt) / (1 + r)^t
```

| Biến | Ý nghĩa |
| --- | --- |
| DTt | Doanh thu phát triển tại năm t |
| CPt | Chi phí phát triển dự kiến tại năm t |
| r | Tỷ suất chiết khấu (năm) |
| n | Giai đoạn dự báo dòng tiền (theo chuẩn mực về cách tiếp cận từ thu nhập, Điều 6) |
| t | Năm dự báo, t = 0 là thời điểm tham chiếu |

### 2.2 Doanh thu phát triển DT [PDF] Điều 7

- DT là tổng doanh thu dự kiến theo phương án **sử dụng tốt nhất**.
- Ước tính từ **khảo sát giá chuyển nhượng, giá cho thuê** và các yếu tố tạo doanh thu của BĐS tương tự, tại cùng khu vực hoặc khu vực có khả năng sinh lợi và hạ tầng tương đương. Phải tính đến xu hướng biến động giá.
- Xác định bằng cách tiếp cận thị trường hoặc thu nhập.
- **Trong 1 năm:** tính theo mặt bằng giá tại thời điểm tham chiếu, coi như bán toàn bộ sản phẩm tại thời điểm đó.
- **Nhiều năm:** quy về hiện tại theo công thức dưới, đồng thời ước tính tỷ lệ tăng giá bán/giá thuê phù hợp mức tăng của thị trường.

```
DT = Σ (t = 0 → n) DTt / (1 + r)^t
```

### 2.3 Chi phí phát triển CP [PDF] Điều 8

```
CP = Chi phí đầu tư phát triển + Lợi nhuận nhà đầu tư
CP (nhiều năm) = Σ (t = 0 → n) CPt / (1 + r)^t
```

- **Nguồn số liệu:** khảo sát chi phí của dự án tương tự và mặt bằng giá thị trường (vật liệu, ca máy, nhân công) tại thời điểm tham chiếu.
- **Khi không có số liệu thị trường:** dùng định mức, đơn giá xây dựng, suất vốn đầu tư của cơ quan có thẩm quyền, nhưng phải lập luận và điều chỉnh cho phù hợp với thời điểm tham chiếu.
- **Dự án nhiều năm:** ước tính tỷ lệ tăng giá các khoản chi phí kéo dài, phù hợp mức tăng giá nguyên nhiên vật liệu.

**Lợi nhuận nhà đầu tư** xác định theo một trong 3 cách sau, và phải lập luận sự phù hợp:

| Cách | Căn cứ |
| --- | --- |
| a | Theo quy định của cơ quan có thẩm quyền (nếu có) |
| b | Tỷ lệ lợi nhuận trung bình thị trường × **tổng chi phí trực tiếp + gián tiếp, không gồm chi phí tài chính** |
| c | Trung bình tỷ lệ lợi nhuận trước thuế TNDN trên tổng chi phí của **ít nhất 03 doanh nghiệp BĐS tương tự** (số liệu đã kiểm toán hoặc quyết toán) |

### 2.4 Tỷ suất chiết khấu r [PDF] Điều 9

r năm bằng **lãi suất cho vay kinh doanh BĐS trung hạn bình quân của 03 tổ chức tín dụng thương mại do Nhà nước nắm cổ phần chi phối**, có trụ sở hoặc chi nhánh trên địa bàn tỉnh, tại thời điểm tham chiếu.

**[SUY LUẬN]** Với Nghệ An – Hà Tĩnh, lấy lãi suất niêm yết của 3 tổ chức thuộc nhóm có vốn Nhà nước chi phối tại chi nhánh trong tỉnh, rồi tính trung bình. Lưu ngày lấy số liệu vào cột `r_ngay_cap_nhat` để mỗi Thông báo ghi rõ r áp dụng.

---

## 3. Khoản mục được tính và bị loại trừ

### 3.1 Được tính vào chi phí đầu tư phát triển [PDF] Điều 8 khoản 2a

| Mã | Khoản mục | Gồm |
| --- | --- | --- |
| a1 | Hạ tầng kỹ thuật | Hạ tầng kỹ thuật và chi phí liên quan khác |
| a2 | Xây dựng | **Phá dỡ công trình**, san lấp mặt bằng, xây công trình và hạng mục, công trình tạm, công trình phụ trợ thi công |
| a3 | Thiết bị | Mua sắm thiết bị công trình/công nghệ, đào tạo và chuyển giao (nếu có), lắp đặt, thí nghiệm, hiệu chỉnh, vận chuyển, bảo hiểm, thuế, phí liên quan |
| a4 | Quản lý dự án | Từ chuẩn bị đến kết thúc xây dựng và đưa vào khai thác |
| a5 | Tư vấn đầu tư xây dựng | Khảo sát, báo cáo tiền khả thi/khả thi, báo cáo kinh tế – kỹ thuật, thiết kế, giám sát, tư vấn khác |
| a6 | Dự phòng | Dự phòng khối lượng phát sinh; dự phòng trượt giá (chỉ khi dự án kéo dài nhiều năm) |
| a7 | Chi phí khác | Thẩm tra tổng mức đầu tư, bảo hiểm công trình… |
| a8 | Kinh doanh | Chi phí bán hàng, tiếp thị [SUY LUẬN về nội dung cụ thể] |
| a9 | Lãi vay, thuế… | Chi phí tài chính và thuế, phí |
| + | **Lợi nhuận nhà đầu tư** | Cộng vào CP theo mục 2.3 |

### 3.2 Bị loại trừ [PDF]

- **Chi phí bồi thường, giải phóng mặt bằng**, gồm tiền bồi thường, hỗ trợ, tái định cư và kinh phí tổ chức thực hiện bồi thường GPMB, **không tính** vào tổng chi phí phát triển.
- **Chi phí tài chính** (lãi vay) **không nằm trong cơ sở tính lợi nhuận** theo cách b. Lãi vay vẫn là một khoản chi phí (a9), chỉ không dùng làm cơ sở nhân tỷ lệ lợi nhuận.

### 3.3 Khoản mục đặc thù khi áp dụng tại Nghệ An – Hà Tĩnh [SUY LUẬN]

| Khoản mục | Xếp vào | Ghi chú |
| --- | --- | --- |
| Tiền chuyển mục đích đất vườn (CLN) sang đất ở (ONT/ODT) | a9 (thuế, phí) | Thường là khoản lớn nhất khi phân lô đất vườn. Tính theo bảng giá đất và quy định của tỉnh tại thời điểm tham chiếu |
| Đo đạc, tách thửa, cấp giấy chứng nhận cho từng lô | a5 / a7 | |
| Diện tích hiến làm đường nội bộ, hành lang | Không phải chi phí: **giảm diện tích thương phẩm** trong DT | Không tính đúp vào CP |
| Phá dỡ nhà cũ trừ giá trị thu hồi vật liệu | a2 | Lấy chi phí ròng |

---

## 4. Quy đổi thành thuật toán cho Web App

### 4.1 Luồng xử lý trong giadatbtb [SUY LUẬN]

1. **Kiểm tra điều kiện (mục 1):**
   - Quy hoạch phải là "Phù hợp quy hoạch đất ở".
   - Loại BĐS phải thuộc một trong các nhóm: nhà cũ phá dỡ, đất vườn lớn, đất trống có phương án.
   - Không đạt thì dừng chế độ thặng dư.
2. **Tính DT:** dùng chính engine so sánh hiện có (Haversine + hệ số chiều sâu, hình dáng, loại đường) để ra **đơn giá bán của BĐS sau phát triển**.
   - Ví dụ: giá một lô 100–120 m² mặt đường nội bộ loại 3.
   - Công thức: DT = đơn giá × diện tích thương phẩm.
3. **Nhập CP theo bảng a1–a9:** hệ thống gợi ý mặc định theo tỷ lệ; người xử lý sửa từng dòng.
4. **Lợi nhuận** = tỷ lệ × (tổng a1…a9 **trừ lãi vay**).
5. **Chọn Trường hợp:**
   - Trường hợp 1 nếu mọi dòng tiền nằm trong 1 năm.
   - Trường hợp 2 nếu có dòng tiền ở năm 2 trở đi; khi đó chiết khấu theo r.
6. **Kết quả:**
   - V và V/m² đất gốc.
   - **Đối chiếu với kết quả so sánh.** Nếu lệch quá ±20%, gắn cờ "Cần kiểm tra" và không xuất Thông báo tự động.

### 4.2 Lõi JavaScript (đã chạy thử bằng Node)

```js
/**
 * Phương pháp thặng dư: V = Σ (DTt − CPt) / (1 + r)^t
 * revenue: [{ t, v }]          doanh thu theo năm (triệu đồng)
 * costs:   [{ t, v, kind }]    kind ∈ infra|build|equip|pm|consult|contingency|other|sales|finance|tax
 * profitRate: tỷ lệ lợi nhuận nhà đầu tư trên chi phí KHÔNG gồm chi phí tài chính
 * r: tỷ suất chiết khấu năm (0 nếu Trường hợp 1)
 */
function residualValue(p) {
  const r = p.r ?? 0;
  const pv = (x, t) => x / Math.pow(1 + r, t);
  const sum = a => a.reduce((s, x) => s + x, 0);
  const rev = p.revenue.map(x => ({ t: x.t ?? 0, v: x.v }));
  const costs = p.costs.map(c => ({ t: c.t ?? 0, v: c.v, kind: c.kind }));
  // Cơ sở tính lợi nhuận: chi phí trực tiếp + gián tiếp, loại chi phí tài chính
  const base = costs.filter(c => c.kind !== 'finance');
  const baseTotal = sum(base.map(c => c.v));
  const profit = p.profitRate * baseTotal;
  // [SUY LUẬN] phân bổ lợi nhuận theo tỷ trọng chi phí từng năm
  const profitRows = base.map(c => ({ t: c.t, v: baseTotal ? profit * c.v / baseTotal : 0 }));
  const DT = sum(rev.map(x => pv(x.v, x.t)));
  const CP = sum(costs.concat(profitRows).map(c => pv(c.v, c.t)));
  return { DT, CP, profit, V: DT - CP };
}
// Bồi thường, GPMB: KHÔNG được đưa vào costs (Điều 8, PDF).
```

### 4.3 Công thức Excel / Google Sheets

Bố trí bảng dòng tiền: cột A là năm t (0…n), B là DTt, C là CPt (đã gồm lợi nhuận phân bổ). Ô `r` đặt tên là `r`.

```
V (Trường hợp 2)  =SUMPRODUCT((B2:B12-C2:C12)/(1+r)^A2:A12)
V (Trường hợp 1)  =B2-C2
Lợi nhuận         =TyLeLN*(SUM(CP_a1_a9)-LaiVay)
```

### 4.4 Ví dụ minh họa (đất vườn Nghi Phú phân lô)

Toàn bộ số liệu là **[GIẢ ĐỊNH]**. Kết quả do hàm `residualValue` ở mục 4.2 tính ra.

**Đầu vào:**
- Đất 1.200 m² (MT 20m × sâu 60m).
- Đường nội bộ và hạ tầng chiếm 30%, còn **840 m² thương phẩm**, chia 7 lô × 120 m².
- Giá bán lô (từ engine so sánh, loại đường 3): 18 tr/m².

| Khoản | Cách tính | Triệu đồng |
| --- | --- | --- |
| **DT** | 840 m² × 18 | **15.120** |
| a1 Hạ tầng | 1,5 tr/m² × 360 m² đường | 540 |
| a2 Phá dỡ, san lấp | 0,1 tr/m² × 1.200 m² | 120 |
| a4 Quản lý dự án | 2% × (a1 + a2) | 13,2 |
| a5 Tư vấn, đo đạc, tách thửa | 2% × (a1 + a2) | 13,2 |
| a6 Dự phòng | 5% × (a1 + a2) | 33 |
| a9 Thuế, phí chuyển mục đích | Nhập theo bảng giá đất của tỉnh | 2.500 |
| a8 Kinh doanh | 2% × DT | 302,4 |
| a9 Lãi vay | Nhập | 150 |
| Lợi nhuận nhà đầu tư | 15% × (tổng trên trừ lãi vay = 3.521,8) | 528,3 |
| **CP** | | **4.200,1** |
| **V = DT − CP** | Trường hợp 1, không chiết khấu | **10.919,9** (≈ 9,10 tr/m² đất gốc) |

**Nếu bán làm 2 đợt** (năm 1 và năm 2, giá năm 2 tăng 5%, r = 10%): V = **9.264,6 triệu**, tức thấp hơn khoảng 15% so với bán ngay.

### 4.5 Rủi ro cần chặn trong app [SUY LUẬN]

- **Độ nhạy cao:** nếu DT giảm 10% thì V giảm **13,5%** (từ 10.919,9 xuống 9.442,7 triệu). Sai số ở giá bán lô bị khuếch đại vào giá đất. App nên hiển thị 3 kịch bản DT −10% / cơ sở / +10% trên Thông báo.
- **Lợi nhuận tính trên chi phí không gồm giá đất:** khi chi phí phát triển nhỏ so với giá trị đất (thường gặp khi phân lô đất vườn), lợi nhuận suy ra rất thấp nên V dễ bị cao. Bắt buộc đối chiếu với giá so sánh của đất vườn cùng khu vực.
- **Văn bản là bản dự thảo:** cần khóa phiên bản tham số và ghi nguồn trên Thông báo sau khi đối chiếu văn bản chính thức.

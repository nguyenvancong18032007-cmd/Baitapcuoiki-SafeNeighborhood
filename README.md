# 🛡️ SafeNeighborhood - Hệ Thống Báo Cáo & Quản Lý Sự Cố Cộng Đồng

> **Học phần:** Phát triển ứng dụng Web cơ bản (CSE122)  
> **Trường:** Đại học Thủy Lợi (TLU) - Khoa Công nghệ Thông tin  
> **Giảng viên hướng dẫn & chấm điểm:** ThS. Kiều Tuấn Dũng – ThS. Tạ Chí Hiếu  
> **Phiên bản bài tập:** BTL V2 Multi-Role & AI UX (Năm học 2026)  

---

## 📌 1. Giới thiệu Dự án & Phát biểu Vấn đề (Problem Statement)

### 1.1 Ngữ cảnh thực tế (Context)
Trong các khu dân cư hiện đại và đô thị thông minh, các sự cố hạ tầng (như hỏng đèn đường, ổ gà, cây đổ, nắp cống hư hỏng, rò rỉ nước) xảy ra thường xuyên nhưng quy trình phản ánh của cư dân còn mang tính thủ công, thiếu minh bạch và phản hồi chậm. Về phía ban quản lý và đội vận hành, việc tiếp nhận, phân loại mức độ khẩn cấp, điều phối lực lượng hiện trường và quản trị danh mục người dùng/loại sự cố chưa được tối ưu hóa.

### 1.2 Phát biểu vấn đề (P1 - P4)
* **P1 (Cư dân):** Khó khăn khi báo cáo sự cố, không biết tình trạng xử lý và thiếu công cụ cảnh báo rủi ro xung quanh.
* **P2 (Đội Vận hành / Hiện trường):** Bị quá tải bài toán tiếp nhận thông tin, mất thời gian phân loại thủ công mức độ ưu tiên, quản lý danh sách nhiệm vụ hiện trường và chưa có tóm tắt nhanh để xử lý.
* **P3 (Ban Điều phối & Quản trị):** Gặp khó khăn trong việc quản trị danh mục loại sự cố, quản lý người dùng và theo dõi tiến độ SLA thời gian thực.
* **P4 (Hệ thống / AI):** Cần tích hợp AI minh bạch (Explainable AI) có quyền kiểm soát của con người (User Control) để gợi ý phân loại, đánh giá rủi ro và tự động tóm tắt nội dung báo cáo.

---

## 👥 2. Danh sách Thành viên & Phân công Trách nhiệm (Vertical Slice & Cross-Responsibility)

Dự án áp dụng mô hình **Lát cắt dọc (Vertical Slice)** kết hợp **Trách nhiệm chéo (Cross-Responsibility)** chuẩn Nguyên tắc số 3 trong Barem CSE122:

| STT | Họ và tên | Mã sinh viên | Role phụ trách (Vertical Slice) | Trách nhiệm chéo (Cross-Responsibility) | Tệp màn hình phụ trách |
| :---: | :--- | :---: | :--- | :--- | :--- |
| **1** | **Nguyễn Văn Công** *(Trưởng nhóm)* | `2551060599` | **Cư dân (Primary User)** | **Trục 3:** Triển khai (Deployment), Quản lý Git Flow (`dev` → `main`), Kiểm thử Responsive đa thiết bị & QA. | `bao-cao-su-co.html`, `ai-reference.html` |
| **2** | **Phạm Trí Cường** | *(Cập nhật MSV)* | **Vận hành & Quản trị (Operator / Admin)** | **Trục 1:** Thiết kế hệ thống (Design System / CSS Variables), Thanh điều hướng chung (Navigation/Role Switcher), Quản trị loại sự cố, người dùng & Nhiệm vụ hiện trường. | `ho-so.html` |
| **3** | Nguyễn Duy Đạt | *2551060598* | Điều phối & Quản trị (Coordinator / Moderator) | Trục 2: Xử lý dữ liệu sự cố (Data Pipeline / Validation), Theo dõi tiến độ SLA thời gian thực, Kiểm thử logic JS & Tương tác DOM. | su-co-cua-toi.html, chi-tiet-su-co.html, theo-doi-sla.html |
---

## 🔄 3. Chuỗi Truy Vết Minh Chứng 12 Mắt Xích (End-to-End Traceability Chain)

Mọi màn hình và tính năng trong ứng dụng đều tuân thủ 12 mắt xích minh chứng bất di bất dịch:

1. **Ngữ cảnh thực tế:** Sự cố an toàn hạ tầng khu dân cư đô thị.
2. **Phát biểu vấn đề:** P1 (Báo cáo lâu), P2 (Phân loại chậm & giao nhiệm vụ khó), P3 (Quản trị danh mục kém), P4 (AI đóng đen).
3. **Vai trò người dùng:** Cư dân (User), Vận hành & Quản trị (Operator/Admin), Điều phối (Manager).
4. **Luồng người dùng:** User Goal → User Task → User Flow.
5. **Bảng kiểm kê màn hình:** `docs/screen-inventory.md`
6. **Bản thiết kế giao diện:** Wireframe & Mockup trên Figma / Canva.
7. **Thẻ công việc:** GitHub Projects (`TASK-01`, `TASK-02`, `TASK-03`).
8. **Nhánh phát triển Git:** Feature Branches (`feature/su-co-cua-toi`, `feature/ho-so`, `feature/ai-states-reference`).
9. **Ghi nhận thay đổi:** Conventional Commits (`feat: ...`, `fix: ...`).
10. **Pull Request & Peer Review:** Quy trình mở PR, review và approve chéo giữa các thành viên trước khi gộp vào `dev`.
11. **Video minh chứng OBS:** Mỗi màn hình tương ứng 01 Video OBS có mặt sinh viên và giọng giải thích code.
12. **Bảo vệ Vấn đáp & Sửa trực tiếp:** Viva & Live Modification 5-10 phút tại phòng thi.

---

## 🤖 4. Trải nghiệm Sản phẩm AI Minh Bạch (Explainable & Controllable AI UX)

Hệ thống triển khai **03 Tính năng AI đặc thù** tuân thủ nghiêm ngặt **Chuẩn 6 bước tương tác AI UX** (Input → Processing → Output → Explainability → User Control → Save/Apply) và kịch bản **AI Uncertainty / Failure UX**:

* **AI-1 (Smart Discovery - Cư dân):** Tìm sự cố tương tự & gợi ý tự động loại sự cố (Đèn đường, Ổ gà, Cây xanh, Vật cản). Có chỉ số độ tin cậy % và khối giải thích *"Vì sao có gợi ý này?"*.
* **AI-2 (Risk Alert - Vận hành & Quản trị):** Phân tích dấu hiệu rủi ro an toàn cộng đồng để đề xuất mức khẩn cấp (Cao, Trung bình, Thấp) và ưu tiên cho nhiệm vụ hiện trường.
* **AI-3 (AI Copilot - Quản trị/Điều phối):** Tóm tắt nội dung bàn giao công việc cho đội hiện trường và tạo kế hoạch xử lý theo SLA. Cho phép người dùng sửa trực tiếp nội dung tóm tắt trước khi lưu.
* **AI Failure / Uncertainty UX:** Khi đầu vào thiếu thông tin (<20 ký tự mô tả) hoặc mâu thuẫn, AI chuyển sang trạng thái cảnh báo màu vàng (*"AI chưa chắc chắn - Độ tin cậy 42%"*) kèm nút hành động *"Bổ sung thông tin"* hoặc *"Chuyển sang nhập thủ công"*.
* **AI States Reference (`ai-reference.html`):** Bộ chuẩn 7 trạng thái AI dùng chung toàn hệ thống (`IDLE`, `LOADING`, `SUCCESS`, `UNCERTAIN`, `ERROR`, `EMPTY DATA`, `EDITED`).

---

## 📂 5. Cấu trúc Thư mục Mã nguồn (Project Structure)

```text
Baitapcuoiki-SafeNeighborhood/
├── css/
│   ├── style.css             # Khai báo biến CSS (:root), layout chung & Design System
│   ├── bao-cao-su-co.css     # Style riêng cho trang Báo cáo sự cố (TASK-01)
│   ├── ho-so.css             # Style riêng cho trang Hồ sơ, Quản trị & Nhiệm vụ hiện trường (TASK-02)
│   └── ai-reference.css      # Style lưới 7 trạng thái AI UX Reference (TASK-03)
├── js/
│   ├── main.js               # Điều hướng Shell UI, Role Switcher, Toast Notification & Modal
│   ├── bao-cao-su-co.js      # Logic Form Validation, xử lý 6 bước AI UX & LocalStorage
│   ├── ho-so.js              # Logic Bảng dữ liệu, Nhiệm vụ hiện trường, Thao tác hàng loạt & AI Copilot
│   └── ai-reference.js       # Logic gọi Toast & kiểm thử trạng thái AI Reference
├── docs/
│   ├── screen-inventory.md   # Bảng kiểm kê màn hình chi tiết 12 cột
│   └── ai-usage-report.md    # Báo cáo khai báo minh bạch việc sử dụng công cụ AI
├── index.html                # Trang khung sườn chính (Shell) chứa Sidebar, Header & Iframe
├── bao-cao-su-co.html        # Trang Báo cáo sự cố (Role Cư dân - TASK-01)
├── ho-so.html                # Trang Hồ sơ, Quản trị & Nhiệm vụ hiện trường (Role Vận hành/Quản trị - TASK-02)
├── ai-reference.html         # Trang Tham chiếu 7 Trạng thái AI UX (TASK-03)
└── README.md                 # Tài liệu hướng dẫn dự án chuẩn Barem CSE122

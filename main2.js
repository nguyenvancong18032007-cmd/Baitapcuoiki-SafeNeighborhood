(() => {
  "use strict";

  const areaNames = ["P. Bến Nghé, Quận 1", "P. Đa Kao, Quận 1", "P. Nguyễn Thái Bình", "P. Tân Định, Quận 1", "P. Bến Thành, Quận 1", "P. Cầu Ông Lãnh"];
  const seedUsers = [
    ["Nguyễn Minh An", "user1@safe.vn", "Cư dân", 0, "Hoạt động", "12/04/2025", "Cao"],
    ["Lê Thanh Thảo", "user2@safe.vn", "Vận hành", 1, "Hoạt động", "12/04/2025", "Cao"],
    ["Hoàng Tuấn", "user3@safe.vn", "Điều phối", 2, "Hoạt động", "12/04/2025", "Cao"],
    ["Phạm Mai", "user4@safe.vn", "Admin", 3, "Bị khóa", "12/04/2025", "Cao"],
    ["Trần Gia Huy", "user5@safe.vn", "Cư dân", 4, "Hoạt động", "11/04/2025", "Trung bình"],
    ["Võ Ngọc Hà", "user6@safe.vn", "Vận hành", 5, "Chờ xác nhận", "10/04/2025", "Thấp"],
    ["Đặng Minh Khang", "user7@safe.vn", "Cư dân", 0, "Hoạt động", "09/04/2025", "Cao"],
    ["Bùi Thu Trang", "user8@safe.vn", "Điều phối", 1, "Hoạt động", "08/04/2025", "Trung bình"],
    ["Nguyễn Quốc Bảo", "user9@safe.vn", "Cư dân", 2, "Bị khóa", "07/04/2025", "Thấp"],
    ["Phan Khánh Linh", "user10@safe.vn", "Vận hành", 3, "Hoạt động", "06/04/2025", "Cao"],
    ["Đỗ Anh Thư", "user11@safe.vn", "Cư dân", 4, "Hoạt động", "05/04/2025", "Trung bình"],
    ["Trương Minh Đức", "user12@safe.vn", "Admin", 5, "Chờ xác nhận", "04/04/2025", "Cao"],
    ["Hồ Thanh Bình", "user13@safe.vn", "Cư dân", 0, "Hoạt động", "03/04/2025", "Thấp"],
    ["Lý Hoàng Nam", "user14@safe.vn", "Vận hành", 1, "Hoạt động", "02/04/2025", "Trung bình"],
    ["Mai Phương Anh", "user15@safe.vn", "Điều phối", 2, "Bị khóa", "01/04/2025", "Cao"],
    ["Đinh Quốc Việt", "user16@safe.vn", "Cư dân", 3, "Hoạt động", "31/03/2025", "Thấp"],
    ["Cao Mỹ Duyên", "user17@safe.vn", "Vận hành", 4, "Hoạt động", "30/03/2025", "Trung bình"],
    ["Vũ Đức Long", "user18@safe.vn", "Cư dân", 5, "Chờ xác nhận", "29/03/2025", "Cao"],
    ["Ngô Hải Yến", "user19@safe.vn", "Điều phối", 0, "Hoạt động", "28/03/2025", "Trung bình"],
    ["Đào Tuấn Kiệt", "user20@safe.vn", "Cư dân", 1, "Hoạt động", "27/03/2025", "Thấp"],
    ["Dương Bảo Ngọc", "user21@safe.vn", "Vận hành", 2, "Bị khóa", "26/03/2025", "Cao"],
    ["Tạ Minh Quân", "user22@safe.vn", "Cư dân", 3, "Hoạt động", "25/03/2025", "Trung bình"],
    ["Chu Thùy Linh", "user23@safe.vn", "Admin", 4, "Hoạt động", "24/03/2025", "Thấp"],
    ["Hà Nhật Minh", "user24@safe.vn", "Cư dân", 5, "Chờ xác nhận", "23/03/2025", "Cao"]
  ];
  const users = seedUsers.map((user, index) => ({
    id: `user-${index + 1}`,
    name: user[0],
    email: user[1],
    role: user[2],
    area: areaNames[user[3]],
    status: user[4],
    joined: user[5],
    priority: user[6]
  }));
  const pageSize = 4;
  const selected = new Set();
  let currentPage = 1;
  let appliedFilters = { area: "", priority: "", status: "", sort: "priority" };
  let toastTimer;

  const byId = (id) => document.getElementById(id);
  const tableBody = byId("danhSachNguoiDung");
  const formUser = byId("formNguoiDung");

  function initials(name) {
    return name.trim().split(/\s+/).slice(-2).map((part) => part[0]).join("").toUpperCase();
  }

  function roleClass(role) {
    if (role === "Admin") return "role-admin";
    if (role === "Điều phối") return "role-dieu-phoi";
    if (role === "Vận hành") return "role-van-hanh";
    return "role-cu-dan";
  }

  function statusClass(status) {
    if (status === "Bị khóa") return "status-bi-khoa";
    if (status === "Chờ xác nhận") return "status-cho-xac-nhan";
    return "status-hoat-dong";
  }

  function getVisibleUsers() {
    const priorityOrder = { Cao: 0, "Trung bình": 1, Thấp: 2 };
    const filtered = users.filter((user) =>
      (!appliedFilters.area || user.area === appliedFilters.area) &&
      (!appliedFilters.priority || user.priority === appliedFilters.priority) &&
      (!appliedFilters.status || user.status === appliedFilters.status)
    );
    if (appliedFilters.sort === "name") filtered.sort((a, b) => a.name.localeCompare(b.name, "vi"));
    else if (appliedFilters.sort === "newest") filtered.sort((a, b) => b.id.localeCompare(a.id));
    else filtered.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority] || a.id.localeCompare(b.id));
    return filtered;
  }

  function renderPagination(pageCount) {
    const nav = byId("phanTrang");
    nav.replaceChildren();
    const previous = document.createElement("button");
    previous.type = "button";
    previous.textContent = "‹";
    previous.setAttribute("aria-label", "Trang trước");
    previous.disabled = currentPage <= 1;
    previous.addEventListener("click", () => { currentPage -= 1; render(); });
    nav.append(previous);

    const start = Math.max(1, Math.min(currentPage - 1, pageCount - 2));
    const end = Math.min(pageCount, start + 2);
    for (let page = start; page <= end; page += 1) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = String(page);
      button.classList.toggle("dang-chon", page === currentPage);
      button.setAttribute("aria-label", `Trang ${page}`);
      if (page === currentPage) button.setAttribute("aria-current", "page");
      button.addEventListener("click", () => { currentPage = page; render(); });
      nav.append(button);
    }

    const next = document.createElement("button");
    next.type = "button";
    next.textContent = "›";
    next.setAttribute("aria-label", "Trang sau");
    next.disabled = currentPage >= pageCount;
    next.addEventListener("click", () => { currentPage += 1; render(); });
    nav.append(next);
  }

  function render() {
    const visibleUsers = getVisibleUsers();
    const pageCount = Math.max(1, Math.ceil(visibleUsers.length / pageSize));
    currentPage = Math.min(currentPage, pageCount);
    const startIndex = (currentPage - 1) * pageSize;
    const pageUsers = visibleUsers.slice(startIndex, startIndex + pageSize);
    tableBody.replaceChildren();

    if (pageUsers.length === 0) {
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      cell.colSpan = 7;
      cell.className = "khong-co-du-lieu";
      cell.textContent = "Không tìm thấy người dùng phù hợp.";
      row.append(cell);
      tableBody.append(row);
    }

    for (const user of pageUsers) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="cot-checkbox"><input type="checkbox" data-select-user="${user.id}" aria-label="Chọn ${escapeHtml(user.name)}" ${selected.has(user.id) ? "checked" : ""}></td>
        <td><div class="nguoi-dung"><span class="anh-dai-dien">${escapeHtml(initials(user.name))}</span><span class="ten-email"><strong>${escapeHtml(user.name)}</strong><small>${escapeHtml(user.email)}</small></span></div></td>
        <td><span class="nhan-vai-tro ${roleClass(user.role)}">${escapeHtml(user.role)}</span></td>
        <td>${escapeHtml(user.area)}</td>
        <td><span class="nhan-trang-thai ${statusClass(user.status)}">${escapeHtml(user.status)}</span></td>
        <td>${escapeHtml(user.joined)}</td>
        <td class="o-thao-tac"><button class="nut-thao-tac" type="button" data-action="menu" data-user-id="${user.id}" aria-label="Thao tác với ${escapeHtml(user.name)}" aria-expanded="false">···</button></td>`;
      tableBody.append(row);
    }

    const pageIds = pageUsers.map((user) => user.id);
    const selectedOnPage = pageIds.filter((id) => selected.has(id)).length;
    const selectAll = byId("chonTatCa");
    selectAll.checked = pageIds.length > 0 && selectedOnPage === pageIds.length;
    selectAll.indeterminate = selectedOnPage > 0 && selectedOnPage < pageIds.length;
    byId("thanhChon").hidden = selected.size === 0;
    byId("soMucDaChon").textContent = `${selected.size} mục đã chọn`;
    byId("thongTinTrang").textContent = visibleUsers.length
      ? `Hiển thị ${startIndex + 1}–${Math.min(startIndex + pageSize, visibleUsers.length)} trong ${visibleUsers.length} kết quả`
      : "Hiển thị 0 trong 0 kết quả";
    renderPagination(pageCount);
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
  }

  function showToast(message) {
    const container = byId("khungToast");
    container.replaceChildren();
    const toast = document.createElement("div");
    toast.className = "toast";
    const text = document.createElement("span");
    text.textContent = `✓　${message}`;
    const close = document.createElement("button");
    close.type = "button";
    close.setAttribute("aria-label", "Đóng thông báo");
    close.textContent = "×";
    close.addEventListener("click", () => container.replaceChildren());
    toast.append(text, close);
    container.append(toast);
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.remove(), 4000);
  }

  function populateAreas() {
    const filter = byId("locKhuVuc");
    const areaSelect = byId("khuVucNguoiDung");
    for (const area of areaNames) {
      const filterOption = document.createElement("option");
      filterOption.value = area;
      filterOption.textContent = area;
      filter.append(filterOption);
      const formOption = document.createElement("option");
      formOption.value = area;
      formOption.textContent = area;
      areaSelect.append(formOption);
    }
  }

  function openNewUser() {
    formUser.reset();
    byId("idNguoiDung").value = "";
    byId("tieuDeHop").textContent = "Thêm người dùng";
    byId("nutLuuNguoiDung").textContent = "Thêm người dùng";
    byId("hopNguoiDung").showModal();
  }

  function editUser(user) {
    byId("idNguoiDung").value = user.id;
    byId("tenNguoiDung").value = user.name;
    byId("emailNguoiDung").value = user.email;
    byId("vaiTroNguoiDung").value = user.role;
    byId("khuVucNguoiDung").value = user.area;
    byId("uuTienNguoiDung").value = user.priority;
    byId("tieuDeHop").textContent = "Chỉnh sửa người dùng";
    byId("nutLuuNguoiDung").textContent = "Lưu thay đổi";
    byId("hopNguoiDung").showModal();
  }

  byId("formBoLoc").addEventListener("submit", (event) => {
    event.preventDefault();
    appliedFilters = {
      area: byId("locKhuVuc").value,
      priority: byId("locUuTien").value,
      status: byId("locTrangThai").value,
      sort: byId("locSapXep").value
    };
    currentPage = 1;
    render();
  });

  byId("chonTatCa").addEventListener("change", (event) => {
    const visibleUsers = getVisibleUsers();
    const pageUsers = visibleUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    for (const user of pageUsers) {
      if (event.target.checked) selected.add(user.id);
      else selected.delete(user.id);
    }
    render();
  });

  tableBody.addEventListener("change", (event) => {
    const checkbox = event.target.closest("[data-select-user]");
    if (!checkbox) return;
    if (checkbox.checked) selected.add(checkbox.dataset.selectUser);
    else selected.delete(checkbox.dataset.selectUser);
    render();
  });

  tableBody.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    const user = users.find((item) => item.id === button.dataset.userId);
    if (!user) return;
    if (button.dataset.action === "menu") {
      const existing = button.parentElement.querySelector(".menu-thao-tac");
      document.querySelectorAll(".menu-thao-tac").forEach((menu) => menu.remove());
      if (existing) {
        button.setAttribute("aria-expanded", "false");
        return;
      }
      button.setAttribute("aria-expanded", "true");
      const menu = document.createElement("div");
      menu.className = "menu-thao-tac";
      const edit = document.createElement("button");
      edit.type = "button";
      edit.dataset.action = "edit";
      edit.dataset.userId = user.id;
      edit.textContent = "Chỉnh sửa";
      const toggle = document.createElement("button");
      toggle.type = "button";
      toggle.dataset.action = "toggle-status";
      toggle.dataset.userId = user.id;
      toggle.textContent = user.status === "Bị khóa" ? "Mở khóa tài khoản" : "Khóa tài khoản";
      const remove = document.createElement("button");
      remove.type = "button";
      remove.dataset.action = "delete";
      remove.dataset.userId = user.id;
      remove.className = "hanh-dong-xoa";
      remove.textContent = "Xóa người dùng";
      menu.append(edit, toggle, remove);
      button.parentElement.append(menu);
      return;
    }
    if (button.dataset.action === "edit") {
      editUser(user);
    } else if (button.dataset.action === "toggle-status") {
      user.status = user.status === "Bị khóa" ? "Hoạt động" : "Bị khóa";
      showToast(user.status === "Bị khóa" ? "Đã khóa tài khoản" : "Đã mở khóa tài khoản");
    } else if (button.dataset.action === "delete") {
      if (window.confirm(`Bạn có chắc muốn xóa người dùng ${user.name}?`)) {
        users.splice(users.indexOf(user), 1);
        selected.delete(user.id);
        showToast("Đã xóa người dùng");
      }
    }
    render();
  });

  byId("nutThemNguoiDung").addEventListener("click", openNewUser);

  byId("emailNguoiDung").addEventListener("input", (event) => {
    event.target.setCustomValidity("");
  });

  formUser.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!formUser.reportValidity()) return;
    const id = byId("idNguoiDung").value;
    const email = byId("emailNguoiDung").value.trim();
    const duplicateEmail = users.some((user) => user.email.toLowerCase() === email.toLowerCase() && user.id !== id);
    if (duplicateEmail) {
      byId("emailNguoiDung").setCustomValidity("Email này đã được sử dụng.");
      byId("emailNguoiDung").reportValidity();
      return;
    }
    byId("emailNguoiDung").setCustomValidity("");
    const userData = {
      name: byId("tenNguoiDung").value.trim(),
      email,
      role: byId("vaiTroNguoiDung").value,
      area: byId("khuVucNguoiDung").value,
      priority: byId("uuTienNguoiDung").value
    };
    if (id) {
      const user = users.find((item) => item.id === id);
      Object.assign(user, userData);
      showToast("Đã cập nhật thông tin người dùng");
    } else {
      const nextId = `user-${Date.now()}`;
      users.unshift({ ...userData, id: nextId, status: "Chờ xác nhận", joined: new Intl.DateTimeFormat("vi-VN").format(new Date()) });
      selected.clear();
      showToast("Đã thêm người dùng mới");
    }
    appliedFilters = { area: "", priority: "", status: "", sort: "priority" };
    byId("locKhuVuc").value = "";
    byId("locUuTien").value = "";
    byId("locTrangThai").value = "";
    byId("locSapXep").value = "priority";
    currentPage = 1;
    byId("hopNguoiDung").close();
    render();
  });

  byId("nutCapNhatQuyen").addEventListener("click", () => {
    byId("moTaCapNhatQuyen").textContent = `Áp dụng vai trò mới cho ${selected.size} người dùng đã chọn.`;
    byId("hopCapNhatQuyen").showModal();
  });

  byId("formCapNhatQuyen").addEventListener("submit", (event) => {
    event.preventDefault();
    const role = byId("vaiTroHangLoat").value;
    users.filter((user) => selected.has(user.id)).forEach((user) => { user.role = role; });
    const count = selected.size;
    selected.clear();
    byId("hopCapNhatQuyen").close();
    render();
    showToast(`Đã cập nhật quyền cho ${count} mục`);
  });

  byId("nutBoChon").addEventListener("click", () => {
    selected.clear();
    render();
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest(".o-thao-tac")) return;
    document.querySelectorAll(".menu-thao-tac").forEach((menu) => {
      const trigger = menu.parentElement.querySelector('[data-action="menu"]');
      if (trigger) trigger.setAttribute("aria-expanded", "false");
      menu.remove();
    });
  });

  document.querySelectorAll("[data-close]").forEach((button) => {
    button.addEventListener("click", () => byId(button.dataset.close).close());
  });

  populateAreas();
  render();
})();
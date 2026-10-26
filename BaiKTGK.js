let incidents = [
    { id: "MIS-2041", title: "Đèn đường không hoạt động", time: "12 phút trước", location: "P. Bến Nghé, Quận 1", status: "Đang xử lý", sla: "6 giờ", category: "Cơ sở hạ tầng", priority: "Cao" },
    { id: "MIS-2039", title: "Ổ gà lớn trên mặt đường", time: "48 phút trước", location: "P. Đa Kao, Quận 1", status: "Đã phân công", sla: "1 giờ 20 phút", category: "Cơ sở hạ tầng", priority: "Trung bình" },
    { id: "MIS-2036", title: "Cây đổ chắn lối đi bộ", time: "2 giờ trước", location: "P. Nguyễn Thái Bình", status: "Đang chờ", sla: "8 giờ", category: "Cơ sở hạ tầng", priority: "Cao" },
    { id: "MIS-2028", title: "Nắp cống bị hư hỏng", time: "Hôm qua", location: "P. Tân Định, Quận 1", status: "Hoàn thành", sla: "0 giờ", category: "Cơ sở hạ tầng", priority: "Thấp" },
    { id: "MIS-2024", title: "Đèn giao thông bị rò điện", time: "Hôm qua", location: "P. Bến Thành, Quận 1", status: "Đang xử lý", sla: "4 giờ", category: "Cơ sở hạ tầng", priority: "Cao" },
    { id: "MIS-2020", title: "Vỉa hè bị bong tróc gạch", time: "2 ngày trước", location: "P. Phạm Ngũ Lão, Quận 1", status: "Đã phân công", sla: "12 giờ", category: "Cơ sở hạ tầng", priority: "Thấp" },
    { id: "MIS-2018", title: "Sập biển cảnh báo công trình", time: "2 ngày trước", location: "P. Đa Kao, Quận 1", status: "Đang chờ", sla: "5 giờ", category: "Cơ sở hạ tầng", priority: "Trung bình" },
    { id: "MIS-2015", title: "Ống nước vỡ gây ngập cục bộ", time: "3 ngày trước", location: "P. Bến Nghé, Quận 1", status: "Hoàn thành", sla: "0 giờ", category: "Cơ sở hạ tầng", priority: "Cao" },
    { id: "MIS-2011", title: "Cột điện nghiêng gây nguy hiểm", time: "3 ngày trước", location: "P. Cầu Kho, Quận 1", status: "Đang xử lý", sla: "2 giờ", category: "Cơ sở hạ tầng", priority: "Cao" },
    { id: "MIS-2009", title: "Hệ thống thoát nước tắc nghẽn", time: "4 ngày trước", location: "P. Cô Giang, Quận 1", status: "Đã phân công", sla: "18 giờ", category: "Cơ sở hạ tầng", priority: "Trung bình" },
    { id: "MIS-2005", title: "Lan can cầu thang công cộng hỏng", time: "4 ngày trước", location: "P. Cầu Ông Lãnh, Quận 1", status: "Đang chờ", sla: "10 giờ", category: "Cơ sở hạ tầng", priority: "Thấp" },
    { id: "MIS-2001", title: "Ghế đá công viên gãy vỡ", time: "5 ngày trước", location: "P. Bến Nghé, Quận 1", status: "Hoàn thành", sla: "0 giờ", category: "Cơ sở hạ tầng", priority: "Thấp" }
];

let selectedIds = [];
let currentPage = 1;
const pageSize = 4;
let toastTimeout;

const tableBody = document.getElementById("tableBody");
const searchInput = document.getElementById("searchInput");
const filterType = document.getElementById("filterType");
const filterPriority = document.getElementById("filterPriority");
const filterStatus = document.getElementById("filterStatus");
const btnFilter = document.getElementById("btnFilter");
const selectAllCheckbox = document.getElementById("selectAllCheckbox");
const batchBar = document.getElementById("batchBar");
const batchCountText = document.getElementById("batchCountText");
const btnDeselectAll = document.getElementById("btnDeselectAll");

const toastNotification = document.getElementById("toastNotification");
const toastMessage = document.getElementById("toastMessage");
const btnCloseToast = document.getElementById("btnCloseToast");

const reportModal = document.getElementById("reportModal");
const btnOpenModal = document.getElementById("btnOpenModal");
const btnCloseModal = document.getElementById("btnCloseModal");
const btnCancelModal = document.getElementById("btnCancelModal");
const addReportForm = document.getElementById("addReportForm");

function renderTable() {
    const filteredData = getFilteredData();
    const totalItems = filteredData.length;
    
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

    tableBody.innerHTML = "";

    if (paginatedData.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 24px; color: #64748b;">Không tìm thấy kết quả phù hợp.</td></tr>`;
        updatePaginationInfo(0, 0, 0);
        renderPaginationBtns(0);
        return;
    }

    paginatedData.forEach(item => {
        const isChecked = selectedIds.includes(item.id) ? "checked" : "";
        const statusClass = getStatusClass(item.status);

        const row = document.createElement("tr");
        row.innerHTML = `
            <td><input type="checkbox" class="row-checkbox" data-id="${item.id}" ${isChecked}></td>
            <td><a href="#" class="incident-code">${item.id}</a></td>
            <td>
                <div><strong>${item.title}</strong></div>
                <div class="sub-time">${item.time}</div>
            </td>
            <td>${item.location}</td>
            <td><span class="status-badge ${statusClass}">• ${item.status}</span></td>
            <td>
                <div class="sla-wrapper">
                    <span>${item.sla}</span>
                    <div class="sla-bar">
                        <div class="sla-fill" style="width: ${item.status === 'Hoàn thành' ? '100%' : '50%'}"></div>
                    </div>
                </div>
            </td>
            <td>
                <button class="btn-action-more" data-id="${item.id}" title="Thao tác">&#8943;</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    updatePaginationInfo(startIndex + 1, Math.min(startIndex + pageSize, totalItems), totalItems);
    renderPaginationBtns(totalItems);
    attachEventsToRows();
}

function getStatusClass(status) {
    switch (status) {
        case "Đang xử lý": return "status-dang-xuly";
        case "Đã phân công": return "status-da-phan-cong";
        case "Đang chờ": return "status-dang-cho";
        case "Hoàn thành": return "status-hoan-thanh";
        default: return "";
    }
}

function getFilteredData() {
    const query = searchInput.value.toLowerCase().trim();
    const type = filterType.value;
    const priority = filterPriority.value;
    const status = filterStatus.value;

    return incidents.filter(item => {
        const matchSearch = item.id.toLowerCase().includes(query) || 
                            item.title.toLowerCase().includes(query) || 
                            item.location.toLowerCase().includes(query);
        const matchType = type === "" || item.category === type;
        const matchPriority = priority === "" || item.priority === priority;
        const matchStatus = status === "" || item.status === status;

        return matchSearch && matchType && matchPriority && matchStatus;
    });
}

function attachEventsToRows() {
    document.querySelectorAll(".row-checkbox").forEach(cb => {
        cb.addEventListener("change", (e) => {
            const id = e.target.getAttribute("data-id");
            if (e.target.checked) {
                if (!selectedIds.includes(id)) selectedIds.push(id);
            } else {
                selectedIds = selectedIds.filter(i => i !== id);
            }
            updateBatchBar();
        });
    });

    document.querySelectorAll(".btn-action-more").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = e.currentTarget.getAttribute("data-id");
            if (confirm(`Thao tác cho sự cố ${id}:\nBạn có muốn xóa bản ghi này khỏi hệ thống?`)) {
                incidents = incidents.filter(item => item.id !== id);
                selectedIds = selectedIds.filter(i => i !== id);
                renderTable();
                updateBatchBar();
            }
        });
    });
}

function updateBatchBar() {
    if (selectedIds.length > 0) {
        batchBar.classList.remove("hidden");
        batchCountText.textContent = `${selectedIds.length} mục đã chọn`;
    } else {
        batchBar.classList.add("hidden");
        selectAllCheckbox.checked = false;
    }
}

function showToast(msg) {
    toastMessage.textContent = msg;
    toastNotification.classList.remove("hidden");
    
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toastNotification.classList.add("hidden");
    }, 3500);
}

btnCloseToast.addEventListener("click", () => {
    toastNotification.classList.add("hidden");
});
btnFilter.addEventListener("click", () => {
    currentPage = 1;
    renderTable();
    showToast("Đang hiển thị tất cả kết quả");
});

selectAllCheckbox.addEventListener("change", (e) => {
    const currentFiltered = getFilteredData();
    if (e.target.checked) {
        selectedIds = currentFiltered.map(item => item.id);
    } else {
        selectedIds = [];
    }
    renderTable();
    updateBatchBar();
});

btnDeselectAll.addEventListener("click", () => {
    selectedIds = [];
    renderTable();
    updateBatchBar();
});

searchInput.addEventListener("input", () => {
    currentPage = 1;
    renderTable();
});

btnOpenModal.addEventListener("click", () => reportModal.classList.remove("hidden"));
btnCloseModal.addEventListener("click", () => reportModal.classList.add("hidden"));
btnCancelModal.addEventListener("click", () => reportModal.classList.add("hidden"));

addReportForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newReport = {
        id: `MIS-${Math.floor(1000 + Math.random() * 9000)}`,
        title: document.getElementById("inputTitle").value,
        time: "Vừa xong",
        location: document.getElementById("inputLocation").value,
        status: "Đang chờ",
        sla: "24 giờ",
        category: document.getElementById("inputCategory").value,
        priority: document.getElementById("inputPriority").value
    };

    incidents.unshift(newReport);
    addReportForm.reset();
    reportModal.classList.add("hidden");
    renderTable();
    showToast("Đã thêm báo cáo sự cố mới thành công!");
});

function updatePaginationInfo(from, to, total) {
    document.getElementById("paginationInfo").textContent = `Hiển thị ${from}-${to} trong ${total} kết quả`;
}

function renderPaginationBtns(totalItems) {
    const paginationBtns = document.getElementById("paginationBtns");
    const totalPages = Math.ceil(totalItems / pageSize) || 1;

    paginationBtns.innerHTML = "";

    const prevBtn = document.createElement("button");
    prevBtn.textContent = "<";
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
        }
    });
    paginationBtns.appendChild(prevBtn);

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        if (i === currentPage) btn.classList.add("active");
        btn.addEventListener("click", () => {
            currentPage = i;
            renderTable();
        });
        paginationBtns.appendChild(btn);
    }

    const nextBtn = document.createElement("button");
    nextBtn.textContent = ">";
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderTable();
        }
    });
    paginationBtns.appendChild(nextBtn);
}

document.addEventListener("DOMContentLoaded", renderTable);
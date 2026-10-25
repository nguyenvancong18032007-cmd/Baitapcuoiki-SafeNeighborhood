'use strict';

const danhSachThongBao = [
  { id: 1, noiDung: 'Sự cố #IS-2041 vừa được cập nhật', thoiGian: '2 phút trước', daDoc: false },
  { id: 2, noiDung: 'Nhiệm vụ hiện trường sắp đến hạn', thoiGian: '3 phút trước', daDoc: false },
  { id: 3, noiDung: 'Safe AI có đề xuất ưu tiên mới', thoiGian: '4 phút trước', daDoc: false }
];

const layPhanTu = (id) => document.getElementById(id);

// Hàm hiển thị Toast thông báo toàn cục
function hienToast(noiDung, kieu = 'xanh-la') {
  const phanTuToast = layPhanTu('khungToast');
  if (!phanTuToast) return;
  
  const toast = document.createElement('div');
  toast.className = 'toast ' + (kieu === 'xanh-la' ? '' : kieu);
  toast.setAttribute('role', 'status');
  
  let bieuTuong = 'bieu-tuong-tich';
  if (kieu === 'vang' || kieu === 'do') bieuTuong = 'bieu-tuong-canh-bao';
  if (kieu === 'tim') bieuTuong = 'bieu-tuong-ai';
  
  toast.innerHTML = `
    <svg width="16" height="16"><use href="#${bieuTuong}"/></svg>
    <span>${noiDung}</span>
    <button type="button" aria-label="Đóng"><svg width="14" height="14"><use href="#bieu-tuong-dong"/></svg></button>
  `;
  
  const dong = () => toast.remove();
  toast.querySelector('button').addEventListener('click', dong);
  phanTuToast.appendChild(toast);
  setTimeout(dong, 4000);
}

// Render danh sách thông báo
function veThongBao() {
  const dsThongBaoEl = layPhanTu('danhSachThongBao');
  const huyHieuEl = layPhanTu('huyHieu');
  if (!dsThongBaoEl || !huyHieuEl) return;

  dsThongBaoEl.innerHTML = danhSachThongBao.map((tb) => `
    <li class="${tb.daDoc ? 'da-doc' : ''}" data-id="${tb.id}">
      <span class="cham"></span>
      <div><strong>${tb.noiDung}</strong><small>${tb.thoiGian}</small></div>
    </li>`).join('');

  const soChuaDoc = danhSachThongBao.filter((tb) => !tb.daDoc).length;
  huyHieuEl.textContent = soChuaDoc;
  huyHieuEl.hidden = soChuaDoc === 0;
}

const nutChuong = layPhanTu('nutChuong');
const hopThongBao = layPhanTu('hopThongBao');

function dongHopThongBao() {
  if (hopThongBao) {
    hopThongBao.hidden = true;
    if (nutChuong) nutChuong.setAttribute('aria-expanded', 'false');
  }
}

if (nutChuong && hopThongBao) {
  nutChuong.addEventListener('click', (suKien) => {
    suKien.stopPropagation();
    hopThongBao.hidden = !hopThongBao.hidden;
    nutChuong.setAttribute('aria-expanded', String(!hopThongBao.hidden));
  });

  hopThongBao.addEventListener('click', (suKien) => {
    suKien.stopPropagation();
    const dong = suKien.target.closest('li');
    if (!dong) return;
    const item = danhSachThongBao.find((tb) => tb.id === Number(dong.dataset.id));
    if (item) item.daDoc = true;
    veThongBao();
  });

  const nutDanhDau = layPhanTu('nutDanhDauDaDoc');
  if (nutDanhDau) {
    nutDanhDau.addEventListener('click', () => {
      danhSachThongBao.forEach((tb) => (tb.daDoc = true));
      veThongBao();
      hienToast('Đã đánh dấu tất cả thông báo là đã đọc');
    });
  }
}

document.addEventListener('click', dongHopThongBao);

// Phím tắt Escape & Ctrl/Cmd + K
document.addEventListener('keydown', (suKien) => {
  if (suKien.key === 'Escape') dongHopThongBao();
  if ((suKien.metaKey || suKien.ctrlKey) && suKien.key.toLowerCase() === 'k') {
    suKien.preventDefault();
    const oTimKiem = layPhanTu('oTimKiem');
    if (oTimKiem) oTimKiem.focus();
  }
});

// Chuyển Role
const chonVaiTroEl = layPhanTu('chonVaiTro');
if (chonVaiTroEl) {
  chonVaiTroEl.addEventListener('change', (suKien) => {
    const vaiTroMoi = suKien.target.value;
    document.querySelectorAll('.vai-tro-hien-tai').forEach(el => el.textContent = vaiTroMoi);
    hienToast('Đã chuyển sang không gian "' + vaiTroMoi + '"', 'xanh');
  });
}

// Mobile Menu
const nutMenu = layPhanTu('nutMenu');
const thanhBen = layPhanTu('thanhBen');
if (nutMenu && thanhBen) {
  nutMenu.addEventListener('click', (suKien) => {
    suKien.stopPropagation();
    thanhBen.classList.toggle('mo');
  });
  document.addEventListener('click', (suKien) => {
    if (!suKien.target.closest('#thanhBen')) thanhBen.classList.remove('mo');
  });
}

// Đồng bộ active menu & Breadcrumb Header
const danhSachMucMenu = document.querySelectorAll('.muc-menu');
const tenTrangHienTaiEl = layPhanTu('tenTrangHienTai');

danhSachMucMenu.forEach((muc) => {
  muc.addEventListener('click', function () {
    danhSachMucMenu.forEach((m) => m.classList.remove('dang-chon'));
    this.classList.add('dang-chon');

    if (tenTrangHienTaiEl) {
      tenTrangHienTaiEl.textContent = this.textContent.trim();
    }

    if (window.innerWidth <= 900 && thanhBen) {
      thanhBen.classList.remove('mo');
    }
  });
});

veThongBao();
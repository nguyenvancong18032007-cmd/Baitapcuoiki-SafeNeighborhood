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

const mucDieuHuongTheoVaiTro = {
  'Cư dân': [
    { ten: 'Bản đồ sự cố', bieuTuong: 'bieu-tuong-ban-do', duongDan: 'ban-do-su-co.html' },
    { ten: 'Báo cáo sự cố', bieuTuong: 'bieu-tuong-tai-lieu', duongDan: 'bao-cao-su-co.html' },
    { ten: 'Sự cố của tôi', bieuTuong: 'bieu-tuong-luoi', duongDan: 'su-co-cua-toi.html' },
    { ten: 'Hồ sơ', bieuTuong: 'bieu-tuong-nguoi', duongDan: 'ho-so.html' }
  ],
  'Vận hành': [
    { ten: 'Hàng đợi sự cố', bieuTuong: 'bieu-tuong-ban-do', soLuong: '27' },
    { ten: 'Chi tiết sự cố', bieuTuong: 'bieu-tuong-tai-lieu' },
    { ten: 'Nhiệm vụ hiện trường', bieuTuong: 'bieu-tuong-luoi', duongDan: 'index3.html' },
    { ten: 'Lịch sử xử lý', bieuTuong: 'bieu-tuong-nguoi' }
  ],
  'Điều phối': [
    { ten: 'Bảng điều khiển khu vực', bieuTuong: 'bieu-tuong-ban-do' },
    { ten: 'Bảng phân công', bieuTuong: 'bieu-tuong-tai-lieu' },
    { ten: 'Theo dõi SLA', bieuTuong: 'bieu-tuong-luoi' },
    { ten: 'Báo cáo', bieuTuong: 'bieu-tuong-nguoi' }
  ],
  'Quản trị': [
    { ten: 'Loại sự cố', bieuTuong: 'bieu-tuong-ban-do', duongDan: 'index1.html' },
    { ten: 'Khu vực', bieuTuong: 'bieu-tuong-tai-lieu', duongDan: 'index1.html' },
    { ten: 'Người dùng', bieuTuong: 'bieu-tuong-luoi', duongDan: 'index2.html' },
    { ten: 'Cấu hình hệ thống', bieuTuong: 'bieu-tuong-nguoi', duongDan: 'index1.html' },
    { ten: 'Nhật ký hoạt động', bieuTuong: 'bieu-tuong-luoi', duongDan: 'index1.html' }
  ]
};

function veMenuDieuHuong(vaiTro) {
  const menu = layPhanTu('menuDieuHuong');
  const cacMuc = mucDieuHuongTheoVaiTro[vaiTro];
  if (!menu || !cacMuc) return;

  menu.replaceChildren();
  const tieuDe = document.createElement('p');
  tieuDe.className = 'tieu-de-nhom';
  tieuDe.textContent = 'Điều hướng';
  menu.appendChild(tieuDe);

  cacMuc.forEach((muc, chiSo) => {
    const lienKet = document.createElement('a');
    lienKet.className = 'muc-menu';
    lienKet.href = muc.duongDan || '#';
    lienKet.setAttribute('aria-current', 'false');
    if (muc.duongDan) {
      lienKet.target = 'khungTrangCon';
    } else {
      lienKet.dataset.noPage = 'true';
    }
    if ((vaiTro === 'Cư dân' && chiSo === 1) || (vaiTro !== 'Cư dân' && chiSo === 0)) {
      lienKet.classList.add('dang-chon');
      lienKet.setAttribute('aria-current', 'page');
    }

    const bieuTuong = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const suDung = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    suDung.setAttribute('href', '#' + muc.bieuTuong);
    bieuTuong.appendChild(suDung);
    lienKet.appendChild(bieuTuong);

    const nhan = document.createElement('span');
    nhan.textContent = muc.ten;
    lienKet.appendChild(nhan);

    if (muc.soLuong) {
      const huyHieuMenu = document.createElement('span');
      huyHieuMenu.className = 'huy-hieu-menu';
      huyHieuMenu.textContent = muc.soLuong;
      lienKet.appendChild(huyHieuMenu);
    }

    menu.appendChild(lienKet);
  });
}

function capNhatKhungTrangCon(duongDan) {
  const khungTrangCon = layPhanTu('khungTrangCon');
  if (khungTrangCon && duongDan) {
    khungTrangCon.src = duongDan;
  }
}

// Chuyển Role
const chonVaiTroEl = layPhanTu('chonVaiTro');
if (chonVaiTroEl) {
  chonVaiTroEl.addEventListener('change', (suKien) => {
    const vaiTroMoi = suKien.target.value;
    document.querySelectorAll('.vai-tro-hien-tai').forEach(el => el.textContent = vaiTroMoi);
    veMenuDieuHuong(vaiTroMoi);
    const mucMacDinh = document.querySelector('.muc-menu.dang-chon');
    if (mucMacDinh) {
      const link = mucMacDinh.href;
      if (link && link !== window.location.href) capNhatKhungTrangCon(link);
      const nhan = mucMacDinh.querySelector('span');
      if (tenTrangHienTaiEl) tenTrangHienTaiEl.textContent = nhan ? nhan.textContent : mucMacDinh.textContent.trim();
    }
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
const tenTrangHienTaiEl = layPhanTu('tenTrangHienTai');

document.addEventListener('click', (suKien) => {
  const mucDuocChon = suKien.target.closest('.muc-menu');
  if (!mucDuocChon) return;

  if (mucDuocChon.dataset.noPage === 'true') suKien.preventDefault();
  document.querySelectorAll('.muc-menu').forEach((muc) => {
    muc.classList.remove('dang-chon');
    muc.setAttribute('aria-current', 'false');
  });
  mucDuocChon.classList.add('dang-chon');
  mucDuocChon.setAttribute('aria-current', 'page');

  if (mucDuocChon.href && mucDuocChon.href !== window.location.href) {
    const duongDan = mucDuocChon.getAttribute('href');
    capNhatKhungTrangCon(duongDan);
  }

  if (tenTrangHienTaiEl) {
    const nhan = mucDuocChon.querySelector('span');
    tenTrangHienTaiEl.textContent = nhan ? nhan.textContent : mucDuocChon.textContent.trim();
  }

  if (window.innerWidth <= 900 && thanhBen) {
    thanhBen.classList.remove('mo');
  }
});

document.querySelectorAll('.muc-menu').forEach((muc) => {
  muc.setAttribute('aria-current', muc.classList.contains('dang-chon') ? 'page' : 'false');
});

if (chonVaiTroEl) {
  veMenuDieuHuong(chonVaiTroEl.value);
  const mucMacDinh = document.querySelector('.muc-menu.dang-chon');
  if (mucMacDinh) {
    capNhatKhungTrangCon(mucMacDinh.getAttribute('href'));
    const nhan = mucMacDinh.querySelector('span');
    if (tenTrangHienTaiEl) {
      tenTrangHienTaiEl.textContent = nhan ? nhan.textContent : mucMacDinh.textContent.trim();
    }
  }
  document.querySelectorAll('.vai-tro-hien-tai').forEach((el) => {
    el.textContent = chonVaiTroEl.value;
  });
}

veThongBao();
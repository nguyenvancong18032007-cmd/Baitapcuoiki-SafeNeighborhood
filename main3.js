(() => {
'use strict';

const nhiemVuBanDau = [
  { ma: 'IS-2041', ten: 'Đèn đường không hoạt động', khuVuc: 'P. Bến Nghé, Quận 1', thoiHan: 'Hôm nay, 17:30', trangThai: 'pending', tienDo: 0 },
  { ma: 'IS-2039', ten: 'Ổ gà lớn trên mặt đường', khuVuc: 'P. Đa Kao, Quận 1', thoiHan: 'Ngày mai, 16:00', trangThai: 'pending', tienDo: 0 },
  { ma: 'IS-2037', ten: 'Biển báo giao thông bị nghiêng', khuVuc: 'P. Bến Thành, Quận 1', thoiHan: 'Ngày mai, 18:00', trangThai: 'progress', tienDo: 60 },
  { ma: 'IS-2036', ten: 'Cây đổ chắn lối đi bộ', khuVuc: 'P. Nguyễn Thái Bình', thoiHan: 'Hôm nay, 17:30', trangThai: 'progress', tienDo: 60 },
  { ma: 'IS-2035', ten: 'Đèn tín hiệu giao thông bị lỗi', khuVuc: 'P. Cầu Ông Lãnh', thoiHan: 'Ngày mai, 16:00', trangThai: 'progress', tienDo: 60 },
  { ma: 'IS-2034', ten: 'Cây xanh cần được cắt tỉa', khuVuc: 'P. Đa Kao, Quận 1', thoiHan: 'Hôm nay, 17:30', trangThai: 'done', tienDo: 100 },
  { ma: 'IS-2028', ten: 'Nắp cống bị hư hỏng', khuVuc: 'P. Tân Định, Quận 1', thoiHan: 'Ngày mai, 16:00', trangThai: 'done', tienDo: 100 },
  { ma: 'IS-2025', ten: 'Vỉa hè bị nứt, lún', khuVuc: 'P. Nguyễn Cư Trinh', thoiHan: 'Hôm nay, 15:00', trangThai: 'done', tienDo: 100 },
  { ma: 'IS-2019', ten: 'Rác thải chưa được thu gom', khuVuc: 'P. Tân Định, Quận 1', thoiHan: 'Ngày mai, 12:00', trangThai: 'done', tienDo: 100 }
];

const tenTrangThai = {
  pending: 'Chưa bắt đầu',
  progress: 'Đang thực hiện',
  done: 'Hoàn thành'
};
const nhiemVu = nhiemVuBanDau.map((muc) => ({ ...muc }));
const lay = (id) => document.getElementById(id);
const bangKanban = lay('bangKanban');
const khungDanhSach = lay('khungDanhSach');
const hopChiTiet = lay('hopChiTiet');
const hopTaoNhiemVu = lay('hopTaoNhiemVu');
let toastTimer;

function taoBieuTuong(loai) {
  const path = loai === 'viTri'
    ? '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>'
    : '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/>';
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
}

function hienToast(noiDung) {
  const khung = lay('khungToast');
  khung.replaceChildren();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'status');
  toast.append(document.createTextNode(`✓  ${noiDung}`));
  const nutDong = document.createElement('button');
  nutDong.type = 'button';
  nutDong.setAttribute('aria-label', 'Đóng thông báo');
  nutDong.textContent = '×';
  nutDong.addEventListener('click', () => toast.remove());
  toast.appendChild(nutDong);
  khung.appendChild(toast);
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.remove(), 3500);
}

function taoNutHanhDong(muc, cheDo) {
  const nut = document.createElement('button');
  nut.type = 'button';
  nut.className = `nut ${cheDo === 'done' ? 'nut-vien' : 'nut-chinh'}`;
  nut.dataset.action = cheDo === 'pending' ? 'start' : cheDo === 'progress' ? 'complete' : 'view';
  nut.dataset.id = muc.ma;
  nut.textContent = cheDo === 'pending' ? 'Bắt đầu' : cheDo === 'progress' ? 'Hoàn thành' : 'Xem';
  return nut;
}

function taoThe(muc) {
  const the = document.createElement('article');
  the.className = 'the-nhiem-vu';
  const anh = document.createElement('div');
  anh.className = 'anh-nhiem-vu';
  anh.setAttribute('aria-hidden', 'true');
  anh.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h3l1.4-2h7.2L17 7h3v12H4z"/><circle cx="12" cy="13" r="3.5"/></svg>';
  const ma = document.createElement('span');
  ma.className = `ma-nhiem-vu ${muc.trangThai}`;
  ma.textContent = `#${muc.ma}`;
  anh.appendChild(ma);
  const trangThai = document.createElement('span');
  trangThai.className = `huy-hieu-trang-thai ${muc.trangThai}`;
  trangThai.textContent = tenTrangThai[muc.trangThai];
  anh.appendChild(trangThai);

  const ten = document.createElement('h3');
  ten.className = 'ten-nhiem-vu';
  ten.textContent = muc.ten;
  const viTri = document.createElement('div');
  viTri.className = 'dong-thong-tin';
  viTri.innerHTML = taoBieuTuong('viTri');
  viTri.append(document.createTextNode(muc.khuVuc));
  const deadline = document.createElement('div');
  deadline.className = 'dong-thong-tin thoi-han';
  deadline.innerHTML = taoBieuTuong('thoiGian');
  deadline.append(document.createTextNode(muc.thoiHan));
  const phanTram = document.createElement('span');
  phanTram.className = 'phan-tram';
  phanTram.textContent = `${muc.tienDo}%`;
  deadline.appendChild(phanTram);
  const thanh = document.createElement('div');
  thanh.className = 'thanh-tien-do';
  const tienDo = document.createElement('span');
  tienDo.style.width = `${muc.tienDo}%`;
  thanh.appendChild(tienDo);
  const chan = document.createElement('footer');
  chan.className = 'chan-the';
  const avatar = document.createElement('span');
  avatar.className = 'avatar';
  avatar.textContent = 'NT';
  chan.append(avatar, taoNutHanhDong(muc, muc.trangThai));
  the.append(anh, ten, viTri, deadline, thanh, chan);
  return the;
}

function veKanban() {
  bangKanban.replaceChildren();
  const danhSach = document.createElement('div');
  danhSach.className = 'danh-sach-the';
  danhSach.append(...nhiemVu.map(taoThe));
  bangKanban.appendChild(danhSach);
}

function taoO(noiDung, lop) {
  const o = document.createElement('td');
  if (lop) o.className = lop;
  o.textContent = noiDung;
  return o;
}

function veDanhSach() {
  const tbody = lay('danhSachNhiemVu');
  const tuKhoa = lay('timNhiemVu').value.trim().toLocaleLowerCase('vi');
  const trangThaiLoc = lay('locTrangThai').value;
  const ketQua = nhiemVu.filter((muc) => {
    const noiDung = `${muc.ma} ${muc.ten} ${muc.khuVuc}`.toLocaleLowerCase('vi');
    return noiDung.includes(tuKhoa) && (!trangThaiLoc || muc.trangThai === trangThaiLoc);
  });
  tbody.replaceChildren();
  ketQua.forEach((muc) => {
    const hang = document.createElement('tr');
    hang.append(
      taoO(`#${muc.ma}`, 'ma-bang'),
      taoO(muc.ten),
      taoO(muc.khuVuc),
      taoO(muc.thoiHan)
    );
    const oTrangThai = document.createElement('td');
    const huyHieu = document.createElement('span');
    huyHieu.className = `huy-hieu-trang-thai ${muc.trangThai}`;
    huyHieu.textContent = tenTrangThai[muc.trangThai];
    oTrangThai.appendChild(huyHieu);
    const oTienDo = document.createElement('td');
    const tienDo = document.createElement('div');
    tienDo.className = 'tien-do-bang';
    const thanh = document.createElement('div');
    thanh.className = 'thanh-tien-do';
    const phan = document.createElement('span');
    phan.style.width = `${muc.tienDo}%`;
    thanh.appendChild(phan);
    const phanTram = document.createElement('span');
    phanTram.textContent = `${muc.tienDo}%`;
    tienDo.append(thanh, phanTram);
    oTienDo.appendChild(tienDo);
    const oHanhDong = document.createElement('td');
    oHanhDong.appendChild(taoNutHanhDong(muc, muc.trangThai));
    hang.append(oTrangThai, oTienDo, oHanhDong);
    tbody.appendChild(hang);
  });
  lay('khongCoKetQua').hidden = ketQua.length > 0;
}

function capNhatGiaoDien() {
  veKanban();
  veDanhSach();
}

function moChiTiet(muc) {
  lay('chiTietTieuDe').textContent = muc.ten;
  lay('chiTietMa').textContent = `#${muc.ma} · ${tenTrangThai[muc.trangThai]}`;
  lay('chiTietKhuVuc').textContent = muc.khuVuc;
  lay('chiTietThoiHan').textContent = muc.thoiHan;
  lay('chiTietTienDo').textContent = `${muc.tienDo}%`;
  lay('chiTietThanhTienDo').style.width = `${muc.tienDo}%`;
  const nut = lay('chiTietHanhDong');
  nut.dataset.id = muc.ma;
  nut.dataset.action = muc.trangThai === 'pending' ? 'start' : muc.trangThai === 'progress' ? 'complete' : 'view';
  nut.textContent = muc.trangThai === 'pending' ? 'Bắt đầu nhiệm vụ' : muc.trangThai === 'progress' ? 'Hoàn thành nhiệm vụ' : 'Đã hoàn thành';
  nut.hidden = muc.trangThai === 'done';
  hopChiTiet.showModal();
}

for (let i = nhiemVu.length - 1; i > 0; i -= 1) {
  const j = Math.floor(Math.random() * (i + 1));
  [nhiemVu[i], nhiemVu[j]] = [nhiemVu[j], nhiemVu[i]];
}

function xuLyHanhDong(suKien) {
  const nut = suKien.target.closest('button[data-action]');
  if (!nut) return;
  const muc = nhiemVu.find((item) => item.ma === nut.dataset.id);
  if (!muc) return;
  if (nut.dataset.action === 'view') {
    moChiTiet(muc);
    return;
  }
  if (nut.dataset.action === 'start') {
    muc.trangThai = 'progress';
    muc.tienDo = 60;
    hienToast(`Nhiệm vụ #${muc.ma} đã được bắt đầu`);
  } else if (nut.dataset.action === 'complete') {
    muc.trangThai = 'done';
    muc.tienDo = 100;
    hienToast(`Nhiệm vụ #${muc.ma} đã được hoàn thành`);
  }
  if (hopChiTiet.open) hopChiTiet.close();
  capNhatGiaoDien();
}

lay('xemKanban').addEventListener('click', () => {
  bangKanban.hidden = false;
  khungDanhSach.hidden = true;
  lay('xemKanban').classList.add('dang-chon');
  lay('xemKanban').setAttribute('aria-pressed', 'true');
  lay('xemDanhSach').classList.remove('dang-chon');
  lay('xemDanhSach').setAttribute('aria-pressed', 'false');
});
lay('xemDanhSach').addEventListener('click', () => {
  bangKanban.hidden = true;
  khungDanhSach.hidden = false;
  lay('xemDanhSach').classList.add('dang-chon');
  lay('xemDanhSach').setAttribute('aria-pressed', 'true');
  lay('xemKanban').classList.remove('dang-chon');
  lay('xemKanban').setAttribute('aria-pressed', 'false');
  veDanhSach();
});
bangKanban.addEventListener('click', xuLyHanhDong);
lay('danhSachNhiemVu').addEventListener('click', xuLyHanhDong);
lay('chiTietHanhDong').addEventListener('click', xuLyHanhDong);
lay('timNhiemVu').addEventListener('input', veDanhSach);
lay('locTrangThai').addEventListener('change', veDanhSach);
hopChiTiet.addEventListener('click', (suKien) => {
  if (suKien.target === hopChiTiet) hopChiTiet.close();
});

function moHopTaoNhiemVu() {
  lay('formTaoNhiemVu').reset();
  hopTaoNhiemVu.showModal();
  lay('tenNhiemVuMoi').focus();
}
lay('nutTaoNhiemVu').addEventListener('click', moHopTaoNhiemVu);
lay('nutTaoNhiemVuTrigger').addEventListener('click', moHopTaoNhiemVu);
lay('nutDongTaoNhiemVu').addEventListener('click', () => hopTaoNhiemVu.close());
lay('nutHuyTaoNhiemVu').addEventListener('click', () => hopTaoNhiemVu.close());
lay('formTaoNhiemVu').addEventListener('submit', (suKien) => {
  suKien.preventDefault();
  const soMaLonNhat = nhiemVu.reduce((lonNhat, muc) => {
    const soMa = Number(muc.ma.replace(/\D/g, ''));
    return Math.max(lonNhat, soMa);
  }, 0);
  const formData = new FormData(suKien.currentTarget);
  const mucMoi = {
    ma: `IS-${soMaLonNhat + 1}`,
    ten: String(formData.get('ten')).trim(),
    khuVuc: String(formData.get('khuVuc')).trim(),
    thoiHan: String(formData.get('thoiHan')).trim(),
    trangThai: 'pending',
    tienDo: 0
  };
  nhiemVu.splice(Math.floor(Math.random() * (nhiemVu.length + 1)), 0, mucMoi);
  hopTaoNhiemVu.close();
  capNhatGiaoDien();
  hienToast(`Đã tạo nhiệm vụ #${mucMoi.ma}`);
});

veKanban();
})();
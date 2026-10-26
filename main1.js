'use strict';

const soDongMoiTrang = 4;
const cacTrangThai = ['Đang xử lý', 'Đã phân công', 'Đang chờ', 'Hoàn thành'];

const suCo = [
  { ma: 'IS-2041', noiDung: 'Đèn đường không hoạt động', thoiGian: '12 phút trước', khuVuc: 'P. Bến Nghé, Quận 1', trangThai: 'Đang xử lý', sla: '6 giờ', tienDo: 72 },
  { ma: 'IS-2039', noiDung: 'Ổ gà lớn trên mặt đường', thoiGian: '48 phút trước', khuVuc: 'P. Đa Kao, Quận 1', trangThai: 'Đã phân công', sla: '1 giờ 20 phút', tienDo: 22 },
  { ma: 'IS-2036', noiDung: 'Cây đổ chắn lối đi bộ', thoiGian: '2 giờ trước', khuVuc: 'P. Nguyễn Thái Bình', trangThai: 'Đang chờ', sla: '8 giờ', tienDo: 55 },
  { ma: 'IS-2028', noiDung: 'Nắp cống bị hư hỏng', thoiGian: 'Hôm qua', khuVuc: 'P. Tân Định, Quận 1', trangThai: 'Hoàn thành', sla: '9 giờ', tienDo: 45 },
  { ma: 'IS-2025', noiDung: 'Biển báo giao thông bị nghiêng', thoiGian: 'Hôm qua', khuVuc: 'P. Bến Thành, Quận 1', trangThai: 'Đang xử lý', sla: '5 giờ', tienDo: 62 },
  { ma: 'IS-2022', noiDung: 'Đèn tín hiệu giao thông bị lỗi', thoiGian: 'Hôm qua', khuVuc: 'P. Cầu Ông Lãnh', trangThai: 'Đã phân công', sla: '3 giờ', tienDo: 31 },
  { ma: 'IS-2019', noiDung: 'Vỉa hè bị nứt, lún', thoiGian: '2 ngày trước', khuVuc: 'P. Nguyễn Cư Trinh', trangThai: 'Đang chờ', sla: '7 giờ', tienDo: 40 },
  { ma: 'IS-2015', noiDung: 'Cây xanh cần được cắt tỉa', thoiGian: '2 ngày trước', khuVuc: 'P. Đa Kao, Quận 1', trangThai: 'Hoàn thành', sla: '10 giờ', tienDo: 82 },
  { ma: 'IS-2012', noiDung: 'Rác thải chưa được thu gom', thoiGian: '3 ngày trước', khuVuc: 'P. Tân Định, Quận 1', trangThai: 'Đang xử lý', sla: '4 giờ', tienDo: 52 },
  { ma: 'IS-2008', noiDung: 'Ống nước rò rỉ trên vỉa hè', thoiGian: '3 ngày trước', khuVuc: 'P. Bến Nghé, Quận 1', trangThai: 'Đã phân công', sla: '2 giờ', tienDo: 28 },
  { ma: 'IS-2004', noiDung: 'Nắp hố ga bị mất', thoiGian: '4 ngày trước', khuVuc: 'P. Cầu Kho, Quận 1', trangThai: 'Đang chờ', sla: '6 giờ', tienDo: 35 },
  { ma: 'IS-1998', noiDung: 'Vạch kẻ đường bị mờ', thoiGian: '4 ngày trước', khuVuc: 'P. Bến Thành, Quận 1', trangThai: 'Hoàn thành', sla: '8 giờ', tienDo: 88 },
  { ma: 'IS-1994', noiDung: 'Cột điện có dấu hiệu hư hỏng', thoiGian: '5 ngày trước', khuVuc: 'P. Nguyễn Thái Bình', trangThai: 'Đang xử lý', sla: '5 giờ', tienDo: 48 },
  { ma: 'IS-1990', noiDung: 'Đọng nước sau mưa lớn', thoiGian: '5 ngày trước', khuVuc: 'P. Đa Kao, Quận 1', trangThai: 'Đã phân công', sla: '3 giờ', tienDo: 25 },
  { ma: 'IS-1985', noiDung: 'Tấm chắn công trình bị đổ', thoiGian: '6 ngày trước', khuVuc: 'P. Tân Định, Quận 1', trangThai: 'Đang chờ', sla: '7 giờ', tienDo: 38 },
  { ma: 'IS-1981', noiDung: 'Đèn chiếu sáng công viên bị hỏng', thoiGian: '6 ngày trước', khuVuc: 'P. Bến Nghé, Quận 1', trangThai: 'Hoàn thành', sla: '9 giờ', tienDo: 91 },
  { ma: 'IS-1978', noiDung: 'Cành cây gãy trên lòng đường', thoiGian: '1 tuần trước', khuVuc: 'P. Cầu Ông Lãnh', trangThai: 'Đang xử lý', sla: '4 giờ', tienDo: 60 },
  { ma: 'IS-1972', noiDung: 'Bảng tên đường bị hư hỏng', thoiGian: '1 tuần trước', khuVuc: 'P. Nguyễn Cư Trinh', trangThai: 'Đã phân công', sla: '6 giờ', tienDo: 33 },
  { ma: 'IS-1969', noiDung: 'Rãnh thoát nước bị tắc', thoiGian: '1 tuần trước', khuVuc: 'P. Bến Thành, Quận 1', trangThai: 'Đang chờ', sla: '5 giờ', tienDo: 41 },
  { ma: 'IS-1963', noiDung: 'Gạch lát vỉa hè bị bong', thoiGian: '8 ngày trước', khuVuc: 'P. Đa Kao, Quận 1', trangThai: 'Hoàn thành', sla: '8 giờ', tienDo: 85 },
  { ma: 'IS-1959', noiDung: 'Đèn tín hiệu người đi bộ không sáng', thoiGian: '9 ngày trước', khuVuc: 'P. Bến Nghé, Quận 1', trangThai: 'Đang xử lý', sla: '3 giờ', tienDo: 57 },
  { ma: 'IS-1954', noiDung: 'Hàng rào công cộng bị hư', thoiGian: '9 ngày trước', khuVuc: 'P. Cầu Kho, Quận 1', trangThai: 'Đã phân công', sla: '7 giờ', tienDo: 30 },
  { ma: 'IS-1948', noiDung: 'Cống thoát nước phát sinh mùi', thoiGian: '10 ngày trước', khuVuc: 'P. Tân Định, Quận 1', trangThai: 'Đang chờ', sla: '6 giờ', tienDo: 36 },
  { ma: 'IS-1942', noiDung: 'Mặt đường xuống cấp', thoiGian: '11 ngày trước', khuVuc: 'P. Nguyễn Thái Bình', trangThai: 'Hoàn thành', sla: '9 giờ', tienDo: 94 }
];

const daChon = new Set();
let trangHienTai = 1;
let boDemMoi = 2042;
let toastTimer;

const lay = (id) => document.getElementById(id);
const tbody = lay('danhSachSuCo');
const checkboxTatCa = lay('chonTatCa');

function taoLopTrangThai(trangThai) {
  return {
    'Đang xử lý': 'dang-xu-ly',
    'Đã phân công': 'da-phan-cong',
    'Đang chờ': 'dang-cho',
    'Hoàn thành': 'hoan-thanh'
  }[trangThai] || 'dang-cho';
}

function hienToast(noiDung, kieu = '') {
  const khung = lay('khungToast');
  khung.replaceChildren();

  const toast = document.createElement('div');
  toast.className = `toast ${kieu ? `toast-${kieu}` : ''}`;
  toast.setAttribute('role', 'status');
  toast.textContent = `✓  ${noiDung}`;
  khung.appendChild(toast);

  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.remove(), 3500);
}

function taoO(noiDung, lop) {
  const o = document.createElement('td');
  if (lop) o.className = lop;
  o.textContent = noiDung;
  return o;
}

function veBang() {
  const soTrang = Math.max(1, Math.ceil(suCo.length / soDongMoiTrang));
  trangHienTai = Math.min(trangHienTai, soTrang);

  const batDau = (trangHienTai - 1) * soDongMoiTrang;
  const mucHienThi = suCo.slice(batDau, batDau + soDongMoiTrang);
  tbody.replaceChildren();

  mucHienThi.forEach((muc) => {
    const hang = document.createElement('tr');

    const oChon = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'chon-muc';
    checkbox.checked = daChon.has(muc.ma);
    checkbox.dataset.ma = muc.ma;
    checkbox.setAttribute('aria-label', `Chọn sự cố ${muc.ma}`);
    oChon.appendChild(checkbox);
    hang.appendChild(oChon);

    const ma = document.createElement('td');
    const lienKet = document.createElement('a');
    lienKet.className = 'ma-su-co';
    lienKet.href = `#${muc.ma}`;
    lienKet.textContent = `#${muc.ma}`;
    lienKet.addEventListener('click', (suKien) => suKien.preventDefault());
    ma.appendChild(lienKet);
    hang.appendChild(ma);

    const oNoiDung = document.createElement('td');
    const noiDung = document.createElement('strong');
    noiDung.className = 'noi-dung-su-co';
    noiDung.textContent = muc.noiDung;
    const thoiGian = document.createElement('small');
    thoiGian.className = 'thoi-gian';
    thoiGian.textContent = muc.thoiGian;
    oNoiDung.append(noiDung, thoiGian);
    hang.appendChild(oNoiDung);

    hang.appendChild(taoO(muc.khuVuc));

    const oTrangThai = document.createElement('td');
    const huyHieu = document.createElement('span');
    huyHieu.className = `trang-thai ${taoLopTrangThai(muc.trangThai)}`;
    huyHieu.textContent = muc.trangThai;
    oTrangThai.appendChild(huyHieu);
    hang.appendChild(oTrangThai);

    const oSla = document.createElement('td');
    const slaText = document.createElement('span');
    slaText.className = 'sla-text';
    slaText.textContent = muc.sla;
    const thanh = document.createElement('div');
    thanh.className = 'thanh-sla';
    const tienDo = document.createElement('span');
    tienDo.style.width = `${muc.tienDo}%`;
    thanh.appendChild(tienDo);
    oSla.append(slaText, thanh);
    hang.appendChild(oSla);

    const oThaoTac = document.createElement('td');
    const nutThaoTac = document.createElement('button');
    nutThaoTac.type = 'button';
    nutThaoTac.className = 'nut-hang';
    nutThaoTac.textContent = '•••';
    nutThaoTac.dataset.thaoTacMa = muc.ma;
    nutThaoTac.setAttribute('aria-label', `Cập nhật trạng thái ${muc.ma}`);
    oThaoTac.appendChild(nutThaoTac);
    hang.appendChild(oThaoTac);

    tbody.appendChild(hang);
  });

  const soMucChonTrenTrang = mucHienThi.filter((muc) => daChon.has(muc.ma)).length;
  checkboxTatCa.checked = mucHienThi.length > 0 && soMucChonTrenTrang === mucHienThi.length;
  checkboxTatCa.indeterminate = soMucChonTrenTrang > 0 && soMucChonTrenTrang < mucHienThi.length;

  lay('thanhChon').hidden = daChon.size === 0;
  lay('soMucDaChon').textContent = `${daChon.size} mục đã chọn`;

  const soBatDau = suCo.length ? batDau + 1 : 0;
  const soKetThuc = Math.min(batDau + soDongMoiTrang, suCo.length);
  lay('thongTinTrang').textContent = `Hiển thị ${soBatDau}–${soKetThuc} trong ${suCo.length} kết quả`;

  vePhanTrang(soTrang);
}

function vePhanTrang(soTrang) {
  const phanTrang = lay('phanTrang');
  phanTrang.replaceChildren();

  const taoNutTrang = (nhan, trang, tenNut, voHieu = false) => {
    const nut = document.createElement('button');
    nut.type = 'button';
    nut.className = `nut-trang ${trang === trangHienTai ? 'dang-chon' : ''}`;
    nut.textContent = nhan;
    nut.setAttribute('aria-label', tenNut);
    if (trang === trangHienTai && nhan !== '‹' && nhan !== '›') {
      nut.setAttribute('aria-current', 'page');
    }
    nut.disabled = voHieu;
    nut.addEventListener('click', () => {
      trangHienTai = trang;
      veBang();
    });
    phanTrang.appendChild(nut);
  };

  taoNutTrang('‹', Math.max(1, trangHienTai - 1), 'Trang trước', trangHienTai === 1);
  for (let trang = 1; trang <= soTrang; trang += 1) {
    taoNutTrang(String(trang), trang, `Trang ${trang}`);
  }
  taoNutTrang('›', Math.min(soTrang, trangHienTai + 1), 'Trang sau', trangHienTai === soTrang);
}

checkboxTatCa.addEventListener('change', () => {
  const batDau = (trangHienTai - 1) * soDongMoiTrang;
  const mucHienThi = suCo.slice(batDau, batDau + soDongMoiTrang);

  mucHienThi.forEach((muc) => {
    if (checkboxTatCa.checked) daChon.add(muc.ma);
    else daChon.delete(muc.ma);
  });
  veBang();
});

tbody.addEventListener('change', (suKien) => {
  const checkbox = suKien.target.closest('.chon-muc');
  if (!checkbox) return;

  if (checkbox.checked) daChon.add(checkbox.dataset.ma);
  else daChon.delete(checkbox.dataset.ma);
  veBang();
});

tbody.addEventListener('click', (suKien) => {
  const nut = suKien.target.closest('[data-thao-tac-ma]');
  if (!nut) return;

  const muc = suCo.find((item) => item.ma === nut.dataset.thaoTacMa);
  if (!muc) return;

  const viTri = cacTrangThai.indexOf(muc.trangThai);
  muc.trangThai = cacTrangThai[(viTri + 1) % cacTrangThai.length];
  veBang();
  hienToast(`Đã cập nhật trạng thái #${muc.ma}`);
});

lay('nutTiepNhan').addEventListener('click', () => {
  if (!daChon.size) return;

  suCo.forEach((muc) => {
    if (daChon.has(muc.ma)) muc.trangThai = 'Đã phân công';
  });
  const soMuc = daChon.size;
  daChon.clear();
  veBang();
  hienToast(`Đã tiếp nhận ${soMuc} mục`);
});

lay('nutBoChon').addEventListener('click', () => {
  daChon.clear();
  veBang();
});

const hopThemMoi = lay('hopThemMoi');

lay('nutThemMoi').addEventListener('click', () => hopThemMoi.showModal());
lay('nutDongHop').addEventListener('click', () => hopThemMoi.close());
lay('nutHuyThem').addEventListener('click', () => hopThemMoi.close());

lay('formThemMoi').addEventListener('submit', (suKien) => {
  suKien.preventDefault();

  const form = suKien.currentTarget;
  const duLieu = new FormData(form);
  const ma = `IS-${boDemMoi++}`;

  suCo.unshift({
    ma,
    noiDung: String(duLieu.get('noiDung')).trim(),
    thoiGian: 'Vừa xong',
    khuVuc: String(duLieu.get('khuVuc')).trim(),
    trangThai: String(duLieu.get('trangThai')),
    sla: '8 giờ',
    tienDo: 15
  });

  trangHienTai = 1;
  daChon.clear();
  form.reset();
  hopThemMoi.close();
  veBang();
  hienToast(`Đã tạo bản ghi mới #${ma}`);
});

function capNhatTrangThaiAi(thongBao, kieu = '') {
  const trangThai = lay('trangThaiAi');
  trangThai.textContent = thongBao;
  trangThai.className = `trang-thai-ai ${kieu ? `kieu-${kieu}` : ''}`;
  trangThai.hidden = false;
}

lay('nutChapNhan').addEventListener('click', () => {
  capNhatTrangThaiAi('✓ Đã áp dụng gợi ý AI', 'xanh');
  hienToast('Đã áp dụng đề xuất của Safe AI', 'tim');
});

lay('nutSua').addEventListener('click', () => {
  capNhatTrangThaiAi('✓ Đã chuyển sang chỉnh sửa thủ công');
  hienToast('Bạn có thể chỉnh sửa kết quả thủ công', 'tim');
});

lay('nutTuChoi').addEventListener('click', () => {
  capNhatTrangThaiAi('✓ Đã bỏ qua gợi ý này', 'vang');
  hienToast('Đã từ chối đề xuất AI', 'vang');
});

lay('nutTaoLai').addEventListener('click', () => {
  capNhatTrangThaiAi('✦ Safe AI đang phân tích lại dữ liệu');
  hienToast('Safe AI đang phân tích lại dữ liệu', 'tim');
});

veBang();
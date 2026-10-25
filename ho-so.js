'use strict';

const danhSachTrangSuCo = [
  [
    { ma: '#IS-2041', noiDung: 'Đèn đường không hoạt động', thoiGian: '12 phút trước', khuVuc: 'P. Bến Nghé, Quận 1', trangThai: 'Đang xử lý', kieuTrangThai: 'tim', sla: '6 giờ', phanTramSla: 60, uuTien: 'cao', ruiRo: 'Nguy cơ mất an toàn giao thông vào ban đêm.' },
    { ma: '#IS-2039', noiDung: 'Ổ gà lớn trên mặt đường', thoiGian: '48 phút trước', khuVuc: 'P. Đa Kao, Quận 1', trangThai: 'Đã phân công', kieuTrangThai: 'xanh', sla: '1 giờ 20 phút', phanTramSla: 25, uuTien: 'cao', ruiRo: 'Nguy cơ tai nạn do phương tiện tránh ổ gà.' },
    { ma: '#IS-2036', noiDung: 'Cây đổ chắn lối đi bộ', thoiGian: '2 giờ trước', khuVuc: 'P. Nguyễn Thái Bình', trangThai: 'Đang chờ', kieuTrangThai: 'vang', sla: '8 giờ', phanTramSla: 80, uuTien: 'trung-binh', ruiRo: 'Lối đi bộ bị thu hẹp, cần kiểm tra hiện trường.' },
    { ma: '#IS-2028', noiDung: 'Nắp cống bị hư hỏng', thoiGian: 'Hôm qua', khuVuc: 'P. Tân Định, Quận 1', trangThai: 'Hoàn thành', kieuTrangThai: 'xanh-la', sla: '9 giờ', phanTramSla: 100, uuTien: 'thap', ruiRo: 'Đã khắc phục, theo dõi phản hồi sau xử lý.' }
  ],
  [
    { ma: '#IS-2025', noiDung: 'Đèn tín hiệu giao thông chập chờn', thoiGian: '3 giờ trước', khuVuc: 'P. Cầu Ông Lãnh, Quận 1', trangThai: 'Đang xử lý', kieuTrangThai: 'tim', sla: '2 giờ', phanTramSla: 78, uuTien: 'cao', ruiRo: 'Tín hiệu chập chờn tại nút giao có thể gây va chạm.' },
    { ma: '#IS-2019', noiDung: 'Vỉa hè bong tróc', thoiGian: '5 giờ trước', khuVuc: 'P. Bến Thành, Quận 1', trangThai: 'Đã phân công', kieuTrangThai: 'xanh', sla: '5 giờ', phanTramSla: 45, uuTien: 'trung-binh', ruiRo: 'Bề mặt không bằng phẳng có thể khiến người đi bộ vấp ngã.' },
    { ma: '#IS-2014', noiDung: 'Nước đọng sau mưa', thoiGian: 'Hôm qua', khuVuc: 'P. Nguyễn Cư Trinh, Quận 1', trangThai: 'Đang chờ', kieuTrangThai: 'vang', sla: '7 giờ', phanTramSla: 68, uuTien: 'trung-binh', ruiRo: 'Nước đọng làm giảm tầm nhìn của người tham gia giao thông.' },
    { ma: '#IS-2008', noiDung: 'Thùng rác công cộng bị hỏng', thoiGian: '2 ngày trước', khuVuc: 'P. Cô Giang, Quận 1', trangThai: 'Hoàn thành', kieuTrangThai: 'xanh-la', sla: '8 giờ', phanTramSla: 100, uuTien: 'thap', ruiRo: 'Sự cố đã được xử lý, chưa ghi nhận rủi ro còn tồn tại.' }
  ],
  [
    { ma: '#IS-1998', noiDung: 'Cành cây gãy gần trường học', thoiGian: '20 phút trước', khuVuc: 'P. Đa Kao, Quận 1', trangThai: 'Đang xử lý', kieuTrangThai: 'tim', sla: '3 giờ', phanTramSla: 88, uuTien: 'cao', ruiRo: 'Vị trí gần trường học, cành cây có thể rơi trúng người qua lại.' },
    { ma: '#IS-1987', noiDung: 'Biển báo giao thông bị nghiêng', thoiGian: '6 giờ trước', khuVuc: 'P. Tân Định, Quận 1', trangThai: 'Đã phân công', kieuTrangThai: 'xanh', sla: '4 giờ', phanTramSla: 52, uuTien: 'trung-binh', ruiRo: 'Biển báo khó quan sát, cần kiểm tra hướng và độ chắc chắn.' },
    { ma: '#IS-1974', noiDung: 'Đường đi bộ bị chiếm dụng', thoiGian: 'Hôm qua', khuVuc: 'P. Bến Nghé, Quận 1', trangThai: 'Đang chờ', kieuTrangThai: 'vang', sla: '6 giờ', phanTramSla: 72, uuTien: 'trung-binh', ruiRo: 'Người đi bộ có thể phải đi xuống lòng đường.' },
    { ma: '#IS-1962', noiDung: 'Vòi nước công cộng rò rỉ', thoiGian: '3 ngày trước', khuVuc: 'P. Nguyễn Thái Bình', trangThai: 'Hoàn thành', kieuTrangThai: 'xanh-la', sla: '8 giờ', phanTramSla: 100, uuTien: 'thap', ruiRo: 'Đã sửa chữa, chưa phát hiện nguy cơ tái diễn.' }
  ]
];

const danhSachSuCoHoSo = danhSachTrangSuCo.flat();
const tenMucUuTien = { cao: 'Cao', 'trung-binh': 'Trung bình', thap: 'Thấp' };
const phanTu = (id) => document.getElementById(id);
const danhSachDuocChon = new Set();
let trangHienTai = 1;
let mucUuTienDeXuat = 'cao';

function goiToastTrangMe(noiDung, kieu = 'xanh-la') {
  if (window.parent && typeof window.parent.hienToast === 'function') {
    window.parent.hienToast(noiDung, kieu);
  } else {
    alert(noiDung);
  }
}

function suCoTrangHienTai() {
  return danhSachTrangSuCo[trangHienTai - 1];
}

function suCoDangChon() {
  return suCoTrangHienTai().find((suCo) => danhSachDuocChon.has(suCo.ma)) || suCoTrangHienTai()[0];
}

function veBangSuCo() {
  const thanBang = phanTu('thanBangSuCo');
  thanBang.innerHTML = suCoTrangHienTai().map((suCo) => `
    <tr class="${danhSachDuocChon.has(suCo.ma) ? 'dong-duoc-chon' : ''}">
      <td><input type="checkbox" class="check-dong" data-ma="${suCo.ma}" aria-label="Chọn sự cố ${suCo.ma}" ${danhSachDuocChon.has(suCo.ma) ? 'checked' : ''}></td>
      <td><a href="#" class="ma-su-co"><strong>${suCo.ma}</strong></a></td>
      <td><div class="khoi-noi-dung"><strong>${suCo.noiDung}</strong><small title="${suCo.keHoach || suCo.thoiGian}">${suCo.keHoach ? 'Đã lưu kế hoạch vận hành' : suCo.thoiGian}</small></div></td>
      <td>${suCo.khuVuc}</td>
      <td><span class="nhan-uu-tien ${suCo.uuTien}">${tenMucUuTien[suCo.uuTien]}</span></td>
      <td><span class="nhan-trang-thai ${suCo.kieuTrangThai}">&bull; ${suCo.trangThai}</span></td>
      <td><div class="thanh-tien-trinh-sla"><small>${suCo.sla}</small><div class="thanh-chua"><div class="thanh-chay" style="width: ${suCo.phanTramSla}%;"></div></div></div></td>
      <td><button type="button" class="nut-nho-ba-cham" title="Thao tác" aria-label="Thao tác với sự cố ${suCo.ma}">&bull;&bull;&bull;</button></td>
    </tr>`).join('');
  capNhatThanhHangLoat();
  capNhatThongTinAI();
}

function capNhatThanhHangLoat() {
  const soLuong = danhSachDuocChon.size;
  phanTu('thanhHangLoat').hidden = soLuong === 0;
  phanTu('txtSoLuongChon').textContent = `${soLuong} mục đã chọn`;
  const checkTatCa = phanTu('checkTatCa');
  checkTatCa.checked = suCoTrangHienTai().every((suCo) => danhSachDuocChon.has(suCo.ma));
  checkTatCa.indeterminate = suCoTrangHienTai().some((suCo) => danhSachDuocChon.has(suCo.ma)) && !checkTatCa.checked;
}

function capNhatThongTinAI() {
  const suCo = suCoDangChon();
  if (!suCo) return;
  mucUuTienDeXuat = suCo.uuTien;
  phanTu('maSuCoAI').textContent = suCo.ma;
  phanTu('duLieuAI').textContent = `${suCo.khuVuc} · ${suCo.trangThai} · SLA ${suCo.sla}`;
  phanTu('lyDoChiTietAI').textContent = `Dựa trên mức ảnh hưởng, trạng thái "${suCo.trangThai}", thời hạn SLA và dữ liệu khu vực của sự cố đang chọn.`;
  phanTu('lyDoRuiRoAI').textContent = suCo.ruiRo;
  phanTu('mucUuTienDeXuat').textContent = tenMucUuTien[mucUuTienDeXuat].toUpperCase();
  phanTu('mucUuTienDeXuat').className = `muc-uu-tien ${mucUuTienDeXuat}`;
  phanTu('doTinCayAI').textContent = `Độ tin cậy ${suCo.phanTramSla >= 80 ? '91' : '87'}%`;
  document.querySelectorAll('input[name="mucUuTienAI"]').forEach((input) => {
    input.checked = input.value === mucUuTienDeXuat;
  });
  phanTu('hanhDongKhongChacChan').hidden = true;
}

function capNhatPhanTrang() {
  document.querySelectorAll('.nut-trang').forEach((nut) => {
    const trang = nut.dataset.trang;
    const laTrangHienTai = trang === String(trangHienTai);
    nut.classList.toggle('dang-chon', laTrangHienTai);
    if (laTrangHienTai) nut.setAttribute('aria-current', 'page');
    else nut.removeAttribute('aria-current');
    if (trang === 'prev') nut.disabled = trangHienTai === 1;
    if (trang === 'next') nut.disabled = trangHienTai === danhSachTrangSuCo.length;
  });
  const batDau = (trangHienTai - 1) * suCoTrangHienTai().length + 1;
  const ketThuc = batDau + suCoTrangHienTai().length - 1;
  phanTu('txtHienThiKetQua').textContent = `Hiển thị ${batDau}–${ketThuc} trong ${danhSachSuCoHoSo.length} kết quả`;
}

function datTrangThaiAI(noiDung, kieu) {
  const trangThai = phanTu('trangThaiAI');
  trangThai.hidden = false;
  trangThai.className = `trang-thai-ai ${kieu}`;
  trangThai.textContent = noiDung;
}

phanTu('thanBangSuCo').addEventListener('change', (suKien) => {
  if (!suKien.target.classList.contains('check-dong')) return;
  if (suKien.target.checked) danhSachDuocChon.add(suKien.target.dataset.ma);
  else danhSachDuocChon.delete(suKien.target.dataset.ma);
  veBangSuCo();
});

phanTu('checkTatCa').addEventListener('change', (suKien) => {
  suCoTrangHienTai().forEach((suCo) => {
    if (suKien.target.checked) danhSachDuocChon.add(suCo.ma);
    else danhSachDuocChon.delete(suCo.ma);
  });
  veBangSuCo();
});

phanTu('nutTiepNhanHangLoat').addEventListener('click', () => {
  const daChon = danhSachSuCoHoSo.filter((suCo) => danhSachDuocChon.has(suCo.ma));
  daChon.forEach((suCo) => {
    suCo.trangThai = 'Đã tiếp nhận';
    suCo.kieuTrangThai = 'xanh';
  });
  goiToastTrangMe(`Đã tiếp nhận ${daChon.length} sự cố được chọn`, 'xanh-la');
  danhSachDuocChon.clear();
  veBangSuCo();
});

phanTu('nutBoChon').addEventListener('click', () => {
  danhSachDuocChon.clear();
  veBangSuCo();
});

phanTu('nutCapNhatTrang').addEventListener('click', () => {
  goiToastTrangMe('Thông tin đã được cập nhật', 'xanh-la');
  veBangSuCo();
});

phanTu('boPhanTrang').addEventListener('click', (suKien) => {
  const nut = suKien.target.closest('.nut-trang');
  if (!nut || nut.disabled) return;
  const trang = nut.dataset.trang;
  if (trang === 'prev') trangHienTai -= 1;
  else if (trang === 'next') trangHienTai += 1;
  else trangHienTai = Number(trang);
  capNhatPhanTrang();
  veBangSuCo();
  goiToastTrangMe(`Đã chuyển sang trang ${trangHienTai}`, 'xanh');
});

phanTu('nutChapNhan').addEventListener('click', () => {
  const suCo = suCoDangChon();
  suCo.uuTien = mucUuTienDeXuat;
  phanTu('chonUuTienAI').hidden = true;
  veBangSuCo();
  datTrangThaiAI(`Đã lưu mức ưu tiên ${tenMucUuTien[suCo.uuTien]} cho ${suCo.ma}`, 'tim');
  goiToastTrangMe(`Đã cập nhật ưu tiên ${tenMucUuTien[suCo.uuTien]} cho ${suCo.ma}`, 'tim');
});

phanTu('nutSua').addEventListener('click', () => {
  phanTu('chonUuTienAI').hidden = false;
  datTrangThaiAI('Chọn một trong ba mức ưu tiên, sau đó lưu thay đổi.', 'tim');
});

phanTu('nutLuuUuTien').addEventListener('click', () => {
  const mucDaChon = document.querySelector('input[name="mucUuTienAI"]:checked');
  if (!mucDaChon) {
    goiToastTrangMe('Vui lòng chọn mức ưu tiên trước khi lưu', 'vang');
    return;
  }
  const suCo = suCoDangChon();
  suCo.uuTien = mucDaChon.value;
  mucUuTienDeXuat = mucDaChon.value;
  phanTu('chonUuTienAI').hidden = true;
  veBangSuCo();
  datTrangThaiAI(`Đã lưu mức ưu tiên ${tenMucUuTien[suCo.uuTien]} cho ${suCo.ma}`, 'tim');
  goiToastTrangMe('Thay đổi mức ưu tiên đã được lưu vào hồ sơ', 'xanh-la');
});

phanTu('nutTuChoi').addEventListener('click', () => {
  phanTu('chonUuTienAI').hidden = true;
  datTrangThaiAI('Đã bỏ qua gợi ý này; dữ liệu hồ sơ không thay đổi.', 'vang');
  goiToastTrangMe('Đã từ chối đề xuất AI', 'vang');
});

phanTu('nutTaoLai').addEventListener('click', () => {
  const cacMuc = ['cao', 'trung-binh', 'thap'];
  mucUuTienDeXuat = cacMuc[(cacMuc.indexOf(mucUuTienDeXuat) + 1) % cacMuc.length];
  const mucUuTienEl = phanTu('mucUuTienDeXuat');
  mucUuTienEl.textContent = tenMucUuTien[mucUuTienDeXuat].toUpperCase();
  mucUuTienEl.className = `muc-uu-tien ${mucUuTienDeXuat}`;
  document.querySelectorAll('input[name="mucUuTienAI"]').forEach((input) => {
    input.checked = input.value === mucUuTienDeXuat;
  });
  phanTu('hanhDongKhongChacChan').hidden = true;
  datTrangThaiAI(`Đã phân tích lại: đề xuất mức ${tenMucUuTien[mucUuTienDeXuat]}.`, 'tim');
});

phanTu('nutKiemThuAI').addEventListener('click', () => {
  phanTu('hanhDongKhongChacChan').hidden = false;
  datTrangThaiAI('Không đủ dữ liệu để xác nhận mức ưu tiên. Vui lòng kiểm tra lại.', 'vang');
});

phanTu('nutThuLaiAI').addEventListener('click', () => {
  phanTu('hanhDongKhongChacChan').hidden = true;
  capNhatThongTinAI();
  datTrangThaiAI('Đã thử lại với dữ liệu hồ sơ hiện có.', 'tim');
});

phanTu('nutNhapThuCong').addEventListener('click', () => {
  phanTu('hanhDongKhongChacChan').hidden = true;
  phanTu('chonUuTienAI').hidden = false;
  datTrangThaiAI('Chế độ nhập thủ công: chọn mức ưu tiên và lưu để cập nhật hồ sơ.', 'vang');
});

phanTu('nutTaoKeHoach').addEventListener('click', () => {
  const suCos = suCoTrangHienTai();
  const soRuiRoCao = suCos.filter((suCo) => suCo.uuTien === 'cao').length;
  phanTu('noiDungKeHoach').textContent = `Trang ${trangHienTai} có ${suCos.length} sự cố, trong đó ${soRuiRoCao} mức ưu tiên cao. Đội vận hành nên kiểm tra các điểm có nguy cơ an toàn trước, sau đó cập nhật tiến độ theo SLA.`;
  phanTu('ketQuaCopilot').hidden = false;
});

phanTu('nutLuuKeHoach').addEventListener('click', () => {
  const suCo = suCoDangChon();
  suCo.keHoach = phanTu('noiDungKeHoach').textContent;
  veBangSuCo();
  phanTu('ketQuaCopilot').hidden = true;
  goiToastTrangMe(`Đã lưu kế hoạch vào ${suCo.ma}`, 'xanh-la');
});

phanTu('nutCapNhatTrang').setAttribute('aria-label', 'Cập nhật danh sách sự cố');

veBangSuCo();
capNhatPhanTrang();

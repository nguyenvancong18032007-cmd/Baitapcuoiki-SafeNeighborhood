'use strict';

const danhSachLoaiSuCo = [
  { ma: 'den-duong', ten: 'Đèn đường', tuKhoa: ['đèn', 'ánh sáng', 'tối', 'chiếu sáng'], bieuTuong: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z"/><path d="M9.5 12l2 2 3.5-4"/></svg>' },
  { ma: 'o-ga', ten: 'Ổ gà', tuKhoa: ['ổ gà', 'mặt đường', 'lún', 'đường'], bieuTuong: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3L2 20h20z"/><path d="M12 10v4M12 17v.5"/></svg>' },
  { ma: 'cay-xanh', ten: 'Cây xanh', tuKhoa: ['cây', 'cành', 'nhánh', 'đổ'], bieuTuong: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3L2 20h20z"/><path d="M12 10v4M12 17v.5"/></svg>' },
  { ma: 'vat-can', ten: 'Vật cản', tuKhoa: ['vật cản', 'chắn', 'nắp cống', 'rò rỉ', 'vỉa hè'], bieuTuong: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3L2 20h20z"/><path d="M12 10v4M12 17v.5"/></svg>' }
];

const danhSachSuCoMau = [
  { ma: '#IS-2018', loai: 'den-duong', ten: 'Đèn đường hỏng', khoangCach: '48m', thoiGian: '2 ngày trước' },
  { ma: '#IS-1994', loai: 'den-duong', ten: 'Mất ánh sáng công cộng', khoangCach: '76m', thoiGian: '5 ngày trước' },
  { ma: '#IS-2039', loai: 'o-ga', ten: 'Ổ gà lớn trên mặt đường', khoangCach: '120m', thoiGian: 'Hôm qua' },
  { ma: '#IS-2036', loai: 'cay-xanh', ten: 'Cây đổ chắn lối đi bộ', khoangCach: '85m', thoiGian: '3 giờ trước' }
];

const tenMucKhanCap = { thap: 'Thấp', 'trung-binh': 'Trung bình', cao: 'Cao' };
const layPhanTu = (id) => document.getElementById(id);
const phanTuTrangThaiAI = layPhanTu('trangThaiAI');
const oMoTa = layPhanTu('moTa');
const oTieuDe = layPhanTu('tieuDe');
let loaiDangChon = 'den-duong';
let mucKhanCapDangChon = 'trung-binh';
let ketQuaAI = null;
let lanCapNhatDauVao = 0;
const nutPhanTichAI = layPhanTu('nutPhanTichAI');

function goiToastTrangMe(noiDung, kieu = 'xanh-la') {
  if (window.parent && typeof window.parent.hienToast === 'function') {
    window.parent.hienToast(noiDung, kieu);
  } else {
    alert(noiDung);
  }
}

function datTrangThaiAI(noiDung, kieu = 'tim') {
  phanTuTrangThaiAI.hidden = false;
  phanTuTrangThaiAI.className = `trang-thai-ai ${kieu}`;
  phanTuTrangThaiAI.textContent = noiDung;
}

function veLoaiSuCo() {
  layPhanTu('luoiLoai').innerHTML = danhSachLoaiSuCo.map((loai) => `
    <button type="button" class="the-loai ${loai.ma === loaiDangChon ? 'dang-chon' : ''}" data-ma="${loai.ma}" aria-pressed="${loai.ma === loaiDangChon}">
      ${loai.bieuTuong}<span>${loai.ten}</span>
    </button>`).join('');
}

function veMucKhanCap() {
  layPhanTu('luoiKhanCap').innerHTML = Object.entries(tenMucKhanCap).map(([ma, ten]) => `
    <label class="lua-chon-khan-cap ${ma === mucKhanCapDangChon ? 'dang-chon' : ''}">
      <input type="radio" name="mucKhanCap" value="${ma}" ${ma === mucKhanCapDangChon ? 'checked' : ''}>
      <span>${ten}</span>
    </label>`).join('');
}

function chuanHoa(chuoi) {
  return chuoi.toLocaleLowerCase('vi').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function loaiTheoNoiDung(noiDung) {
  const vanBan = chuanHoa(noiDung);
  return danhSachLoaiSuCo.find((loai) => loai.tuKhoa.some((tuKhoa) => vanBan.includes(chuanHoa(tuKhoa)))) || null;
}

function layMucKhanCap() {
  const vanBan = chuanHoa(`${oTieuDe.value} ${oMoTa.value}`);
  if (/nguy hiem|tai nan|chay no|dien giat|chan duong|nga do|ro ri|mat an toan|tre em|nguoi gia|toi/.test(vanBan)) return 'cao';
  if (/hu hong|bat tien|xuong cap|keo dai|nhieu ngay/.test(vanBan)) return 'trung-binh';
  return 'thap';
}

function tinhKetQua() {
  const tieuDe = oTieuDe.value.trim();
  const moTa = oMoTa.value.trim();
  const vanBan = `${tieuDe} ${moTa}`;
  const vanBanChuan = chuanHoa(vanBan);
  const loaiGoiY = loaiTheoNoiDung(vanBan) || danhSachLoaiSuCo.find((loai) => loai.ma === loaiDangChon);
  const mucRuiRo = layMucKhanCap();
  const tuKhoaNguyHiem = ['nguy hiểm', 'tai nạn', 'chắn đường', 'đổ', 'rò rỉ', 'điện giật', 'cháy', 'tối'];
  const coTuKhoaNguyHiem = tuKhoaNguyHiem.some((tuKhoa) => vanBanChuan.includes(chuanHoa(tuKhoa)));
  const tuKhoaLoai = loaiGoiY.tuKhoa.filter((tuKhoa) => vanBanChuan.includes(chuanHoa(tuKhoa)));
  const moTaMoHo = /khong ro|chua ro|khong chac|co the khong|khong xac dinh/.test(vanBanChuan);
  const thongTinMauThuan = /khong nguy hiem|khong co nguy co|khong mat an toan|khong co rui ro/.test(vanBanChuan)
    && /tai nan|rui ro|nguy hiem|mat an toan/.test(vanBanChuan);
  const khongChacChan = moTaMoHo || thongTinMauThuan || tuKhoaLoai.length === 0;
  const coDuLieuTuongTu = danhSachSuCoMau.filter((suCo) => suCo.loai === loaiGoiY.ma);
  const tinCay = tuKhoaLoai.length
    ? Math.min(96, 58 + tuKhoaLoai.length * 12 + (tieuDe.length >= 10 ? 8 : 0) + (moTa.length >= 45 ? 12 : 0))
    : 42;

  return {
    loaiGoiY,
    mucGoiY: mucRuiRo,
    mucRuiRo,
    tinCay: khongChacChan ? 42 : tinCay,
    tinCayRuiRo: khongChacChan ? 42 : Math.min(95, 62 + (coTuKhoaNguyHiem ? 22 : 8) + (moTa.length >= 45 ? 10 : 0)),
    khongChacChan,
    moTaMoHo,
    thongTinMauThuan,
    coDuLieuTuongTu,
    coTuKhoaNguyHiem
  };
}

function hienKetQuaTrong() {
  ['noiDungAI1', 'noiDungAI2', 'noiDungAI3'].forEach((id) => { layPhanTu(id).hidden = true; });
  ['trongAI1', 'trongAI2', 'trongAI3'].forEach((id) => { layPhanTu(id).hidden = false; });
}

function hienTrangThaiThieuDuLieu() {
  ketQuaAI = null;
  hienKetQuaTrong();
  layPhanTu('trongAI1').textContent = 'Không đủ dữ liệu để tìm sự cố tương tự.';
  layPhanTu('trongAI2').textContent = 'Chưa thể đánh giá mức rủi ro.';
  layPhanTu('trongAI3').textContent = 'Chưa thể tạo tóm tắt khi thiếu mô tả.';
  layPhanTu('hanhDongKhongChacChan').hidden = false;
  layPhanTu('noiDungKhongChacChan').textContent = 'Không đủ dữ liệu để đề xuất. Vui lòng nhập tiêu đề và mô tả ít nhất 20 ký tự.';
  datTrangThaiAI('Thiếu thông tin đầu vào; chưa tạo đề xuất.', 'vang');
}

async function phanTichBaoCao() {
  if (oTieuDe.value.trim().length < 4 || oMoTa.value.trim().length < 20) {
    hienTrangThaiThieuDuLieu();
    return;
  }

  const lanPhanTich = ++lanCapNhatDauVao;
  ketQuaAI = null;
  hienKetQuaTrong();
  layPhanTu('trongAI1').textContent = 'Đang đối chiếu từ khóa và sự cố tương tự...';
  layPhanTu('trongAI2').textContent = 'Đang đánh giá dấu hiệu rủi ro...';
  layPhanTu('trongAI3').textContent = 'Đang tạo tóm tắt cho đội xử lý...';
  layPhanTu('hanhDongKhongChacChan').hidden = true;
  nutPhanTichAI.disabled = true;
  layPhanTu('nutThuLaiAI').disabled = true;
  datTrangThaiAI('Đang phân tích tiêu đề, mô tả và dữ liệu sự cố tương tự...', 'tim');
  await new Promise((hoanTat) => window.setTimeout(hoanTat, 450));
  if (lanPhanTich !== lanCapNhatDauVao) return;
  nutPhanTichAI.disabled = false;
  layPhanTu('nutThuLaiAI').disabled = false;

  ketQuaAI = tinhKetQua();
  const { loaiGoiY, mucGoiY, mucRuiRo, tinCay, tinCayRuiRo, khongChacChan, moTaMoHo, thongTinMauThuan, coDuLieuTuongTu, coTuKhoaNguyHiem } = ketQuaAI;

  layPhanTu('trongAI1').hidden = true;
  layPhanTu('noiDungAI1').hidden = false;
  layPhanTu('tieuDeGoiY').textContent = `${loaiGoiY.ten} · Khẩn cấp ${tenMucKhanCap[mucGoiY]}`;
  layPhanTu('doTinCayAI1').textContent = `Độ tin cậy ${tinCay}%`;
  layPhanTu('danhSachTrung').innerHTML = coDuLieuTuongTu.length
    ? coDuLieuTuongTu.map((suCo) => `<li><strong>${suCo.ma} · ${suCo.ten}</strong><small>${suCo.khoangCach} · ${suCo.thoiGian}</small></li>`).join('')
    : '<li><strong>Chưa tìm thấy báo cáo cùng nhóm</strong><small>Thử kiểm tra lại loại sự cố và vị trí.</small></li>';
  layPhanTu('lyDoAI1').textContent = `Nhận diện nhóm "${loaiGoiY.ten}" từ các từ khóa trong tiêu đề/mô tả; mức khẩn cấp ${tenMucKhanCap[mucGoiY].toLowerCase()} dựa trên dấu hiệu ảnh hưởng. Đối chiếu ${coDuLieuTuongTu.length} báo cáo cùng loại trong dữ liệu mẫu.`;

  layPhanTu('trongAI2').hidden = true;
  layPhanTu('noiDungAI2').hidden = false;
  layPhanTu('mucRuiRoAI').textContent = `Rủi ro ${tenMucKhanCap[mucRuiRo]}`;
  layPhanTu('mucRuiRoAI').className = `muc-rui-ro ${mucRuiRo}`;
  layPhanTu('doTinCayAI2').textContent = `Độ tin cậy ${tinCayRuiRo}%`;
  layPhanTu('lyDoAI2').textContent = coTuKhoaNguyHiem
    ? 'Phát hiện dấu hiệu có thể ảnh hưởng an toàn cộng đồng; ưu tiên kiểm tra hiện trường.'
    : 'Chưa phát hiện từ khóa nguy hiểm trực tiếp; vẫn cần nhân viên xác minh tình trạng thực tế.';
  layPhanTu('tieuChiAI2').textContent = `Đối chiếu từ khóa rủi ro trong nội dung và độ đầy đủ của mô tả. Mức khẩn cấp hiện chọn: ${tenMucKhanCap[mucKhanCapDangChon]}.`;

  layPhanTu('trongAI3').hidden = true;
  layPhanTu('noiDungAI3').hidden = false;
  layPhanTu('tomTatVanHanh').value = `${loaiGoiY.ten} (${tenMucKhanCap[mucRuiRo]}): ${oTieuDe.value.trim()}. ${oMoTa.value.trim()}`;
  layPhanTu('lyDoAI3').textContent = `Tóm tắt từ tiêu đề, mô tả, loại sự cố "${loaiGoiY.ten}" và mức khẩn cấp ${tenMucKhanCap[mucRuiRo].toLowerCase()}.`;

  layPhanTu('hanhDongKhongChacChan').hidden = !khongChacChan;
  if (khongChacChan) {
    const lyDo = thongTinMauThuan ? 'thông tin rủi ro mâu thuẫn' : moTaMoHo ? 'mô tả có dấu hiệu mơ hồ' : 'chưa nhận diện được từ khóa phân loại';
    layPhanTu('noiDungKhongChacChan').textContent = `AI chưa chắc chắn (độ tin cậy 42%) vì ${lyDo}. Cần người vận hành xác nhận.`;
    datTrangThaiAI('Kết quả độ tin cậy thấp; hãy xác minh trước khi áp dụng.', 'vang');
  } else {
    datTrangThaiAI('Đã phân tích dữ liệu báo cáo. Bạn có thể kiểm tra, chỉnh sửa hoặc từ chối từng gợi ý.', 'tim');
  }
}

function datLaiPhanTich() {
  lanCapNhatDauVao += 1;
  if (ketQuaAI) {
    ketQuaAI = null;
    hienKetQuaTrong();
    layPhanTu('trongAI1').textContent = 'Thông tin đã thay đổi; hãy phân tích lại để cập nhật gợi ý.';
    layPhanTu('trongAI2').textContent = 'Kết quả cũ đã được ẩn để tránh dùng cảnh báo lỗi thời.';
    layPhanTu('trongAI3').textContent = 'Tóm tắt cần được tạo lại theo thông tin mới.';
    layPhanTu('hanhDongKhongChacChan').hidden = true;
    datTrangThaiAI('Thông tin đã thay đổi; hãy phân tích lại trước khi dùng kết quả.', 'vang');
    return;
  }
  if (nutPhanTichAI.disabled) {
    nutPhanTichAI.disabled = false;
    layPhanTu('nutThuLaiAI').disabled = false;
    datTrangThaiAI('Thông tin đã thay đổi; hãy phân tích lại để cập nhật kết quả.', 'vang');
  }
}

function docDuLieuLuu(khoa) {
  try {
    const duLieu = localStorage.getItem(khoa);
    return duLieu ? JSON.parse(duLieu) : [];
  } catch (loi) {
    console.error(`Không thể đọc dữ liệu ${khoa} trong bộ nhớ trình duyệt.`, loi);
    goiToastTrangMe('Không thể đọc dữ liệu đã lưu. Hãy kiểm tra bộ nhớ trình duyệt.', 'do');
    return null;
  }
}

function luuDuLieu(khoa, duLieu) {
  try {
    localStorage.setItem(khoa, JSON.stringify(duLieu));
    return true;
  } catch (loi) {
    console.error(`Không thể lưu dữ liệu ${khoa} vào bộ nhớ trình duyệt.`, loi);
    goiToastTrangMe('Không thể lưu dữ liệu. Hãy kiểm tra quyền lưu trữ của trình duyệt.', 'do');
    return false;
  }
}

function khoiPhucBanNhap() {
  const banNhap = docDuLieuLuu('safeNeighborhoodReportDraft');
  if (!banNhap || Array.isArray(banNhap) || typeof banNhap !== 'object') return;

  if (typeof banNhap.tieuDe === 'string') oTieuDe.value = banNhap.tieuDe;
  if (typeof banNhap.moTa === 'string') oMoTa.value = banNhap.moTa;
  if (danhSachLoaiSuCo.some((loai) => loai.ma === banNhap.loaiSuCo)) loaiDangChon = banNhap.loaiSuCo;
  if (Object.prototype.hasOwnProperty.call(tenMucKhanCap, banNhap.mucKhanCap)) mucKhanCapDangChon = banNhap.mucKhanCap;
  if (typeof banNhap.tomTatVanHanh === 'string' && banNhap.tomTatVanHanh) {
    layPhanTu('tomTatVanHanh').value = banNhap.tomTatVanHanh;
    layPhanTu('trongAI3').hidden = true;
    layPhanTu('noiDungAI3').hidden = false;
  }
  layPhanTu('demKyTu').textContent = oMoTa.value.length;
  veLoaiSuCo();
  veMucKhanCap();
  datTrangThaiAI('Đã khôi phục bản nháp đã lưu trên thiết bị này.', 'tim');
}

function layMucKhanCapDaChon() {
  const mucDaChon = document.querySelector('input[name="mucKhanCap"]:checked');
  return mucDaChon ? mucDaChon.value : mucKhanCapDangChon;
}

function taoBanGhi(ma, trangThai) {
  return {
    ma,
    tieuDe: oTieuDe.value.trim(),
    moTa: oMoTa.value.trim(),
    loaiSuCo: loaiDangChon,
    mucKhanCap: layMucKhanCapDaChon(),
    congKhaiViTri: layPhanTu('congKhaiViTri').checked,
    tomTatVanHanh: layPhanTu('tomTatVanHanh').value.trim(),
    trangThai,
    capNhatLuc: new Date().toISOString()
  };
}

layPhanTu('luoiLoai').addEventListener('click', (suKien) => {
  const nut = suKien.target.closest('.the-loai');
  if (!nut) return;
  loaiDangChon = nut.dataset.ma;
  veLoaiSuCo();
  datLaiPhanTich();
});

layPhanTu('luoiKhanCap').addEventListener('change', (suKien) => {
  mucKhanCapDangChon = suKien.target.value;
  veMucKhanCap();
  datLaiPhanTich();
});

[oTieuDe, oMoTa].forEach((o) => o.addEventListener('input', () => {
  layPhanTu('demKyTu').textContent = oMoTa.value.length;
  datLaiPhanTich();
}));

nutPhanTichAI.addEventListener('click', phanTichBaoCao);
layPhanTu('nutThuLaiAI').addEventListener('click', phanTichBaoCao);
layPhanTu('nutBoSungThongTin').addEventListener('click', () => {
  oMoTa.focus();
  datTrangThaiAI('Bổ sung chi tiết quan sát, vị trí hoặc thời gian xảy ra rồi phân tích lại.', 'vang');
});
layPhanTu('nutNhapThuCong').addEventListener('click', () => {
  layPhanTu('hanhDongKhongChacChan').hidden = true;
  oTieuDe.focus();
  datTrangThaiAI('Chế độ nhập thủ công: bạn có thể tự chọn loại và mức khẩn cấp.', 'vang');
});

layPhanTu('nutChapNhan').addEventListener('click', () => {
  if (!ketQuaAI) return;
  loaiDangChon = ketQuaAI.loaiGoiY.ma;
  mucKhanCapDangChon = ketQuaAI.mucGoiY;
  veLoaiSuCo();
  veMucKhanCap();
  datTrangThaiAI('Đã áp dụng loại sự cố và mức khẩn cấp đề xuất vào biểu mẫu.', 'tim');
  goiToastTrangMe('Đã cập nhật loại sự cố và mức khẩn cấp từ AI', 'tim');
});

layPhanTu('nutSua').addEventListener('click', () => {
  layPhanTu('bieuMauSuCo').scrollIntoView({ behavior: 'smooth', block: 'start' });
  oTieuDe.focus({ preventScroll: true });
  datTrangThaiAI('Chỉnh sửa trực tiếp loại, mức khẩn cấp hoặc mô tả trong biểu mẫu.', 'tim');
});

layPhanTu('nutTuChoi').addEventListener('click', () => {
  layPhanTu('noiDungAI1').hidden = true;
  layPhanTu('trongAI1').hidden = false;
  layPhanTu('trongAI1').textContent = 'Bạn đã từ chối gợi ý; dữ liệu biểu mẫu không thay đổi.';
  datTrangThaiAI('Đã từ chối gợi ý phân loại.', 'vang');
});

layPhanTu('nutTaoLai').addEventListener('click', phanTichBaoCao);

layPhanTu('nutApDungRuiRo').addEventListener('click', () => {
  if (!ketQuaAI) return;
  mucKhanCapDangChon = ketQuaAI.mucRuiRo;
  veMucKhanCap();
  datTrangThaiAI(`Đã áp dụng mức khẩn cấp ${tenMucKhanCap[mucKhanCapDangChon]} vào biểu mẫu.`, 'tim');
});

layPhanTu('nutTuChoiRuiRo').addEventListener('click', () => {
  layPhanTu('noiDungAI2').hidden = true;
  layPhanTu('trongAI2').hidden = false;
  layPhanTu('trongAI2').textContent = 'Đã bỏ qua cảnh báo; mức khẩn cấp hiện tại không thay đổi.';
  datTrangThaiAI('Đã bỏ qua cảnh báo rủi ro.', 'vang');
});

layPhanTu('nutLuuTomTat').addEventListener('click', () => {
  const duLieu = taoBanGhi('#IS-DRAFT', 'Bản nháp');
  if (!luuDuLieu('safeNeighborhoodReportDraft', duLieu)) return;
  datTrangThaiAI('Đã lưu tóm tắt vào bản nháp báo cáo trên thiết bị này.', 'tim');
  goiToastTrangMe('Đã lưu tóm tắt vận hành vào bản nháp', 'xanh-la');
});

layPhanTu('bieuMauSuCo').addEventListener('submit', (suKien) => {
  suKien.preventDefault();
  if (oTieuDe.value.trim().length < 4) {
    goiToastTrangMe('Vui lòng nhập tiêu đề sự cố (ít nhất 4 ký tự).', 'do');
    oTieuDe.focus();
    return;
  }
  if (oMoTa.value.trim().length < 20) {
    goiToastTrangMe('Vui lòng mô tả sự cố rõ hơn (ít nhất 20 ký tự).', 'do');
    oMoTa.focus();
    return;
  }
  const baoCaoDaLuu = docDuLieuLuu('safeNeighborhoodReports');
  if (!baoCaoDaLuu) return;
  if (!Array.isArray(baoCaoDaLuu)) {
    console.error('Dữ liệu báo cáo đã lưu không đúng định dạng.');
    goiToastTrangMe('Không thể gửi báo cáo vì dữ liệu lưu trữ không hợp lệ.', 'do');
    return;
  }
  const maSoTiepTheo = baoCaoDaLuu.reduce((maLonNhat, baoCao) => {
    const soMa = Number(String(baoCao.ma).replace(/\D/g, ''));
    return Math.max(maLonNhat, soMa || 0);
  }, 2041) + 1;
  const baoCao = taoBanGhi(`#IS-${maSoTiepTheo}`, 'Đã gửi');
  if (!luuDuLieu('safeNeighborhoodReports', [...baoCaoDaLuu, baoCao])) return;
  datTrangThaiAI(`Đã lưu báo cáo ${baoCao.ma} cùng tóm tắt vận hành.`, 'tim');
  goiToastTrangMe(`Báo cáo đã gửi thành công! Mã ${baoCao.ma}`, 'xanh-la');
});

layPhanTu('nutQuayLai').addEventListener('click', () => {
  goiToastTrangMe('Đang ở bước 2. Quay lại bước 1 để sửa vị trí.', 'xanh');
});

veLoaiSuCo();
veMucKhanCap();
khoiPhucBanNhap();

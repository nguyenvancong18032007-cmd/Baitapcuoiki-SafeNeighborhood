'use strict';

/**
 * Hàm gọi hiển thị Toast từ khung sườn chính (index.html)
 * @param {string} noiDung - Nội dung thông báo hiển thị
 * @param {string} kieu - Loại màu ('xanh-la', 'vang', 'do', 'tim', 'xanh')
 */
function goiToast(noiDung, kieu = 'xanh-la') {
  if (window.parent && typeof window.parent.hienToast === 'function') {
    window.parent.hienToast(noiDung, kieu);
  } else {
    alert(noiDung);
  }
}
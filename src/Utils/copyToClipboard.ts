export function copyToClipboard(str) {
  const el = document.createElement('textarea');
  el.value = str;
  el.style.visibility = 'none';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

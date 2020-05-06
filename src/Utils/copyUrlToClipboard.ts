import { copyToClipboard } from './copyToClipboard';

export function copyUrlToClipboard(path) {
  const el = document.createElement('a');
  el.href = path;
  copyToClipboard(el.href);
}

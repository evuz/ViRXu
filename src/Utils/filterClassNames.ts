export function filterClassNames(classnames: { [key: string]: boolean }) {
  return Object.keys(classnames)
    .filter((key) => classnames[key])
    .join(' ');
}

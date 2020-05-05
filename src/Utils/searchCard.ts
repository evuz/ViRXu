export function searchCard<T extends Object>(obj: T, fn: Function): T {
  const initial: any = Array.isArray(obj) ? [] : {};
  return Object.keys(obj).reduce((acc, key) => {
    const el = obj[key];
    if (!el || typeof el !== 'object') {
      acc[key] = el;
      return acc;
    }

    if (el.cardId) {
      acc[key] = fn(el);
      return acc;
    }

    acc[key] = searchCard(el, fn);
    return acc;
  }, initial);
}

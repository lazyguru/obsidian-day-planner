export function doesContentOverflow(el: HTMLDivElement) {
  return el?.scrollHeight > el?.offsetHeight;
}

export function computeAutoHeight(el: HTMLDivElement) {
  const style = getComputedStyle(el);

  const borderTop = style.getPropertyValue("border-top-width");
  const borderBottom = style.getPropertyValue("border-bottom-width");

  return `calc(${el.scrollHeight}px + ${borderTop} + ${borderBottom})`;
}

export const onDragCallback = ({
  target,
  top,
  left,
  refObj,
}: {
  target: HTMLElement | SVGElement;
  top: number;
  left: number;
  refObj: HTMLDivElement;
}): void => {
  const containerRect = refObj.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const newTop = Math.max(
    0,
    Math.min(top, containerRect.height - targetRect.height),
  );
  const newLeft = Math.max(
    0,
    Math.min(left, containerRect.width - targetRect.width),
  );
  const topPercent = (newTop / containerRect.height);
  const leftPercent = (newLeft / containerRect.width);
  target.style.top = `${top}`;
  target.style.left = `${left}`;
};

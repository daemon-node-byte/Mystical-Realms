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
  const topPercent = (newTop / containerRect.height) * 100;
  const leftPercent = (newLeft / containerRect.width) * 100;
  target.style.top = `${topPercent}%`;
  target.style.left = `${leftPercent}%`;
};

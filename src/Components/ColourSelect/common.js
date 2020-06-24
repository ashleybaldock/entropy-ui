export const getPath = (radius, { x: x1, y: y1 }, { x: x2, y: y2 }) =>
  `M ${x1.toFixed(3)},${y1.toFixed(3)} A ${radius.toFixed(3)},${radius.toFixed(
    3
  )} 0 0,1 ${x2.toFixed(3)},${y2.toFixed(3)}`;

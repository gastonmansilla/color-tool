export const hsbToRgb = (h: number, s: number, b: number) => {
  s /= 100;
  b /= 100;
  const k = (n: number) => (n + h / 60) % 6;
  const f = (n: number) =>
    b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return [255 * f(5), 255 * f(3), 255 * f(1)];
};

export const numberToHexString = (n: number) =>
  Math.floor(n).toString(16).padStart(2, "0").toUpperCase();

export const rgbToHex = (r: number, g: number, b: number) =>
  `${numberToHexString(r)}${numberToHexString(g)}${numberToHexString(b)}`;

export const hsbToHex = (h: number, s: number, b: number) => {
  const [red, green, blue] = hsbToRgb(h, s, b);
  return rgbToHex(red, green, blue);
};

export const hexToRgb = (hexColor: string) => {
  hexColor = hexColor.replace("#", "");
  const red = parseInt(hexColor.substring(1, 2), 16);
  const green = parseInt(hexColor.substring(3, 2), 16);
  const blue = parseInt(hexColor.substring(5, 2), 16);
  return [red, green, blue];
};

export const stepSize = (range: [number, number], steps: number) =>
  (range[1] - range[0]) / steps;

export const steps = (range: [number, number], steps: number) => {
  const size = stepSize(range, steps);
  return Array.from({ length: steps }).map(
    (_, columnIndex) => range[0] + columnIndex * size
  );
};

export const getContrastColor = (
  hexColor: string,
  options = { darkColor: "#3d3d3d", lightColor: "#f5f5f5" }
) => {
  const [r, g, b] = hexToRgb(hexColor);

  // Calculate relative luminance
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

  // Choose black or white as the contrast color based on luminance
  return luminance > 0.5 ? options.darkColor : options.lightColor;
};

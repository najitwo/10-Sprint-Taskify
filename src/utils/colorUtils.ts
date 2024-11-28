export const getRandomColor = (name: string) => {
  const hash = [...name].reduce(
    (acc, char) => acc + char.charCodeAt(0) * 31,
    0
  );
  const getValue = (offset: number) => {
    const baseValue = (((hash >> offset) % 0xff) % 76) + 180;
    const maxValue = 225;
    return Math.min(baseValue, maxValue);
  };
  const red = getValue(0);
  const green = getValue(8);
  const blue = getValue(16);

  return `rgb(${red}, ${green}, ${blue})`;
};

export const getDarkerColor = (rgbStr: string, adjustValue = 100) => {
  const [red, green, blue] = extractRGBNumbers(rgbStr).map((color) =>
    Math.max(color - adjustValue, 0)
  );

  return `rgb(${red}, ${green}, ${blue})`;
};

export const extractRGBNumbers = (rgbStr: string): number[] => {
  const match = rgbStr.match(/\d+/g);
  return match ? match.map(Number) : [];
};

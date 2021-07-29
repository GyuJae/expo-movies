export const sliceText = (text: string, sliceNum: number): string =>
  text.length > sliceNum ? text.slice(0, sliceNum) + "..." : text;

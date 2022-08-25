import { diffText } from "./diffText";

describe("general", () => {
  test("basic", () => {
    const strA = "xbxxabdx";
    const strB = "abxxxzddx";

    expect(diffText(strA, strB)).toEqual([
      ["I", 1, 0, null],
      ["M", 3, 1, 0],
      ["D", 1, null, 3],
      ["M", 4, 4, 4],
      ["I", 2, 8, null],
    ]);
  });
});

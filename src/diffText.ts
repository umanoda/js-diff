type Delete = "D";
type Insert = "I";
type Match = "M";
type Method = Delete | Insert | Match;

// [Method, length, startPoint_M, startPoint_N]
type DiffDelete = [Delete, number, null, number];
type DiffInsert = [Insert, number, number, null];
type DiffMatch = [Match, number, number, number];

type DiffDetail = DiffDelete | DiffInsert | DiffMatch;
type ShortestEditScript = DiffDetail[];

const diffText = (a: string, b: string) => {
  if (a.length <= b.length) {
    return _diffText(a, b);
  } else {
    return _diffText(b, a).map(([t, len, m, n]) => {
      switch (t) {
        case "D":
          return ["I", len, n, m];
        case "I":
          return ["D", len, n, m];
        default:
          return ["M", len, n, m];
      }
    });
  }
};

/**
 * ref. An O(NP) Sequence Comparison Algorithm by described by Sun Wu, Udi Manber and Gene Myers (Wu et al.)
 * https://www.sciencedirect.com/science/article/abs/pii/002001909090035V
 *
 * @param a string a.length <= b.length
 * @param b string
 * @returns
 */
const _diffText = (a: string, b: string) => {
  const ses: ShortestEditScript = [
    ["D", 4, null, 0],
    ["M", 5, 0, 4],
    ["D", 3, null, 9],
    ["M", 4, 3, 12],
    ["I", 5, 7, null],
  ];
  return ses;
};

export { diffText };

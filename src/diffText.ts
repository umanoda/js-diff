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
  const diff = _diffText(a, b);

  console.log(diff);
  /*
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
  */
};

class Diff {
  a: string;
  b: string;
  m: number;
  n: number;
  flg: -1 | 1;

  constructor(a: string, b: string, flg: -1 | 1 = 1) {
    this.a = a;
    this.b = b;
    this.m = a.length;
    this.n = b.length;
    this.flg = flg;
    if (this.m > this.n) {
      return new Diff(a, b, -1);
    }
  }

  get delta() {
    return this.n - this.m;
  }

  snake(k: number, y: number) {
    if (isNaN(y)) {
      y = -1;
    }
    let x = y - k;
    while (x < this.m && y < this.n && this.a[x] === this.b[y]) {
      x += 1;
      y += 1;
    }
    return y;
  }
}

/**
 * ref. An O(NP) Sequence Comparison Algorithm by described by Sun Wu, Udi Manber and Gene Myers (Wu et al.)
 * https://www.sciencedirect.com/science/article/abs/pii/002001909090035V
 *
 * @param a string a.length <= b.length
 * @param b string
 * @returns
 */
const _diffText = (a: string, b: string) => {
  const d = new Diff(a, b);

  const v = new Array(d.m + d.n + 1);
  const offset = d.m;
  const delta = d.delta;

  console.log(`a=${a}\nb=${b}`);

  if (d.m === 0 && d.n === 0) {
    return 0;
  } else if (d.m === 0 && d.n > 0) {
    return d.delta;
  }

  // Search for P-value
  for (let p = 0; p <= d.m; p++) {
    // -p <= k < delta
    for (let k = -p; k < delta; k++) {
      v[offset + k] = d.snake(
        k,
        Math.max(v[offset + k - 1] + 1, v[offset + k + 1])
      );
    }

    // delta < k <= delta + p
    for (let k = delta + p; k > delta; k--) {
      v[offset + k] = d.snake(
        k,
        Math.max(v[offset + k - 1] + 1, v[offset + k + 1])
      );
    }

    // k = delta
    {
      const k = delta;
      v[offset + k] = d.snake(
        k,
        Math.max(v[offset + k - 1] + 1, v[offset + k + 1])
      );
    }

    console.log(
      `p=${p} :: m=${d.m} ,n=${d.n}, delta=${delta}\n${v}\nv[offset + delta]=${
        v[offset + delta]
      }`
    );

    if (v[offset + delta] === d.n) {
      return delta + 2 * p;
    }
  }
  throw Error("Never reach");

  // const ses: ShortestEditScript = [
  //   ["D", 4, null, 0],
  //   ["M", 5, 0, 4],
  //   ["D", 3, null, 9],
  //   ["M", 4, 3, 12],
  //   ["I", 5, 7, null],
  // ];
  // return ses;
};

export { diffText };

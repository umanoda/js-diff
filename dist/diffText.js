(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.diffText = void 0;
    const diffText = (a, b) => {
        const d = new Diff(a, b);
        const diff = d.distance();
        console.log(diff);
        console.log(d.regexp());
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
    exports.diffText = diffText;
    const escapeRegexp = (s) => {
        return s.replace(/([/<>?.+*[\]()])/g, "\\$1");
    };
    const max = (arg, callback) => {
        if (arg.length === 0) {
            return null;
        }
        return arg.reduce((a, b) => (callback(a) > callback(b) ? a : b));
    };
    class Diff {
        constructor(a, b, flg = 1) {
            this.a = a;
            this.b = b;
            this.m = a.length;
            this.n = b.length;
            this.flg = flg;
            this.matches = [];
            this._p = null;
            if (this.m > this.n) {
                return new Diff(a, b, -1);
            }
        }
        get delta() {
            return this.n - this.m;
        }
        distance() {
            return this.delta + 2 * this.p();
        }
        regexp() {
            const lengthOfMatch = this.m - this.p();
            let individuals = new Array(100 + this.matches.length * 10);
            individuals.fill(null);
            individuals = individuals.map(() => {
                // copy array and shuffle
                const copiedMatches = Array.from(this.matches).sort(() => Math.floor(Math.random() - 0.5));
                let t = 0;
                const individual = [];
                copiedMatches.forEach((c) => {
                    if (t >= lengthOfMatch) {
                        return;
                    }
                    individual.push(c);
                    t += c.s.length;
                });
                if (individual.reduce((a, b) => a + b.s.length, 0) > lengthOfMatch) {
                    return null;
                }
                const regexp = new RegExp(`^(.*)${individual
                    .sort((a, b) => a.y - b.y)
                    .map((m) => `(${escapeRegexp(m.s)})`)
                    .join("(.*)")}(.*)$`);
                return regexp;
            });
            return (max(individuals, (m) => {
                if (!m) {
                    return -100;
                }
                const matchA = this.a.match(m);
                const matchB = this.b.match(m);
                if (!matchA || !matchB) {
                    return -100;
                }
                return Math.pow(matchA[0].length, 2) - matchA.length;
            }) || /^$/);
        }
        /**
         * ref. An O(NP) Sequence Comparison Algorithm by described by Sun Wu, Udi Manber and Gene Myers (Wu et al.)
         * https://www.sciencedirect.com/science/article/abs/pii/002001909090035V
         *
         * @param a string a.length <= b.length
         * @param b string
         * @returns
         */
        p() {
            if (this._p !== null) {
                return this._p;
            }
            const v = [];
            for (let i = -(this.m + 1); i <= this.n + 1; i++) {
                v[i] = -1;
            }
            const delta = this.delta;
            if (this.m === 0 && this.n === 0) {
                return 0;
            }
            else if (this.m === 0 && this.n > 0) {
                return this.delta;
            }
            // Search for P-value
            for (let p = -1; p <= this.m; p++) {
                // -p <= k < delta
                for (let k = -p; k < delta; k++) {
                    v[k] = this.snake(k, Math.max(v[k - 1] + 1, v[k + 1]));
                }
                // delta < k <= delta + p
                for (let k = delta + p; k > delta; k--) {
                    v[k] = this.snake(k, Math.max(v[k - 1] + 1, v[k + 1]));
                }
                // k = delta
                {
                    v[delta] = this.snake(delta, Math.max(v[delta - 1] + 1, v[delta + 1]));
                }
                if (v[delta] === this.n) {
                    this._p = p;
                    return p;
                }
            }
            throw Error("Never reach");
        }
        snake(k, y) {
            let x = y - k;
            const st = y;
            let m = "";
            while (this.a[x] === this.b[y]) {
                if (this.a[x] !== undefined) {
                    m += this.a[x];
                }
                if (!(x < this.m && y < this.n)) {
                    break;
                }
                x += 1;
                y += 1;
            }
            if (m !== "") {
                this.matches.push({ y: st, s: m });
            }
            return y;
        }
    }
});
//# sourceMappingURL=diffText.js.map
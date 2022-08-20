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
        if (a.length <= b.length) {
            return _diffText(a, b);
        }
        else {
            return _diffText(b, a);
        }
    };
    exports.diffText = diffText;
    /**
     * ref. An O(NP) Sequence Comparison Algorithm by described by Sun Wu, Udi Manber and Gene Myers (Wu et al.)
     * https://www.sciencedirect.com/science/article/abs/pii/002001909090035V
     *
     * @param a string a.length <= b.length
     * @param b string
     * @returns
     */
    const _diffText = (a, b) => {
        const ses = [
            ["D", 4, null, 0],
            ["M", 5, 0, 4],
            ["D", 3, null, 9],
            ["M", 4, 3, 12],
            ["I", 5, 7, null],
        ];
        return ses;
    };
});
//# sourceMappingURL=diffText.js.map
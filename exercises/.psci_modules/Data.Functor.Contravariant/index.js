import * as Data_Functor from "../Data.Functor/index.js";
import * as Data_Void from "../Data.Void/index.js";
var contravariantConst = {
    cmap: function (v) {
        return function (v1) {
            return v1;
        };
    }
};
var cmap = function (dict) {
    return dict.cmap;
};

// | `cmapFlipped` is `cmap` with its arguments reversed.
var cmapFlipped = function (dictContravariant) {
    var cmap1 = cmap(dictContravariant);
    return function (x) {
        return function (f) {
            return cmap1(f)(x);
        };
    };
};
var coerce = function (dictContravariant) {
    var cmap1 = cmap(dictContravariant);
    return function (dictFunctor) {
        var map = Data_Functor.map(dictFunctor);
        return function (a) {
            return map(Data_Void.absurd)(cmap1(Data_Void.absurd)(a));
        };
    };
};

// | As all `Contravariant` functors are also trivially `Invariant`, this function can be used as the `imap` implementation for any types that have an existing `Contravariant` instance.
var imapC = function (dictContravariant) {
    var cmap1 = cmap(dictContravariant);
    return function (v) {
        return function (f) {
            return cmap1(f);
        };
    };
};
export {
    cmap,
    cmapFlipped,
    coerce,
    imapC,
    contravariantConst
};

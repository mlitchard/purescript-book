import * as Data_Maybe from "../Data.Maybe/index.js";
import * as Data_Monoid from "../Data.Monoid/index.js";
import * as Data_Semigroup from "../Data.Semigroup/index.js";
import * as Data_Show from "../Data.Show/index.js";

// | Monoid returning the last (right-most) non-`Nothing` value.
// |
// | ``` purescript
// | Last (Just x) <> Last (Just y) == Last (Just y)
// | Last (Just x) <> Last Nothing == Last (Just x)
// | Last Nothing <> Last Nothing == Last Nothing
// | mempty :: Last _ == Last Nothing
// | ```
var Last = function (x) {
    return x;
};
var showLast = function (dictShow) {
    var show = Data_Show.show(Data_Maybe.showMaybe(dictShow));
    return {
        show: function (v) {
            return "(Last " + (show(v) + ")");
        }
    };
};
var semigroupLast = {
    append: function (v) {
        return function (v1) {
            if (v1 instanceof Data_Maybe.Just) {
                return v1;
            };
            if (v1 instanceof Data_Maybe.Nothing) {
                return v;
            };
            throw new Error("Failed pattern match at Data.Maybe.Last (line 54, column 1 - line 56, column 36): " + [ v.constructor.name, v1.constructor.name ]);
        };
    }
};
var ordLast = function (dictOrd) {
    return Data_Maybe.ordMaybe(dictOrd);
};
var ord1Last = Data_Maybe.ord1Maybe;
var newtypeLast = {
    Coercible0: function () {
        return undefined;
    }
};
var monoidLast = /* #__PURE__ */ (function () {
    return {
        mempty: Data_Maybe.Nothing.value,
        Semigroup0: function () {
            return semigroupLast;
        }
    };
})();
var monadLast = Data_Maybe.monadMaybe;
var invariantLast = Data_Maybe.invariantMaybe;
var functorLast = Data_Maybe.functorMaybe;
var extendLast = Data_Maybe.extendMaybe;
var eqLast = function (dictEq) {
    return Data_Maybe.eqMaybe(dictEq);
};
var eq1Last = Data_Maybe.eq1Maybe;
var boundedLast = function (dictBounded) {
    return Data_Maybe.boundedMaybe(dictBounded);
};
var bindLast = Data_Maybe.bindMaybe;
var applyLast = Data_Maybe.applyMaybe;
var applicativeLast = Data_Maybe.applicativeMaybe;
var altLast = {
    alt: /* #__PURE__ */ Data_Semigroup.append(semigroupLast),
    Functor0: function () {
        return functorLast;
    }
};
var plusLast = {
    empty: /* #__PURE__ */ Data_Monoid.mempty(monoidLast),
    Alt0: function () {
        return altLast;
    }
};
var alternativeLast = {
    Applicative0: function () {
        return applicativeLast;
    },
    Plus1: function () {
        return plusLast;
    }
};
export {
    Last,
    newtypeLast,
    eqLast,
    eq1Last,
    ordLast,
    ord1Last,
    boundedLast,
    functorLast,
    invariantLast,
    applyLast,
    applicativeLast,
    bindLast,
    monadLast,
    extendLast,
    showLast,
    semigroupLast,
    monoidLast,
    altLast,
    plusLast,
    alternativeLast
};

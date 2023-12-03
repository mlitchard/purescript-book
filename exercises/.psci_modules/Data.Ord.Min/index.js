import * as Data_Bounded from "../Data.Bounded/index.js";
import * as Data_Ord from "../Data.Ord/index.js";
import * as Data_Show from "../Data.Show/index.js";

// | Provides a `Semigroup` based on the `min` function. If the type has a
// | `Bounded` instance, then a `Monoid` instance is provided too. For example:
// |
// |     unwrap (Min 5 <> Min 6) = 5
// |     mempty :: Min Ordering = Min GT
// |
var Min = function (x) {
    return x;
};
var showMin = function (dictShow) {
    var show = Data_Show.show(dictShow);
    return {
        show: function (v) {
            return "(Min " + (show(v) + ")");
        }
    };
};
var semigroupMin = function (dictOrd) {
    var min = Data_Ord.min(dictOrd);
    return {
        append: function (v) {
            return function (v1) {
                return min(v)(v1);
            };
        }
    };
};
var newtypeMin = {
    Coercible0: function () {
        return undefined;
    }
};
var monoidMin = function (dictBounded) {
    var semigroupMin1 = semigroupMin(dictBounded.Ord0());
    return {
        mempty: Data_Bounded.top(dictBounded),
        Semigroup0: function () {
            return semigroupMin1;
        }
    };
};
var eqMin = function (dictEq) {
    return dictEq;
};
var ordMin = function (dictOrd) {
    var compare = Data_Ord.compare(dictOrd);
    var eqMin1 = eqMin(dictOrd.Eq0());
    return {
        compare: function (v) {
            return function (v1) {
                return compare(v)(v1);
            };
        },
        Eq0: function () {
            return eqMin1;
        }
    };
};
export {
    Min,
    newtypeMin,
    eqMin,
    ordMin,
    semigroupMin,
    monoidMin,
    showMin
};

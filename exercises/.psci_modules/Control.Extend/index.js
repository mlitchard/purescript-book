import * as $foreign from "./foreign.js";
import * as Control_Category from "../Control.Category/index.js";
import * as Data_Functor from "../Data.Functor/index.js";
import * as Data_Semigroup from "../Data.Semigroup/index.js";
var identity = /* #__PURE__ */ Control_Category.identity(Control_Category.categoryFn);
var extendFn = function (dictSemigroup) {
    var append = Data_Semigroup.append(dictSemigroup);
    return {
        extend: function (f) {
            return function (g) {
                return function (w) {
                    return f(function (w$prime) {
                        return g(append(w)(w$prime));
                    });
                };
            };
        },
        Functor0: function () {
            return Data_Functor.functorFn;
        }
    };
};
var extendArray = {
    extend: $foreign.arrayExtend,
    Functor0: function () {
        return Data_Functor.functorArray;
    }
};
var extend = function (dict) {
    return dict.extend;
};

// | A version of `extend` with its arguments flipped.
var extendFlipped = function (dictExtend) {
    var extend1 = extend(dictExtend);
    return function (w) {
        return function (f) {
            return extend1(f)(w);
        };
    };
};

// | Duplicate a comonadic context.
// |
// | `duplicate` is dual to `Control.Bind.join`.
var duplicate = function (dictExtend) {
    return extend(dictExtend)(identity);
};

// | Backwards co-Kleisli composition.
var composeCoKleisliFlipped = function (dictExtend) {
    var extend1 = extend(dictExtend);
    return function (f) {
        return function (g) {
            return function (w) {
                return f(extend1(g)(w));
            };
        };
    };
};

// | Forwards co-Kleisli composition.
var composeCoKleisli = function (dictExtend) {
    var extend1 = extend(dictExtend);
    return function (f) {
        return function (g) {
            return function (w) {
                return g(extend1(f)(w));
            };
        };
    };
};
export {
    extend,
    extendFlipped,
    composeCoKleisli,
    composeCoKleisliFlipped,
    duplicate,
    extendFn,
    extendArray
};
export {
    map,
    void
} from "../Data.Functor/index.js";

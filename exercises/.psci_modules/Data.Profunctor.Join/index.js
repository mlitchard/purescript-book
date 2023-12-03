import * as Control_Category from "../Control.Category/index.js";
import * as Control_Semigroupoid from "../Control.Semigroupoid/index.js";
import * as Data_Profunctor from "../Data.Profunctor/index.js";
import * as Data_Show from "../Data.Show/index.js";
var Join = function (x) {
    return x;
};
var showJoin = function (dictShow) {
    var show = Data_Show.show(dictShow);
    return {
        show: function (v) {
            return "(Join " + (show(v) + ")");
        }
    };
};
var semigroupJoin = function (dictSemigroupoid) {
    var compose = Control_Semigroupoid.compose(dictSemigroupoid);
    return {
        append: function (v) {
            return function (v1) {
                return compose(v)(v1);
            };
        }
    };
};
var ordJoin = function (dictOrd) {
    return dictOrd;
};
var newtypeJoin = {
    Coercible0: function () {
        return undefined;
    }
};
var monoidJoin = function (dictCategory) {
    var semigroupJoin1 = semigroupJoin(dictCategory.Semigroupoid0());
    return {
        mempty: Control_Category.identity(dictCategory),
        Semigroup0: function () {
            return semigroupJoin1;
        }
    };
};
var invariantJoin = function (dictProfunctor) {
    var dimap = Data_Profunctor.dimap(dictProfunctor);
    return {
        imap: function (f) {
            return function (g) {
                return function (v) {
                    return dimap(g)(f)(v);
                };
            };
        }
    };
};
var eqJoin = function (dictEq) {
    return dictEq;
};
export {
    Join,
    newtypeJoin,
    eqJoin,
    ordJoin,
    showJoin,
    semigroupJoin,
    monoidJoin,
    invariantJoin
};

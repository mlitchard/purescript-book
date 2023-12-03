import * as Control_Biapplicative from "../Control.Biapplicative/index.js";
import * as Control_Biapply from "../Control.Biapply/index.js";
import * as Data_Bifunctor from "../Data.Bifunctor/index.js";
import * as Data_Eq from "../Data.Eq/index.js";
import * as Data_Functor from "../Data.Functor/index.js";
import * as Data_Ord from "../Data.Ord/index.js";
import * as Data_Ordering from "../Data.Ordering/index.js";
import * as Data_Profunctor from "../Data.Profunctor/index.js";
import * as Data_Show from "../Data.Show/index.js";
var Product2 = /* #__PURE__ */ (function () {
    function Product2(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    Product2.create = function (value0) {
        return function (value1) {
            return new Product2(value0, value1);
        };
    };
    return Product2;
})();
var showProduct2 = function (dictShow) {
    var show = Data_Show.show(dictShow);
    return function (dictShow1) {
        var show1 = Data_Show.show(dictShow1);
        return {
            show: function (v) {
                return "(Product2 " + (show(v.value0) + (" " + (show1(v.value1) + ")")));
            }
        };
    };
};
var profunctorProduct2 = function (dictProfunctor) {
    var dimap = Data_Profunctor.dimap(dictProfunctor);
    return function (dictProfunctor1) {
        var dimap1 = Data_Profunctor.dimap(dictProfunctor1);
        return {
            dimap: function (f) {
                return function (g) {
                    return function (v) {
                        return new Product2(dimap(f)(g)(v.value0), dimap1(f)(g)(v.value1));
                    };
                };
            }
        };
    };
};
var functorProduct2 = function (dictFunctor) {
    var map = Data_Functor.map(dictFunctor);
    return function (dictFunctor1) {
        var map1 = Data_Functor.map(dictFunctor1);
        return {
            map: function (f) {
                return function (v) {
                    return new Product2(map(f)(v.value0), map1(f)(v.value1));
                };
            }
        };
    };
};
var eqProduct2 = function (dictEq) {
    var eq = Data_Eq.eq(dictEq);
    return function (dictEq1) {
        var eq1 = Data_Eq.eq(dictEq1);
        return {
            eq: function (x) {
                return function (y) {
                    return eq(x.value0)(y.value0) && eq1(x.value1)(y.value1);
                };
            }
        };
    };
};
var ordProduct2 = function (dictOrd) {
    var compare = Data_Ord.compare(dictOrd);
    var eqProduct21 = eqProduct2(dictOrd.Eq0());
    return function (dictOrd1) {
        var compare1 = Data_Ord.compare(dictOrd1);
        var eqProduct22 = eqProduct21(dictOrd1.Eq0());
        return {
            compare: function (x) {
                return function (y) {
                    var v = compare(x.value0)(y.value0);
                    if (v instanceof Data_Ordering.LT) {
                        return Data_Ordering.LT.value;
                    };
                    if (v instanceof Data_Ordering.GT) {
                        return Data_Ordering.GT.value;
                    };
                    return compare1(x.value1)(y.value1);
                };
            },
            Eq0: function () {
                return eqProduct22;
            }
        };
    };
};
var bifunctorProduct2 = function (dictBifunctor) {
    var bimap = Data_Bifunctor.bimap(dictBifunctor);
    return function (dictBifunctor1) {
        var bimap1 = Data_Bifunctor.bimap(dictBifunctor1);
        return {
            bimap: function (f) {
                return function (g) {
                    return function (v) {
                        return new Product2(bimap(f)(g)(v.value0), bimap1(f)(g)(v.value1));
                    };
                };
            }
        };
    };
};
var biapplyProduct2 = function (dictBiapply) {
    var biapply = Control_Biapply.biapply(dictBiapply);
    var bifunctorProduct21 = bifunctorProduct2(dictBiapply.Bifunctor0());
    return function (dictBiapply1) {
        var biapply1 = Control_Biapply.biapply(dictBiapply1);
        var bifunctorProduct22 = bifunctorProduct21(dictBiapply1.Bifunctor0());
        return {
            biapply: function (v) {
                return function (v1) {
                    return new Product2(biapply(v.value0)(v1.value0), biapply1(v.value1)(v1.value1));
                };
            },
            Bifunctor0: function () {
                return bifunctorProduct22;
            }
        };
    };
};
var biapplicativeProduct2 = function (dictBiapplicative) {
    var bipure = Control_Biapplicative.bipure(dictBiapplicative);
    var biapplyProduct21 = biapplyProduct2(dictBiapplicative.Biapply0());
    return function (dictBiapplicative1) {
        var bipure1 = Control_Biapplicative.bipure(dictBiapplicative1);
        var biapplyProduct22 = biapplyProduct21(dictBiapplicative1.Biapply0());
        return {
            bipure: function (a) {
                return function (b) {
                    return new Product2(bipure(a)(b), bipure1(a)(b));
                };
            },
            Biapply0: function () {
                return biapplyProduct22;
            }
        };
    };
};
export {
    Product2,
    eqProduct2,
    ordProduct2,
    showProduct2,
    functorProduct2,
    bifunctorProduct2,
    biapplyProduct2,
    biapplicativeProduct2,
    profunctorProduct2
};

import * as Control_Applicative from "../Control.Applicative/index.js";
import * as Control_Apply from "../Control.Apply/index.js";
import * as Control_Category from "../Control.Category/index.js";
import * as Data_Bifoldable from "../Data.Bifoldable/index.js";
import * as Data_Bifunctor from "../Data.Bifunctor/index.js";
import * as Data_Const from "../Data.Const/index.js";
import * as Data_Either from "../Data.Either/index.js";
import * as Data_Functor from "../Data.Functor/index.js";
import * as Data_Functor_Clown from "../Data.Functor.Clown/index.js";
import * as Data_Functor_Flip from "../Data.Functor.Flip/index.js";
import * as Data_Functor_Joker from "../Data.Functor.Joker/index.js";
import * as Data_Functor_Product2 from "../Data.Functor.Product2/index.js";
import * as Data_Traversable from "../Data.Traversable/index.js";
import * as Data_Tuple from "../Data.Tuple/index.js";
var identity = /* #__PURE__ */ Control_Category.identity(Control_Category.categoryFn);
var bitraverse = function (dict) {
    return dict.bitraverse;
};
var lfor = function (dictBitraversable) {
    var bitraverse1 = bitraverse(dictBitraversable);
    return function (dictApplicative) {
        var bitraverse2 = bitraverse1(dictApplicative);
        var pure = Control_Applicative.pure(dictApplicative);
        return function (t) {
            return function (f) {
                return bitraverse2(f)(pure)(t);
            };
        };
    };
};
var ltraverse = function (dictBitraversable) {
    var bitraverse1 = bitraverse(dictBitraversable);
    return function (dictApplicative) {
        var bitraverse2 = bitraverse1(dictApplicative);
        var pure = Control_Applicative.pure(dictApplicative);
        return function (f) {
            return bitraverse2(f)(pure);
        };
    };
};
var rfor = function (dictBitraversable) {
    var bitraverse1 = bitraverse(dictBitraversable);
    return function (dictApplicative) {
        var bitraverse2 = bitraverse1(dictApplicative);
        var pure = Control_Applicative.pure(dictApplicative);
        return function (t) {
            return function (f) {
                return bitraverse2(pure)(f)(t);
            };
        };
    };
};
var rtraverse = function (dictBitraversable) {
    var bitraverse1 = bitraverse(dictBitraversable);
    return function (dictApplicative) {
        return bitraverse1(dictApplicative)(Control_Applicative.pure(dictApplicative));
    };
};
var bitraversableTuple = {
    bitraverse: function (dictApplicative) {
        var Apply0 = dictApplicative.Apply0();
        var apply = Control_Apply.apply(Apply0);
        var map = Data_Functor.map(Apply0.Functor0());
        return function (f) {
            return function (g) {
                return function (v) {
                    return apply(map(Data_Tuple.Tuple.create)(f(v.value0)))(g(v.value1));
                };
            };
        };
    },
    bisequence: function (dictApplicative) {
        var Apply0 = dictApplicative.Apply0();
        var apply = Control_Apply.apply(Apply0);
        var map = Data_Functor.map(Apply0.Functor0());
        return function (v) {
            return apply(map(Data_Tuple.Tuple.create)(v.value0))(v.value1);
        };
    },
    Bifunctor0: function () {
        return Data_Bifunctor.bifunctorTuple;
    },
    Bifoldable1: function () {
        return Data_Bifoldable.bifoldableTuple;
    }
};
var bitraversableJoker = function (dictTraversable) {
    var traverse = Data_Traversable.traverse(dictTraversable);
    var sequence = Data_Traversable.sequence(dictTraversable);
    var bifunctorJoker = Data_Functor_Joker.bifunctorJoker(dictTraversable.Functor0());
    var bifoldableJoker = Data_Bifoldable.bifoldableJoker(dictTraversable.Foldable1());
    return {
        bitraverse: function (dictApplicative) {
            var map = Data_Functor.map((dictApplicative.Apply0()).Functor0());
            var traverse1 = traverse(dictApplicative);
            return function (v) {
                return function (r) {
                    return function (v1) {
                        return map(Data_Functor_Joker.Joker)(traverse1(r)(v1));
                    };
                };
            };
        },
        bisequence: function (dictApplicative) {
            var map = Data_Functor.map((dictApplicative.Apply0()).Functor0());
            var sequence1 = sequence(dictApplicative);
            return function (v) {
                return map(Data_Functor_Joker.Joker)(sequence1(v));
            };
        },
        Bifunctor0: function () {
            return bifunctorJoker;
        },
        Bifoldable1: function () {
            return bifoldableJoker;
        }
    };
};
var bitraversableEither = {
    bitraverse: function (dictApplicative) {
        var map = Data_Functor.map((dictApplicative.Apply0()).Functor0());
        return function (v) {
            return function (v1) {
                return function (v2) {
                    if (v2 instanceof Data_Either.Left) {
                        return map(Data_Either.Left.create)(v(v2.value0));
                    };
                    if (v2 instanceof Data_Either.Right) {
                        return map(Data_Either.Right.create)(v1(v2.value0));
                    };
                    throw new Error("Failed pattern match at Data.Bitraversable (line 57, column 1 - line 61, column 37): " + [ v.constructor.name, v1.constructor.name, v2.constructor.name ]);
                };
            };
        };
    },
    bisequence: function (dictApplicative) {
        var map = Data_Functor.map((dictApplicative.Apply0()).Functor0());
        return function (v) {
            if (v instanceof Data_Either.Left) {
                return map(Data_Either.Left.create)(v.value0);
            };
            if (v instanceof Data_Either.Right) {
                return map(Data_Either.Right.create)(v.value0);
            };
            throw new Error("Failed pattern match at Data.Bitraversable (line 57, column 1 - line 61, column 37): " + [ v.constructor.name ]);
        };
    },
    Bifunctor0: function () {
        return Data_Bifunctor.bifunctorEither;
    },
    Bifoldable1: function () {
        return Data_Bifoldable.bifoldableEither;
    }
};
var bitraversableConst = {
    bitraverse: function (dictApplicative) {
        var map = Data_Functor.map((dictApplicative.Apply0()).Functor0());
        return function (f) {
            return function (v) {
                return function (v1) {
                    return map(Data_Const.Const)(f(v1));
                };
            };
        };
    },
    bisequence: function (dictApplicative) {
        var map = Data_Functor.map((dictApplicative.Apply0()).Functor0());
        return function (v) {
            return map(Data_Const.Const)(v);
        };
    },
    Bifunctor0: function () {
        return Data_Bifunctor.bifunctorConst;
    },
    Bifoldable1: function () {
        return Data_Bifoldable.bifoldableConst;
    }
};
var bitraversableClown = function (dictTraversable) {
    var traverse = Data_Traversable.traverse(dictTraversable);
    var sequence = Data_Traversable.sequence(dictTraversable);
    var bifunctorClown = Data_Functor_Clown.bifunctorClown(dictTraversable.Functor0());
    var bifoldableClown = Data_Bifoldable.bifoldableClown(dictTraversable.Foldable1());
    return {
        bitraverse: function (dictApplicative) {
            var map = Data_Functor.map((dictApplicative.Apply0()).Functor0());
            var traverse1 = traverse(dictApplicative);
            return function (l) {
                return function (v) {
                    return function (v1) {
                        return map(Data_Functor_Clown.Clown)(traverse1(l)(v1));
                    };
                };
            };
        },
        bisequence: function (dictApplicative) {
            var map = Data_Functor.map((dictApplicative.Apply0()).Functor0());
            var sequence1 = sequence(dictApplicative);
            return function (v) {
                return map(Data_Functor_Clown.Clown)(sequence1(v));
            };
        },
        Bifunctor0: function () {
            return bifunctorClown;
        },
        Bifoldable1: function () {
            return bifoldableClown;
        }
    };
};

// | A default implementation of `bisequence` using `bitraverse`.
var bisequenceDefault = function (dictBitraversable) {
    var bitraverse1 = bitraverse(dictBitraversable);
    return function (dictApplicative) {
        return bitraverse1(dictApplicative)(identity)(identity);
    };
};
var bisequence = function (dict) {
    return dict.bisequence;
};
var bitraversableFlip = function (dictBitraversable) {
    var bitraverse1 = bitraverse(dictBitraversable);
    var bisequence1 = bisequence(dictBitraversable);
    var bifunctorFlip = Data_Functor_Flip.bifunctorFlip(dictBitraversable.Bifunctor0());
    var bifoldableFlip = Data_Bifoldable.bifoldableFlip(dictBitraversable.Bifoldable1());
    return {
        bitraverse: function (dictApplicative) {
            var map = Data_Functor.map((dictApplicative.Apply0()).Functor0());
            var bitraverse2 = bitraverse1(dictApplicative);
            return function (r) {
                return function (l) {
                    return function (v) {
                        return map(Data_Functor_Flip.Flip)(bitraverse2(l)(r)(v));
                    };
                };
            };
        },
        bisequence: function (dictApplicative) {
            var map = Data_Functor.map((dictApplicative.Apply0()).Functor0());
            var bisequence2 = bisequence1(dictApplicative);
            return function (v) {
                return map(Data_Functor_Flip.Flip)(bisequence2(v));
            };
        },
        Bifunctor0: function () {
            return bifunctorFlip;
        },
        Bifoldable1: function () {
            return bifoldableFlip;
        }
    };
};
var bitraversableProduct2 = function (dictBitraversable) {
    var bitraverse1 = bitraverse(dictBitraversable);
    var bisequence1 = bisequence(dictBitraversable);
    var bifunctorProduct2 = Data_Functor_Product2.bifunctorProduct2(dictBitraversable.Bifunctor0());
    var bifoldableProduct2 = Data_Bifoldable.bifoldableProduct2(dictBitraversable.Bifoldable1());
    return function (dictBitraversable1) {
        var bitraverse2 = bitraverse(dictBitraversable1);
        var bisequence2 = bisequence(dictBitraversable1);
        var bifunctorProduct21 = bifunctorProduct2(dictBitraversable1.Bifunctor0());
        var bifoldableProduct21 = bifoldableProduct2(dictBitraversable1.Bifoldable1());
        return {
            bitraverse: function (dictApplicative) {
                var Apply0 = dictApplicative.Apply0();
                var apply = Control_Apply.apply(Apply0);
                var map = Data_Functor.map(Apply0.Functor0());
                var bitraverse3 = bitraverse1(dictApplicative);
                var bitraverse4 = bitraverse2(dictApplicative);
                return function (l) {
                    return function (r) {
                        return function (v) {
                            return apply(map(Data_Functor_Product2.Product2.create)(bitraverse3(l)(r)(v.value0)))(bitraverse4(l)(r)(v.value1));
                        };
                    };
                };
            },
            bisequence: function (dictApplicative) {
                var Apply0 = dictApplicative.Apply0();
                var apply = Control_Apply.apply(Apply0);
                var map = Data_Functor.map(Apply0.Functor0());
                var bisequence3 = bisequence1(dictApplicative);
                var bisequence4 = bisequence2(dictApplicative);
                return function (v) {
                    return apply(map(Data_Functor_Product2.Product2.create)(bisequence3(v.value0)))(bisequence4(v.value1));
                };
            },
            Bifunctor0: function () {
                return bifunctorProduct21;
            },
            Bifoldable1: function () {
                return bifoldableProduct21;
            }
        };
    };
};

// | A default implementation of `bitraverse` using `bisequence` and `bimap`.
var bitraverseDefault = function (dictBitraversable) {
    var bisequence1 = bisequence(dictBitraversable);
    var bimap = Data_Bifunctor.bimap(dictBitraversable.Bifunctor0());
    return function (dictApplicative) {
        var bisequence2 = bisequence1(dictApplicative);
        return function (f) {
            return function (g) {
                return function (t) {
                    return bisequence2(bimap(f)(g)(t));
                };
            };
        };
    };
};

// | Traverse a data structure, accumulating effects and results using an `Applicative` functor.
var bifor = function (dictBitraversable) {
    var bitraverse1 = bitraverse(dictBitraversable);
    return function (dictApplicative) {
        var bitraverse2 = bitraverse1(dictApplicative);
        return function (t) {
            return function (f) {
                return function (g) {
                    return bitraverse2(f)(g)(t);
                };
            };
        };
    };
};
export {
    bitraverse,
    bisequence,
    bitraverseDefault,
    bisequenceDefault,
    ltraverse,
    rtraverse,
    bifor,
    lfor,
    rfor,
    bitraversableClown,
    bitraversableJoker,
    bitraversableFlip,
    bitraversableProduct2,
    bitraversableEither,
    bitraversableTuple,
    bitraversableConst
};
export {
    biall,
    biany,
    bifold,
    bifoldMap,
    bifoldMapDefaultL,
    bifoldMapDefaultR,
    bifoldl,
    bifoldlDefault,
    bifoldr,
    bifoldrDefault,
    bifor_,
    bisequence_,
    bitraverse_
} from "../Data.Bifoldable/index.js";

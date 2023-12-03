import * as Control_Applicative from "../Control.Applicative/index.js";
import * as Control_Apply from "../Control.Apply/index.js";
import * as Control_Bind from "../Control.Bind/index.js";
import * as Control_Category from "../Control.Category/index.js";
import * as Data_Either from "../Data.Either/index.js";
import * as Data_Foldable from "../Data.Foldable/index.js";
import * as Data_Function from "../Data.Function/index.js";
import * as Data_Functor_Coproduct from "../Data.Functor.Coproduct/index.js";
import * as Data_FunctorWithIndex from "../Data.FunctorWithIndex/index.js";
import * as Data_Maybe from "../Data.Maybe/index.js";
import * as Data_Monoid from "../Data.Monoid/index.js";
import * as Data_Monoid_Conj from "../Data.Monoid.Conj/index.js";
import * as Data_Monoid_Disj from "../Data.Monoid.Disj/index.js";
import * as Data_Monoid_Dual from "../Data.Monoid.Dual/index.js";
import * as Data_Monoid_Endo from "../Data.Monoid.Endo/index.js";
import * as Data_Newtype from "../Data.Newtype/index.js";
import * as Data_Semigroup from "../Data.Semigroup/index.js";
import * as Data_Tuple from "../Data.Tuple/index.js";
import * as Data_Unit from "../Data.Unit/index.js";
var foldr = /* #__PURE__ */ Data_Foldable.foldr(Data_Foldable.foldableMultiplicative);
var foldl = /* #__PURE__ */ Data_Foldable.foldl(Data_Foldable.foldableMultiplicative);
var foldMap = /* #__PURE__ */ Data_Foldable.foldMap(Data_Foldable.foldableMultiplicative);
var foldr1 = /* #__PURE__ */ Data_Foldable.foldr(Data_Foldable.foldableMaybe);
var foldl1 = /* #__PURE__ */ Data_Foldable.foldl(Data_Foldable.foldableMaybe);
var foldMap1 = /* #__PURE__ */ Data_Foldable.foldMap(Data_Foldable.foldableMaybe);
var foldr2 = /* #__PURE__ */ Data_Foldable.foldr(Data_Foldable.foldableLast);
var foldl2 = /* #__PURE__ */ Data_Foldable.foldl(Data_Foldable.foldableLast);
var foldMap2 = /* #__PURE__ */ Data_Foldable.foldMap(Data_Foldable.foldableLast);
var foldr3 = /* #__PURE__ */ Data_Foldable.foldr(Data_Foldable.foldableFirst);
var foldl3 = /* #__PURE__ */ Data_Foldable.foldl(Data_Foldable.foldableFirst);
var foldMap3 = /* #__PURE__ */ Data_Foldable.foldMap(Data_Foldable.foldableFirst);
var foldr4 = /* #__PURE__ */ Data_Foldable.foldr(Data_Foldable.foldableDual);
var foldl4 = /* #__PURE__ */ Data_Foldable.foldl(Data_Foldable.foldableDual);
var foldMap4 = /* #__PURE__ */ Data_Foldable.foldMap(Data_Foldable.foldableDual);
var foldr5 = /* #__PURE__ */ Data_Foldable.foldr(Data_Foldable.foldableDisj);
var foldl5 = /* #__PURE__ */ Data_Foldable.foldl(Data_Foldable.foldableDisj);
var foldMap5 = /* #__PURE__ */ Data_Foldable.foldMap(Data_Foldable.foldableDisj);
var foldr6 = /* #__PURE__ */ Data_Foldable.foldr(Data_Foldable.foldableConj);
var foldl6 = /* #__PURE__ */ Data_Foldable.foldl(Data_Foldable.foldableConj);
var foldMap6 = /* #__PURE__ */ Data_Foldable.foldMap(Data_Foldable.foldableConj);
var foldr7 = /* #__PURE__ */ Data_Foldable.foldr(Data_Foldable.foldableAdditive);
var foldl7 = /* #__PURE__ */ Data_Foldable.foldl(Data_Foldable.foldableAdditive);
var foldMap7 = /* #__PURE__ */ Data_Foldable.foldMap(Data_Foldable.foldableAdditive);
var foldr8 = /* #__PURE__ */ Data_Foldable.foldr(Data_Foldable.foldableArray);
var mapWithIndex = /* #__PURE__ */ Data_FunctorWithIndex.mapWithIndex(Data_FunctorWithIndex.functorWithIndexArray);
var foldl8 = /* #__PURE__ */ Data_Foldable.foldl(Data_Foldable.foldableArray);
var unwrap = /* #__PURE__ */ Data_Newtype.unwrap();
var monoidEndo = /* #__PURE__ */ Data_Monoid_Endo.monoidEndo(Control_Category.categoryFn);
var monoidDual = /* #__PURE__ */ Data_Monoid_Dual.monoidDual(monoidEndo);
var foldrWithIndex = function (dict) {
    return dict.foldrWithIndex;
};

// | Traverse a data structure with access to the index, performing some
// | effects encoded by an `Applicative` functor at each value, ignoring the
// | final result.
// |
// | For example:
// |
// | ```purescript
// | > traverseWithIndex_ (curry logShow) ["a", "b", "c"]
// | (Tuple 0 "a")
// | (Tuple 1 "b")
// | (Tuple 2 "c")
// | ```
var traverseWithIndex_ = function (dictApplicative) {
    var applySecond = Control_Apply.applySecond(dictApplicative.Apply0());
    var pure = Control_Applicative.pure(dictApplicative);
    return function (dictFoldableWithIndex) {
        var foldrWithIndex1 = foldrWithIndex(dictFoldableWithIndex);
        return function (f) {
            return foldrWithIndex1(function (i) {
                var $289 = f(i);
                return function ($290) {
                    return applySecond($289($290));
                };
            })(pure(Data_Unit.unit));
        };
    };
};

// | A version of `traverseWithIndex_` with its arguments flipped.
// |
// | This can be useful when running an action written using do notation
// | for every element in a data structure:
// |
// | For example:
// |
// | ```purescript
// | forWithIndex_ ["a", "b", "c"] \i x -> do
// |   logShow i
// |   log x
// | ```
var forWithIndex_ = function (dictApplicative) {
    var traverseWithIndex_1 = traverseWithIndex_(dictApplicative);
    return function (dictFoldableWithIndex) {
        return Data_Function.flip(traverseWithIndex_1(dictFoldableWithIndex));
    };
};

// | A default implementation of `foldr` using `foldrWithIndex`
var foldrDefault = function (dictFoldableWithIndex) {
    var foldrWithIndex1 = foldrWithIndex(dictFoldableWithIndex);
    return function (f) {
        return foldrWithIndex1(Data_Function["const"](f));
    };
};
var foldlWithIndex = function (dict) {
    return dict.foldlWithIndex;
};

// | A default implementation of `foldl` using `foldlWithIndex`
var foldlDefault = function (dictFoldableWithIndex) {
    var foldlWithIndex1 = foldlWithIndex(dictFoldableWithIndex);
    return function (f) {
        return foldlWithIndex1(Data_Function["const"](f));
    };
};
var foldableWithIndexTuple = {
    foldrWithIndex: function (f) {
        return function (z) {
            return function (v) {
                return f(Data_Unit.unit)(v.value1)(z);
            };
        };
    },
    foldlWithIndex: function (f) {
        return function (z) {
            return function (v) {
                return f(Data_Unit.unit)(z)(v.value1);
            };
        };
    },
    foldMapWithIndex: function (dictMonoid) {
        return function (f) {
            return function (v) {
                return f(Data_Unit.unit)(v.value1);
            };
        };
    },
    Foldable0: function () {
        return Data_Foldable.foldableTuple;
    }
};
var foldableWithIndexMultiplicative = {
    foldrWithIndex: function (f) {
        return foldr(f(Data_Unit.unit));
    },
    foldlWithIndex: function (f) {
        return foldl(f(Data_Unit.unit));
    },
    foldMapWithIndex: function (dictMonoid) {
        var foldMap8 = foldMap(dictMonoid);
        return function (f) {
            return foldMap8(f(Data_Unit.unit));
        };
    },
    Foldable0: function () {
        return Data_Foldable.foldableMultiplicative;
    }
};
var foldableWithIndexMaybe = {
    foldrWithIndex: function (f) {
        return foldr1(f(Data_Unit.unit));
    },
    foldlWithIndex: function (f) {
        return foldl1(f(Data_Unit.unit));
    },
    foldMapWithIndex: function (dictMonoid) {
        var foldMap8 = foldMap1(dictMonoid);
        return function (f) {
            return foldMap8(f(Data_Unit.unit));
        };
    },
    Foldable0: function () {
        return Data_Foldable.foldableMaybe;
    }
};
var foldableWithIndexLast = {
    foldrWithIndex: function (f) {
        return foldr2(f(Data_Unit.unit));
    },
    foldlWithIndex: function (f) {
        return foldl2(f(Data_Unit.unit));
    },
    foldMapWithIndex: function (dictMonoid) {
        var foldMap8 = foldMap2(dictMonoid);
        return function (f) {
            return foldMap8(f(Data_Unit.unit));
        };
    },
    Foldable0: function () {
        return Data_Foldable.foldableLast;
    }
};
var foldableWithIndexIdentity = {
    foldrWithIndex: function (f) {
        return function (z) {
            return function (v) {
                return f(Data_Unit.unit)(v)(z);
            };
        };
    },
    foldlWithIndex: function (f) {
        return function (z) {
            return function (v) {
                return f(Data_Unit.unit)(z)(v);
            };
        };
    },
    foldMapWithIndex: function (dictMonoid) {
        return function (f) {
            return function (v) {
                return f(Data_Unit.unit)(v);
            };
        };
    },
    Foldable0: function () {
        return Data_Foldable.foldableIdentity;
    }
};
var foldableWithIndexFirst = {
    foldrWithIndex: function (f) {
        return foldr3(f(Data_Unit.unit));
    },
    foldlWithIndex: function (f) {
        return foldl3(f(Data_Unit.unit));
    },
    foldMapWithIndex: function (dictMonoid) {
        var foldMap8 = foldMap3(dictMonoid);
        return function (f) {
            return foldMap8(f(Data_Unit.unit));
        };
    },
    Foldable0: function () {
        return Data_Foldable.foldableFirst;
    }
};
var foldableWithIndexEither = {
    foldrWithIndex: function (v) {
        return function (v1) {
            return function (v2) {
                if (v2 instanceof Data_Either.Left) {
                    return v1;
                };
                if (v2 instanceof Data_Either.Right) {
                    return v(Data_Unit.unit)(v2.value0)(v1);
                };
                throw new Error("Failed pattern match at Data.FoldableWithIndex (line 164, column 1 - line 170, column 42): " + [ v.constructor.name, v1.constructor.name, v2.constructor.name ]);
            };
        };
    },
    foldlWithIndex: function (v) {
        return function (v1) {
            return function (v2) {
                if (v2 instanceof Data_Either.Left) {
                    return v1;
                };
                if (v2 instanceof Data_Either.Right) {
                    return v(Data_Unit.unit)(v1)(v2.value0);
                };
                throw new Error("Failed pattern match at Data.FoldableWithIndex (line 164, column 1 - line 170, column 42): " + [ v.constructor.name, v1.constructor.name, v2.constructor.name ]);
            };
        };
    },
    foldMapWithIndex: function (dictMonoid) {
        var mempty = Data_Monoid.mempty(dictMonoid);
        return function (v) {
            return function (v1) {
                if (v1 instanceof Data_Either.Left) {
                    return mempty;
                };
                if (v1 instanceof Data_Either.Right) {
                    return v(Data_Unit.unit)(v1.value0);
                };
                throw new Error("Failed pattern match at Data.FoldableWithIndex (line 164, column 1 - line 170, column 42): " + [ v.constructor.name, v1.constructor.name ]);
            };
        };
    },
    Foldable0: function () {
        return Data_Foldable.foldableEither;
    }
};
var foldableWithIndexDual = {
    foldrWithIndex: function (f) {
        return foldr4(f(Data_Unit.unit));
    },
    foldlWithIndex: function (f) {
        return foldl4(f(Data_Unit.unit));
    },
    foldMapWithIndex: function (dictMonoid) {
        var foldMap8 = foldMap4(dictMonoid);
        return function (f) {
            return foldMap8(f(Data_Unit.unit));
        };
    },
    Foldable0: function () {
        return Data_Foldable.foldableDual;
    }
};
var foldableWithIndexDisj = {
    foldrWithIndex: function (f) {
        return foldr5(f(Data_Unit.unit));
    },
    foldlWithIndex: function (f) {
        return foldl5(f(Data_Unit.unit));
    },
    foldMapWithIndex: function (dictMonoid) {
        var foldMap8 = foldMap5(dictMonoid);
        return function (f) {
            return foldMap8(f(Data_Unit.unit));
        };
    },
    Foldable0: function () {
        return Data_Foldable.foldableDisj;
    }
};
var foldableWithIndexConst = {
    foldrWithIndex: function (v) {
        return function (z) {
            return function (v1) {
                return z;
            };
        };
    },
    foldlWithIndex: function (v) {
        return function (z) {
            return function (v1) {
                return z;
            };
        };
    },
    foldMapWithIndex: function (dictMonoid) {
        var mempty = Data_Monoid.mempty(dictMonoid);
        return function (v) {
            return function (v1) {
                return mempty;
            };
        };
    },
    Foldable0: function () {
        return Data_Foldable.foldableConst;
    }
};
var foldableWithIndexConj = {
    foldrWithIndex: function (f) {
        return foldr6(f(Data_Unit.unit));
    },
    foldlWithIndex: function (f) {
        return foldl6(f(Data_Unit.unit));
    },
    foldMapWithIndex: function (dictMonoid) {
        var foldMap8 = foldMap6(dictMonoid);
        return function (f) {
            return foldMap8(f(Data_Unit.unit));
        };
    },
    Foldable0: function () {
        return Data_Foldable.foldableConj;
    }
};
var foldableWithIndexAdditive = {
    foldrWithIndex: function (f) {
        return foldr7(f(Data_Unit.unit));
    },
    foldlWithIndex: function (f) {
        return foldl7(f(Data_Unit.unit));
    },
    foldMapWithIndex: function (dictMonoid) {
        var foldMap8 = foldMap7(dictMonoid);
        return function (f) {
            return foldMap8(f(Data_Unit.unit));
        };
    },
    Foldable0: function () {
        return Data_Foldable.foldableAdditive;
    }
};

// | Similar to 'foldlWithIndex', but the result is encapsulated in a monad.
// |
// | Note: this function is not generally stack-safe, e.g., for monads which
// | build up thunks a la `Eff`.
var foldWithIndexM = function (dictFoldableWithIndex) {
    var foldlWithIndex1 = foldlWithIndex(dictFoldableWithIndex);
    return function (dictMonad) {
        var bind = Control_Bind.bind(dictMonad.Bind1());
        var pure = Control_Applicative.pure(dictMonad.Applicative0());
        return function (f) {
            return function (a0) {
                return foldlWithIndex1(function (i) {
                    return function (ma) {
                        return function (b) {
                            return bind(ma)(Data_Function.flip(f(i))(b));
                        };
                    };
                })(pure(a0));
            };
        };
    };
};

// | A default implementation of `foldMapWithIndex` using `foldrWithIndex`.
// |
// | Note: when defining a `FoldableWithIndex` instance, this function is
// | unsafe to use in combination with `foldrWithIndexDefault`.
var foldMapWithIndexDefaultR = function (dictFoldableWithIndex) {
    var foldrWithIndex1 = foldrWithIndex(dictFoldableWithIndex);
    return function (dictMonoid) {
        var append = Data_Semigroup.append(dictMonoid.Semigroup0());
        var mempty = Data_Monoid.mempty(dictMonoid);
        return function (f) {
            return foldrWithIndex1(function (i) {
                return function (x) {
                    return function (acc) {
                        return append(f(i)(x))(acc);
                    };
                };
            })(mempty);
        };
    };
};
var foldableWithIndexArray = {
    foldrWithIndex: function (f) {
        return function (z) {
            var $291 = foldr8(function (v) {
                return function (y) {
                    return f(v.value0)(v.value1)(y);
                };
            })(z);
            var $292 = mapWithIndex(Data_Tuple.Tuple.create);
            return function ($293) {
                return $291($292($293));
            };
        };
    },
    foldlWithIndex: function (f) {
        return function (z) {
            var $294 = foldl8(function (y) {
                return function (v) {
                    return f(v.value0)(y)(v.value1);
                };
            })(z);
            var $295 = mapWithIndex(Data_Tuple.Tuple.create);
            return function ($296) {
                return $294($295($296));
            };
        };
    },
    foldMapWithIndex: function (dictMonoid) {
        return foldMapWithIndexDefaultR(foldableWithIndexArray)(dictMonoid);
    },
    Foldable0: function () {
        return Data_Foldable.foldableArray;
    }
};

// | A default implementation of `foldMapWithIndex` using `foldlWithIndex`.
// |
// | Note: when defining a `FoldableWithIndex` instance, this function is
// | unsafe to use in combination with `foldlWithIndexDefault`.
var foldMapWithIndexDefaultL = function (dictFoldableWithIndex) {
    var foldlWithIndex1 = foldlWithIndex(dictFoldableWithIndex);
    return function (dictMonoid) {
        var append = Data_Semigroup.append(dictMonoid.Semigroup0());
        var mempty = Data_Monoid.mempty(dictMonoid);
        return function (f) {
            return foldlWithIndex1(function (i) {
                return function (acc) {
                    return function (x) {
                        return append(acc)(f(i)(x));
                    };
                };
            })(mempty);
        };
    };
};
var foldMapWithIndex = function (dict) {
    return dict.foldMapWithIndex;
};
var foldableWithIndexApp = function (dictFoldableWithIndex) {
    var foldrWithIndex1 = foldrWithIndex(dictFoldableWithIndex);
    var foldlWithIndex1 = foldlWithIndex(dictFoldableWithIndex);
    var foldMapWithIndex1 = foldMapWithIndex(dictFoldableWithIndex);
    var foldableApp = Data_Foldable.foldableApp(dictFoldableWithIndex.Foldable0());
    return {
        foldrWithIndex: function (f) {
            return function (z) {
                return function (v) {
                    return foldrWithIndex1(f)(z)(v);
                };
            };
        },
        foldlWithIndex: function (f) {
            return function (z) {
                return function (v) {
                    return foldlWithIndex1(f)(z)(v);
                };
            };
        },
        foldMapWithIndex: function (dictMonoid) {
            var foldMapWithIndex2 = foldMapWithIndex1(dictMonoid);
            return function (f) {
                return function (v) {
                    return foldMapWithIndex2(f)(v);
                };
            };
        },
        Foldable0: function () {
            return foldableApp;
        }
    };
};
var foldableWithIndexCompose = function (dictFoldableWithIndex) {
    var foldrWithIndex1 = foldrWithIndex(dictFoldableWithIndex);
    var foldlWithIndex1 = foldlWithIndex(dictFoldableWithIndex);
    var foldMapWithIndex1 = foldMapWithIndex(dictFoldableWithIndex);
    var foldableCompose = Data_Foldable.foldableCompose(dictFoldableWithIndex.Foldable0());
    return function (dictFoldableWithIndex1) {
        var foldrWithIndex2 = foldrWithIndex(dictFoldableWithIndex1);
        var foldlWithIndex2 = foldlWithIndex(dictFoldableWithIndex1);
        var foldMapWithIndex2 = foldMapWithIndex(dictFoldableWithIndex1);
        var foldableCompose1 = foldableCompose(dictFoldableWithIndex1.Foldable0());
        return {
            foldrWithIndex: function (f) {
                return function (i) {
                    return function (v) {
                        return foldrWithIndex1(function (a) {
                            return Data_Function.flip(foldrWithIndex2(Data_Tuple.curry(f)(a)));
                        })(i)(v);
                    };
                };
            },
            foldlWithIndex: function (f) {
                return function (i) {
                    return function (v) {
                        return foldlWithIndex1((function () {
                            var $297 = Data_Tuple.curry(f);
                            return function ($298) {
                                return foldlWithIndex2($297($298));
                            };
                        })())(i)(v);
                    };
                };
            },
            foldMapWithIndex: function (dictMonoid) {
                var foldMapWithIndex3 = foldMapWithIndex1(dictMonoid);
                var foldMapWithIndex4 = foldMapWithIndex2(dictMonoid);
                return function (f) {
                    return function (v) {
                        return foldMapWithIndex3((function () {
                            var $299 = Data_Tuple.curry(f);
                            return function ($300) {
                                return foldMapWithIndex4($299($300));
                            };
                        })())(v);
                    };
                };
            },
            Foldable0: function () {
                return foldableCompose1;
            }
        };
    };
};
var foldableWithIndexCoproduct = function (dictFoldableWithIndex) {
    var foldrWithIndex1 = foldrWithIndex(dictFoldableWithIndex);
    var foldlWithIndex1 = foldlWithIndex(dictFoldableWithIndex);
    var foldMapWithIndex1 = foldMapWithIndex(dictFoldableWithIndex);
    var foldableCoproduct = Data_Foldable.foldableCoproduct(dictFoldableWithIndex.Foldable0());
    return function (dictFoldableWithIndex1) {
        var foldrWithIndex2 = foldrWithIndex(dictFoldableWithIndex1);
        var foldlWithIndex2 = foldlWithIndex(dictFoldableWithIndex1);
        var foldMapWithIndex2 = foldMapWithIndex(dictFoldableWithIndex1);
        var foldableCoproduct1 = foldableCoproduct(dictFoldableWithIndex1.Foldable0());
        return {
            foldrWithIndex: function (f) {
                return function (z) {
                    return Data_Functor_Coproduct.coproduct(foldrWithIndex1(function ($301) {
                        return f(Data_Either.Left.create($301));
                    })(z))(foldrWithIndex2(function ($302) {
                        return f(Data_Either.Right.create($302));
                    })(z));
                };
            },
            foldlWithIndex: function (f) {
                return function (z) {
                    return Data_Functor_Coproduct.coproduct(foldlWithIndex1(function ($303) {
                        return f(Data_Either.Left.create($303));
                    })(z))(foldlWithIndex2(function ($304) {
                        return f(Data_Either.Right.create($304));
                    })(z));
                };
            },
            foldMapWithIndex: function (dictMonoid) {
                var foldMapWithIndex3 = foldMapWithIndex1(dictMonoid);
                var foldMapWithIndex4 = foldMapWithIndex2(dictMonoid);
                return function (f) {
                    return Data_Functor_Coproduct.coproduct(foldMapWithIndex3(function ($305) {
                        return f(Data_Either.Left.create($305));
                    }))(foldMapWithIndex4(function ($306) {
                        return f(Data_Either.Right.create($306));
                    }));
                };
            },
            Foldable0: function () {
                return foldableCoproduct1;
            }
        };
    };
};
var foldableWithIndexProduct = function (dictFoldableWithIndex) {
    var foldrWithIndex1 = foldrWithIndex(dictFoldableWithIndex);
    var foldlWithIndex1 = foldlWithIndex(dictFoldableWithIndex);
    var foldMapWithIndex1 = foldMapWithIndex(dictFoldableWithIndex);
    var foldableProduct = Data_Foldable.foldableProduct(dictFoldableWithIndex.Foldable0());
    return function (dictFoldableWithIndex1) {
        var foldrWithIndex2 = foldrWithIndex(dictFoldableWithIndex1);
        var foldlWithIndex2 = foldlWithIndex(dictFoldableWithIndex1);
        var foldMapWithIndex2 = foldMapWithIndex(dictFoldableWithIndex1);
        var foldableProduct1 = foldableProduct(dictFoldableWithIndex1.Foldable0());
        return {
            foldrWithIndex: function (f) {
                return function (z) {
                    return function (v) {
                        return foldrWithIndex1(function ($307) {
                            return f(Data_Either.Left.create($307));
                        })(foldrWithIndex2(function ($308) {
                            return f(Data_Either.Right.create($308));
                        })(z)(v.value1))(v.value0);
                    };
                };
            },
            foldlWithIndex: function (f) {
                return function (z) {
                    return function (v) {
                        return foldlWithIndex2(function ($309) {
                            return f(Data_Either.Right.create($309));
                        })(foldlWithIndex1(function ($310) {
                            return f(Data_Either.Left.create($310));
                        })(z)(v.value0))(v.value1);
                    };
                };
            },
            foldMapWithIndex: function (dictMonoid) {
                var append = Data_Semigroup.append(dictMonoid.Semigroup0());
                var foldMapWithIndex3 = foldMapWithIndex1(dictMonoid);
                var foldMapWithIndex4 = foldMapWithIndex2(dictMonoid);
                return function (f) {
                    return function (v) {
                        return append(foldMapWithIndex3(function ($311) {
                            return f(Data_Either.Left.create($311));
                        })(v.value0))(foldMapWithIndex4(function ($312) {
                            return f(Data_Either.Right.create($312));
                        })(v.value1));
                    };
                };
            },
            Foldable0: function () {
                return foldableProduct1;
            }
        };
    };
};

// | A default implementation of `foldlWithIndex` using `foldMapWithIndex`.
// |
// | Note: when defining a `FoldableWithIndex` instance, this function is
// | unsafe to use in combination with `foldMapWithIndexDefaultL`.
var foldlWithIndexDefault = function (dictFoldableWithIndex) {
    var foldMapWithIndex1 = foldMapWithIndex(dictFoldableWithIndex)(monoidDual);
    return function (c) {
        return function (u) {
            return function (xs) {
                return unwrap(unwrap(foldMapWithIndex1(function (i) {
                    var $313 = Data_Function.flip(c(i));
                    return function ($314) {
                        return Data_Monoid_Dual.Dual(Data_Monoid_Endo.Endo($313($314)));
                    };
                })(xs)))(u);
            };
        };
    };
};

// | A default implementation of `foldrWithIndex` using `foldMapWithIndex`.
// |
// | Note: when defining a `FoldableWithIndex` instance, this function is
// | unsafe to use in combination with `foldMapWithIndexDefaultR`.
var foldrWithIndexDefault = function (dictFoldableWithIndex) {
    var foldMapWithIndex1 = foldMapWithIndex(dictFoldableWithIndex)(monoidEndo);
    return function (c) {
        return function (u) {
            return function (xs) {
                return unwrap(foldMapWithIndex1(function (i) {
                    var $315 = c(i);
                    return function ($316) {
                        return Data_Monoid_Endo.Endo($315($316));
                    };
                })(xs))(u);
            };
        };
    };
};

// | `foldMapWithIndex` but with each element surrounded by some fixed value.
// |
// | For example:
// |
// | ```purescript
// | > surroundMapWithIndex "*" (\i x -> show i <> x) []
// | = "*"
// |
// | > surroundMapWithIndex "*" (\i x -> show i <> x) ["a"]
// | = "*0a*"
// |
// | > surroundMapWithIndex "*" (\i x -> show i <> x) ["a", "b"]
// | = "*0a*1b*"
// |
// | > surroundMapWithIndex "*" (\i x -> show i <> x) ["a", "b", "c"]
// | = "*0a*1b*2c*"
// | ```
var surroundMapWithIndex = function (dictFoldableWithIndex) {
    var foldMapWithIndex1 = foldMapWithIndex(dictFoldableWithIndex)(monoidEndo);
    return function (dictSemigroup) {
        var append = Data_Semigroup.append(dictSemigroup);
        return function (d) {
            return function (t) {
                return function (f) {
                    var joined = function (i) {
                        return function (a) {
                            return function (m) {
                                return append(d)(append(t(i)(a))(m));
                            };
                        };
                    };
                    return unwrap(foldMapWithIndex1(joined)(f))(d);
                };
            };
        };
    };
};

// | A default implementation of `foldMap` using `foldMapWithIndex`
var foldMapDefault = function (dictFoldableWithIndex) {
    var foldMapWithIndex1 = foldMapWithIndex(dictFoldableWithIndex);
    return function (dictMonoid) {
        var foldMapWithIndex2 = foldMapWithIndex1(dictMonoid);
        return function (f) {
            return foldMapWithIndex2(Data_Function["const"](f));
        };
    };
};

// | Try to find an element in a data structure which satisfies a predicate
// | with access to the index.
var findWithIndex = function (dictFoldableWithIndex) {
    var foldlWithIndex1 = foldlWithIndex(dictFoldableWithIndex);
    return function (p) {
        var go = function (v) {
            return function (v1) {
                return function (v2) {
                    if (v1 instanceof Data_Maybe.Nothing && p(v)(v2)) {
                        return new Data_Maybe.Just({
                            index: v,
                            value: v2
                        });
                    };
                    return v1;
                };
            };
        };
        return foldlWithIndex1(go)(Data_Maybe.Nothing.value);
    };
};

// | Try to find an element in a data structure which satisfies a predicate mapping
// | with access to the index.
var findMapWithIndex = function (dictFoldableWithIndex) {
    var foldlWithIndex1 = foldlWithIndex(dictFoldableWithIndex);
    return function (f) {
        var go = function (v) {
            return function (v1) {
                return function (v2) {
                    if (v1 instanceof Data_Maybe.Nothing) {
                        return f(v)(v2);
                    };
                    return v1;
                };
            };
        };
        return foldlWithIndex1(go)(Data_Maybe.Nothing.value);
    };
};

// | `anyWithIndex f` is the same as `or <<< mapWithIndex f`; map a function over the
// | structure, and then get the disjunction of the results.
var anyWithIndex = function (dictFoldableWithIndex) {
    var foldMapWithIndex1 = foldMapWithIndex(dictFoldableWithIndex);
    return function (dictHeytingAlgebra) {
        var foldMapWithIndex2 = foldMapWithIndex1(Data_Monoid_Disj.monoidDisj(dictHeytingAlgebra));
        return function (t) {
            var $317 = foldMapWithIndex2(function (i) {
                var $319 = t(i);
                return function ($320) {
                    return Data_Monoid_Disj.Disj($319($320));
                };
            });
            return function ($318) {
                return unwrap($317($318));
            };
        };
    };
};

// | `allWithIndex f` is the same as `and <<< mapWithIndex f`; map a function over the
// | structure, and then get the conjunction of the results.
var allWithIndex = function (dictFoldableWithIndex) {
    var foldMapWithIndex1 = foldMapWithIndex(dictFoldableWithIndex);
    return function (dictHeytingAlgebra) {
        var foldMapWithIndex2 = foldMapWithIndex1(Data_Monoid_Conj.monoidConj(dictHeytingAlgebra));
        return function (t) {
            var $321 = foldMapWithIndex2(function (i) {
                var $323 = t(i);
                return function ($324) {
                    return Data_Monoid_Conj.Conj($323($324));
                };
            });
            return function ($322) {
                return unwrap($321($322));
            };
        };
    };
};
export {
    foldrWithIndex,
    foldlWithIndex,
    foldMapWithIndex,
    foldrWithIndexDefault,
    foldlWithIndexDefault,
    foldMapWithIndexDefaultR,
    foldMapWithIndexDefaultL,
    foldWithIndexM,
    traverseWithIndex_,
    forWithIndex_,
    surroundMapWithIndex,
    allWithIndex,
    anyWithIndex,
    findWithIndex,
    findMapWithIndex,
    foldrDefault,
    foldlDefault,
    foldMapDefault,
    foldableWithIndexArray,
    foldableWithIndexMaybe,
    foldableWithIndexFirst,
    foldableWithIndexLast,
    foldableWithIndexAdditive,
    foldableWithIndexDual,
    foldableWithIndexDisj,
    foldableWithIndexConj,
    foldableWithIndexMultiplicative,
    foldableWithIndexEither,
    foldableWithIndexTuple,
    foldableWithIndexIdentity,
    foldableWithIndexConst,
    foldableWithIndexProduct,
    foldableWithIndexCoproduct,
    foldableWithIndexCompose,
    foldableWithIndexApp
};

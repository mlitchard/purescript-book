// | The _cofree comonad_ for a `Functor`.
import * as Control_Alt from "../Control.Alt/index.js";
import * as Control_Applicative from "../Control.Applicative/index.js";
import * as Control_Apply from "../Control.Apply/index.js";
import * as Control_Category from "../Control.Category/index.js";
import * as Control_Comonad from "../Control.Comonad/index.js";
import * as Control_Monad from "../Control.Monad/index.js";
import * as Control_Monad_Free from "../Control.Monad.Free/index.js";
import * as Control_Monad_Rec_Class from "../Control.Monad.Rec.Class/index.js";
import * as Control_Monad_State from "../Control.Monad.State/index.js";
import * as Control_Monad_State_Class from "../Control.Monad.State.Class/index.js";
import * as Control_Monad_State_Trans from "../Control.Monad.State.Trans/index.js";
import * as Control_Plus from "../Control.Plus/index.js";
import * as Data_Eq from "../Data.Eq/index.js";
import * as Data_Foldable from "../Data.Foldable/index.js";
import * as Data_Function from "../Data.Function/index.js";
import * as Data_Functor from "../Data.Functor/index.js";
import * as Data_Identity from "../Data.Identity/index.js";
import * as Data_Lazy from "../Data.Lazy/index.js";
import * as Data_Monoid from "../Data.Monoid/index.js";
import * as Data_Ord from "../Data.Ord/index.js";
import * as Data_Ordering from "../Data.Ordering/index.js";
import * as Data_Semigroup from "../Data.Semigroup/index.js";
import * as Data_Traversable from "../Data.Traversable/index.js";
import * as Data_Tuple from "../Data.Tuple/index.js";
import * as Data_Unit from "../Data.Unit/index.js";
var map = /* #__PURE__ */ Data_Functor.map(Data_Lazy.functorLazy);
var map1 = /* #__PURE__ */ Data_Functor.map(Data_Tuple.functorTuple);
var identity = /* #__PURE__ */ Control_Category.identity(Control_Category.categoryFn);
var state = /* #__PURE__ */ Control_Monad_State_Class.state(/* #__PURE__ */ Control_Monad_State_Trans.monadStateStateT(Data_Identity.monadIdentity));
var monadRecStateT = /* #__PURE__ */ Control_Monad_State_Trans.monadRecStateT(Control_Monad_Rec_Class.monadRecIdentity);

// | The `Cofree` `Comonad` for a functor.
// |
// | A value of type `Cofree f a` consists of an `f`-branching
// | tree, annotated with labels of type `a`.
// |
// | The `Comonad` instance supports _redecoration_, recomputing
// | labels from the local context.
var Cofree = function (x) {
    return x;
};

// | Returns the "subtrees" of a tree.
var tail = function (v) {
    return Data_Tuple.snd(Data_Lazy.force(v));
};

// | Create a value of type `Cofree f a` from a label and a
// | functor-full of "subtrees".
var mkCofree = function (a) {
    return function (t) {
        return Data_Lazy.defer(function (v) {
            return new Data_Tuple.Tuple(a, t);
        });
    };
};
var lazyCofree = {
    defer: function (k) {
        return Data_Lazy.defer(function (v) {
            var v1 = k(Data_Unit.unit);
            return Data_Lazy.force(v1);
        });
    }
};
var hoistCofree = function (dictFunctor) {
    var map2 = Data_Functor.map(dictFunctor);
    return function (nat) {
        return function (v) {
            return map(map1((function () {
                var $163 = map2(hoistCofree(dictFunctor)(nat));
                return function ($164) {
                    return nat($163($164));
                };
            })()))(v);
        };
    };
};

// | Returns the label for a tree.
var head = function (v) {
    return Data_Tuple.fst(Data_Lazy.force(v));
};
var functorCofree = function (dictFunctor) {
    var map2 = Data_Functor.map(dictFunctor);
    return {
        map: function (f) {
            var loop = function (v) {
                return map(function (v1) {
                    return new Data_Tuple.Tuple(f(v1.value0), map2(loop)(v1.value1));
                })(v);
            };
            return loop;
        }
    };
};
var functorWithIndexCofree = function (dictFunctor) {
    var map2 = Data_Functor.map(dictFunctor);
    var functorCofree1 = functorCofree(dictFunctor);
    return {
        mapWithIndex: function (f) {
            var loop = function (n) {
                return function (v) {
                    return map(function (v1) {
                        return new Data_Tuple.Tuple(f(n)(v1.value0), map2(loop(n + 1 | 0))(v1.value1));
                    })(v);
                };
            };
            return loop(0);
        },
        Functor0: function () {
            return functorCofree1;
        }
    };
};
var foldableCofree = function (dictFoldable) {
    var foldr = Data_Foldable.foldr(dictFoldable);
    var foldl = Data_Foldable.foldl(dictFoldable);
    var foldMap = Data_Foldable.foldMap(dictFoldable);
    return {
        foldr: function (f) {
            var go = function (fa) {
                return function (b) {
                    return f(head(fa))(foldr(go)(b)(tail(fa)));
                };
            };
            return Data_Function.flip(go);
        },
        foldl: function (f) {
            var go = function (b) {
                return function (fa) {
                    return foldl(go)(f(b)(head(fa)))(tail(fa));
                };
            };
            return go;
        },
        foldMap: function (dictMonoid) {
            var append = Data_Semigroup.append(dictMonoid.Semigroup0());
            var foldMap1 = foldMap(dictMonoid);
            return function (f) {
                var go = function (fa) {
                    return append(f(head(fa)))(foldMap1(go)(tail(fa)));
                };
                return go;
            };
        }
    };
};
var traversableCofree = function (dictTraversable) {
    var traverse = Data_Traversable.traverse(dictTraversable);
    var functorCofree1 = functorCofree(dictTraversable.Functor0());
    var foldableCofree1 = foldableCofree(dictTraversable.Foldable1());
    return {
        sequence: function (dictApplicative) {
            return Data_Traversable.traverse(traversableCofree(dictTraversable))(dictApplicative)(identity);
        },
        traverse: function (dictApplicative) {
            var Apply0 = dictApplicative.Apply0();
            var apply = Control_Apply.apply(Apply0);
            var map2 = Data_Functor.map(Apply0.Functor0());
            var traverse1 = traverse(dictApplicative);
            return function (f) {
                var loop = function (ta) {
                    return apply(map2(mkCofree)(f(head(ta))))(traverse1(loop)(tail(ta)));
                };
                return loop;
            };
        },
        Functor0: function () {
            return functorCofree1;
        },
        Foldable1: function () {
            return foldableCofree1;
        }
    };
};
var extendCofree = function (dictFunctor) {
    var map2 = Data_Functor.map(dictFunctor);
    var functorCofree1 = functorCofree(dictFunctor);
    return {
        extend: function (f) {
            var loop = function (v) {
                return map(function (v1) {
                    return new Data_Tuple.Tuple(f(v), map2(loop)(v1.value1));
                })(v);
            };
            return loop;
        },
        Functor0: function () {
            return functorCofree1;
        }
    };
};
var eqCofree = function (dictEq1) {
    var eq1 = Data_Eq.eq1(dictEq1);
    return function (dictEq) {
        var eq = Data_Eq.eq(dictEq);
        return {
            eq: function (x) {
                return function (y) {
                    return eq(head(x))(head(y)) && eq1(eqCofree(dictEq1)(dictEq))(tail(x))(tail(y));
                };
            }
        };
    };
};
var ordCofree = function (dictOrd1) {
    var compare1 = Data_Ord.compare1(dictOrd1);
    var eqCofree1 = eqCofree(dictOrd1.Eq10());
    return function (dictOrd) {
        var compare = Data_Ord.compare(dictOrd);
        var eqCofree2 = eqCofree1(dictOrd.Eq0());
        return {
            compare: function (x) {
                return function (y) {
                    var v = compare(head(x))(head(y));
                    if (v instanceof Data_Ordering.EQ) {
                        return compare1(ordCofree(dictOrd1)(dictOrd))(tail(x))(tail(y));
                    };
                    return v;
                };
            },
            Eq0: function () {
                return eqCofree2;
            }
        };
    };
};
var eq1Cofree = function (dictEq1) {
    var eqCofree1 = eqCofree(dictEq1);
    return {
        eq1: function (dictEq) {
            return Data_Eq.eq(eqCofree1(dictEq));
        }
    };
};
var ord1Cofree = function (dictOrd1) {
    var ordCofree1 = ordCofree(dictOrd1);
    var eq1Cofree1 = eq1Cofree(dictOrd1.Eq10());
    return {
        compare1: function (dictOrd) {
            return Data_Ord.compare(ordCofree1(dictOrd));
        },
        Eq10: function () {
            return eq1Cofree1;
        }
    };
};

// | Lazily creates a value of type `Cofree f a` from a label and a
// | functor-full of "subtrees".
var deferCofree = function ($165) {
    return Cofree(Data_Lazy.defer($165));
};
var semigroupCofree = function (dictApply) {
    var apply = Control_Apply.apply(dictApply);
    var map2 = Data_Functor.map(dictApply.Functor0());
    return function (dictSemigroup) {
        var append = Data_Semigroup.append(dictSemigroup);
        return {
            append: function (x) {
                return function (y) {
                    return deferCofree(function (v) {
                        return new Data_Tuple.Tuple(append(head(x))(head(y)), apply(map2(Data_Semigroup.append(semigroupCofree(dictApply)(dictSemigroup)))(tail(x)))(tail(y)));
                    });
                };
            }
        };
    };
};
var monoidCofree = function (dictApplicative) {
    var pure = Control_Applicative.pure(dictApplicative);
    var semigroupCofree1 = semigroupCofree(dictApplicative.Apply0());
    return function (dictMonoid) {
        var mempty = Data_Monoid.mempty(dictMonoid);
        var semigroupCofree2 = semigroupCofree1(dictMonoid.Semigroup0());
        return {
            mempty: deferCofree(function (v) {
                return new Data_Tuple.Tuple(mempty, pure(Data_Monoid.mempty(monoidCofree(dictApplicative)(dictMonoid))));
            }),
            Semigroup0: function () {
                return semigroupCofree2;
            }
        };
    };
};
var comonadCofree = function (dictFunctor) {
    var extendCofree1 = extendCofree(dictFunctor);
    return {
        extract: head,
        Extend0: function () {
            return extendCofree1;
        }
    };
};

// | Explore a value in the cofree comonad by using an expression in a
// | corresponding free monad.
// |
// | The free monad should be built from a functor which pairs with the
// | functor underlying the cofree comonad.
var explore = function (dictFunctor) {
    var map2 = Data_Functor.map(dictFunctor);
    var runFreeM = Control_Monad_Free.runFreeM(dictFunctor)(monadRecStateT);
    return function (dictFunctor1) {
        var extract = Control_Comonad.extract(comonadCofree(dictFunctor1));
        return function (pair) {
            return function (m) {
                return function (w) {
                    var step = function (ff) {
                        return state(function (cof) {
                            return pair(map2(Data_Tuple.Tuple.create)(ff))(tail(cof));
                        });
                    };
                    var v = Control_Monad_State.runState(runFreeM(step)(m))(w);
                    return v.value0(extract(v.value1));
                };
            };
        };
    };
};
var exploreM = function (dictFunctor) {
    var map2 = Data_Functor.map(dictFunctor);
    var runFreeM = Control_Monad_Free.runFreeM(dictFunctor);
    return function (dictFunctor1) {
        var extract = Control_Comonad.extract(comonadCofree(dictFunctor1));
        return function (dictMonadRec) {
            var map3 = Data_Functor.map((((dictMonadRec.Monad0()).Bind1()).Apply0()).Functor0());
            var runFreeM1 = runFreeM(Control_Monad_State_Trans.monadRecStateT(dictMonadRec));
            return function (pair) {
                return function (m) {
                    return function (w) {
                        var step = function (ff) {
                            return function (cof) {
                                return pair(map2(Data_Tuple.Tuple.create)(ff))(tail(cof));
                            };
                        };
                        var $$eval = function (v) {
                            return v.value0(extract(v.value1));
                        };
                        return map3($$eval)(Control_Monad_State_Trans.runStateT(runFreeM1(step)(m))(w));
                    };
                };
            };
        };
    };
};

// | Recursively unfolds a `Cofree` structure given a seed.
var buildCofree = function (dictFunctor) {
    var map2 = Data_Functor.map(dictFunctor);
    return function (k) {
        return function (s) {
            return Data_Lazy.defer(function (v) {
                return map1(map2(buildCofree(dictFunctor)(k)))(k(s));
            });
        };
    };
};
var monadCofree = function (dictAlternative) {
    return {
        Applicative0: function () {
            return applicativeCofree(dictAlternative);
        },
        Bind1: function () {
            return bindCofree(dictAlternative);
        }
    };
};
var bindCofree = function (dictAlternative) {
    var Alt0 = (dictAlternative.Plus1()).Alt0();
    var alt = Control_Alt.alt(Alt0);
    var map2 = Data_Functor.map(Alt0.Functor0());
    return {
        bind: function (fa) {
            return function (f) {
                var loop = function (fa$prime) {
                    var fh = f(head(fa$prime));
                    return mkCofree(head(fh))(alt(tail(fh))(map2(loop)(tail(fa$prime))));
                };
                return loop(fa);
            };
        },
        Apply0: function () {
            return applyCofree(dictAlternative);
        }
    };
};
var applyCofree = function (dictAlternative) {
    var functorCofree1 = functorCofree(((dictAlternative.Plus1()).Alt0()).Functor0());
    return {
        apply: Control_Monad.ap(monadCofree(dictAlternative)),
        Functor0: function () {
            return functorCofree1;
        }
    };
};
var applicativeCofree = function (dictAlternative) {
    var empty = Control_Plus.empty(dictAlternative.Plus1());
    return {
        pure: function (a) {
            return mkCofree(a)(empty);
        },
        Apply0: function () {
            return applyCofree(dictAlternative);
        }
    };
};
export {
    deferCofree,
    mkCofree,
    head,
    tail,
    hoistCofree,
    buildCofree,
    explore,
    exploreM,
    semigroupCofree,
    monoidCofree,
    eqCofree,
    eq1Cofree,
    ordCofree,
    ord1Cofree,
    functorCofree,
    functorWithIndexCofree,
    foldableCofree,
    traversableCofree,
    extendCofree,
    comonadCofree,
    applyCofree,
    applicativeCofree,
    bindCofree,
    monadCofree,
    lazyCofree
};

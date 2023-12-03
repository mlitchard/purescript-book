import * as Control_Applicative from "../Control.Applicative/index.js";
import * as Control_Apply from "../Control.Apply/index.js";
import * as Control_Bind from "../Control.Bind/index.js";
import * as Control_Category from "../Control.Category/index.js";
import * as Control_Lazy from "../Control.Lazy/index.js";
import * as Control_Monad from "../Control.Monad/index.js";
import * as Data_Eq from "../Data.Eq/index.js";
import * as Data_Foldable from "../Data.Foldable/index.js";
import * as Data_FoldableWithIndex from "../Data.FoldableWithIndex/index.js";
import * as Data_Function from "../Data.Function/index.js";
import * as Data_Functor from "../Data.Functor/index.js";
import * as Data_FunctorWithIndex from "../Data.FunctorWithIndex/index.js";
import * as Data_Lazy from "../Data.Lazy/index.js";
import * as Data_Maybe from "../Data.Maybe/index.js";
import * as Data_Monoid from "../Data.Monoid/index.js";
import * as Data_Newtype from "../Data.Newtype/index.js";
import * as Data_NonEmpty from "../Data.NonEmpty/index.js";
import * as Data_Ord from "../Data.Ord/index.js";
import * as Data_Ordering from "../Data.Ordering/index.js";
import * as Data_Semigroup from "../Data.Semigroup/index.js";
import * as Data_Semiring from "../Data.Semiring/index.js";
import * as Data_Show from "../Data.Show/index.js";
import * as Data_Traversable from "../Data.Traversable/index.js";
import * as Data_TraversableWithIndex from "../Data.TraversableWithIndex/index.js";
import * as Data_Tuple from "../Data.Tuple/index.js";
import * as Data_Unfoldable1 from "../Data.Unfoldable1/index.js";
var $runtime_lazy = function (name, moduleName, init) {
    var state = 0;
    var val;
    return function (lineNumber) {
        if (state === 2) return val;
        if (state === 1) throw new ReferenceError(name + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
        state = 1;
        val = init();
        state = 2;
        return val;
    };
};
var unwrap = /* #__PURE__ */ Data_Newtype.unwrap();
var map = /* #__PURE__ */ Data_Functor.map(Data_Lazy.functorLazy);
var eq1 = /* #__PURE__ */ Data_Eq.eq1(Data_Lazy.eq1Lazy);
var compare1 = /* #__PURE__ */ Data_Ord.compare1(Data_Lazy.ord1Lazy);
var add = /* #__PURE__ */ Data_Semiring.add(Data_Semiring.semiringInt);
var identity = /* #__PURE__ */ Control_Category.identity(Control_Category.categoryFn);

// | A lazy linked list.
var List = function (x) {
    return x;
};

// | A list is either empty (represented by the `Nil` constructor) or non-empty, in
// | which case it consists of a head element, and another list (represented by the
// | `Cons` constructor).
var Nil = /* #__PURE__ */ (function () {
    function Nil() {

    };
    Nil.value = new Nil();
    return Nil;
})();

// | A list is either empty (represented by the `Nil` constructor) or non-empty, in
// | which case it consists of a head element, and another list (represented by the
// | `Cons` constructor).
var Cons = /* #__PURE__ */ (function () {
    function Cons(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    Cons.create = function (value0) {
        return function (value1) {
            return new Cons(value0, value1);
        };
    };
    return Cons;
})();
var NonEmptyList = function (x) {
    return x;
};

// | The empty list.
// |
// | Running time: `O(1)`
var nil = /* #__PURE__ */ Data_Lazy.defer(function (v) {
    return Nil.value;
});
var newtypeNonEmptyList = {
    Coercible0: function () {
        return undefined;
    }
};
var newtypeList = {
    Coercible0: function () {
        return undefined;
    }
};

// | Unwrap a lazy linked list
var step = function ($319) {
    return Data_Lazy.force(unwrap($319));
};
var semigroupList = {
    append: function (xs) {
        return function (ys) {
            var go = function (v) {
                if (v instanceof Nil) {
                    return step(ys);
                };
                if (v instanceof Cons) {
                    return new Cons(v.value0, Data_Semigroup.append(semigroupList)(v.value1)(ys));
                };
                throw new Error("Failed pattern match at Data.List.Lazy.Types (line 103, column 5 - line 103, column 21): " + [ v.constructor.name ]);
            };
            return map(go)(unwrap(xs));
        };
    }
};
var append1 = /* #__PURE__ */ Data_Semigroup.append(semigroupList);
var monoidList = {
    mempty: nil,
    Semigroup0: function () {
        return semigroupList;
    }
};
var lazyList = {
    defer: function (f) {
        return Data_Lazy.defer(function ($320) {
            return step(f($320));
        });
    }
};
var defer = /* #__PURE__ */ Control_Lazy.defer(lazyList);
var functorList = {
    map: function (f) {
        return function (xs) {
            var go = function (v) {
                if (v instanceof Nil) {
                    return Nil.value;
                };
                if (v instanceof Cons) {
                    return new Cons(f(v.value0), Data_Functor.map(functorList)(f)(v.value1));
                };
                throw new Error("Failed pattern match at Data.List.Lazy.Types (line 112, column 5 - line 112, column 17): " + [ v.constructor.name ]);
            };
            return map(go)(unwrap(xs));
        };
    }
};
var map1 = /* #__PURE__ */ Data_Functor.map(/* #__PURE__ */ Data_NonEmpty.functorNonEmpty(functorList));
var functorNonEmptyList = {
    map: function (f) {
        return function (v) {
            return map(map1(f))(v);
        };
    }
};
var eq1List = {
    eq1: function (dictEq) {
        var eq = Data_Eq.eq(dictEq);
        return function (xs) {
            return function (ys) {
                var go = function ($copy_v) {
                    return function ($copy_v1) {
                        var $tco_var_v = $copy_v;
                        var $tco_done = false;
                        var $tco_result;
                        function $tco_loop(v, v1) {
                            if (v instanceof Nil && v1 instanceof Nil) {
                                $tco_done = true;
                                return true;
                            };
                            if (v instanceof Cons && (v1 instanceof Cons && eq(v.value0)(v1.value0))) {
                                $tco_var_v = step(v.value1);
                                $copy_v1 = step(v1.value1);
                                return;
                            };
                            $tco_done = true;
                            return false;
                        };
                        while (!$tco_done) {
                            $tco_result = $tco_loop($tco_var_v, $copy_v1);
                        };
                        return $tco_result;
                    };
                };
                return go(step(xs))(step(ys));
            };
        };
    }
};
var eqNonEmpty = /* #__PURE__ */ Data_NonEmpty.eqNonEmpty(eq1List);
var eq11 = /* #__PURE__ */ Data_Eq.eq1(eq1List);
var eq1NonEmptyList = {
    eq1: function (dictEq) {
        var eq12 = eq1(eqNonEmpty(dictEq));
        return function (v) {
            return function (v1) {
                return eq12(v)(v1);
            };
        };
    }
};
var eqList = function (dictEq) {
    return {
        eq: eq11(dictEq)
    };
};
var eqNonEmptyList = function (dictEq) {
    return Data_Lazy.eqLazy(eqNonEmpty(dictEq));
};
var ord1List = {
    compare1: function (dictOrd) {
        var compare = Data_Ord.compare(dictOrd);
        return function (xs) {
            return function (ys) {
                var go = function ($copy_v) {
                    return function ($copy_v1) {
                        var $tco_var_v = $copy_v;
                        var $tco_done = false;
                        var $tco_result;
                        function $tco_loop(v, v1) {
                            if (v instanceof Nil && v1 instanceof Nil) {
                                $tco_done = true;
                                return Data_Ordering.EQ.value;
                            };
                            if (v instanceof Nil) {
                                $tco_done = true;
                                return Data_Ordering.LT.value;
                            };
                            if (v1 instanceof Nil) {
                                $tco_done = true;
                                return Data_Ordering.GT.value;
                            };
                            if (v instanceof Cons && v1 instanceof Cons) {
                                var v2 = compare(v.value0)(v1.value0);
                                if (v2 instanceof Data_Ordering.EQ) {
                                    $tco_var_v = step(v.value1);
                                    $copy_v1 = step(v1.value1);
                                    return;
                                };
                                $tco_done = true;
                                return v2;
                            };
                            throw new Error("Failed pattern match at Data.List.Lazy.Types (line 89, column 5 - line 89, column 20): " + [ v.constructor.name, v1.constructor.name ]);
                        };
                        while (!$tco_done) {
                            $tco_result = $tco_loop($tco_var_v, $copy_v1);
                        };
                        return $tco_result;
                    };
                };
                return go(step(xs))(step(ys));
            };
        };
    },
    Eq10: function () {
        return eq1List;
    }
};
var ordNonEmpty = /* #__PURE__ */ Data_NonEmpty.ordNonEmpty(ord1List);
var compare11 = /* #__PURE__ */ Data_Ord.compare1(ord1List);
var ord1NonEmptyList = {
    compare1: function (dictOrd) {
        var compare12 = compare1(ordNonEmpty(dictOrd));
        return function (v) {
            return function (v1) {
                return compare12(v)(v1);
            };
        };
    },
    Eq10: function () {
        return eq1NonEmptyList;
    }
};
var ordList = function (dictOrd) {
    var eqList1 = eqList(dictOrd.Eq0());
    return {
        compare: compare11(dictOrd),
        Eq0: function () {
            return eqList1;
        }
    };
};
var ordNonEmptyList = function (dictOrd) {
    return Data_Lazy.ordLazy(ordNonEmpty(dictOrd));
};

// | Attach an element to the front of a lazy list.
// |
// | Running time: `O(1)`
var cons = function (x) {
    return function (xs) {
        return Data_Lazy.defer(function (v) {
            return new Cons(x, xs);
        });
    };
};
var foldableList = {
    foldr: function (op) {
        return function (z) {
            return function (xs) {
                var rev = Data_Foldable.foldl(foldableList)(Data_Function.flip(cons))(nil);
                return Data_Foldable.foldl(foldableList)(Data_Function.flip(op))(z)(rev(xs));
            };
        };
    },
    foldl: function (op) {
        
        // `go` is needed to ensure the function is tail-call optimized
var go = function ($copy_b) {
            return function ($copy_xs) {
                var $tco_var_b = $copy_b;
                var $tco_done = false;
                var $tco_result;
                function $tco_loop(b, xs) {
                    var v = step(xs);
                    if (v instanceof Nil) {
                        $tco_done = true;
                        return b;
                    };
                    if (v instanceof Cons) {
                        $tco_var_b = op(b)(v.value0);
                        $copy_xs = v.value1;
                        return;
                    };
                    throw new Error("Failed pattern match at Data.List.Lazy.Types (line 127, column 7 - line 129, column 40): " + [ v.constructor.name ]);
                };
                while (!$tco_done) {
                    $tco_result = $tco_loop($tco_var_b, $copy_xs);
                };
                return $tco_result;
            };
        };
        return go;
    },
    foldMap: function (dictMonoid) {
        var append2 = Data_Semigroup.append(dictMonoid.Semigroup0());
        var mempty = Data_Monoid.mempty(dictMonoid);
        return function (f) {
            return Data_Foldable.foldl(foldableList)(function (b) {
                return function (a) {
                    return append2(b)(f(a));
                };
            })(mempty);
        };
    }
};
var foldr = /* #__PURE__ */ Data_Foldable.foldr(foldableList);
var foldableNonEmpty = /* #__PURE__ */ Data_NonEmpty.foldableNonEmpty(foldableList);
var foldr1 = /* #__PURE__ */ Data_Foldable.foldr(foldableNonEmpty);
var foldl = /* #__PURE__ */ Data_Foldable.foldl(foldableNonEmpty);
var foldMap = /* #__PURE__ */ Data_Foldable.foldMap(foldableNonEmpty);
var foldl1 = /* #__PURE__ */ Data_Foldable.foldl(foldableList);
var extendList = {
    extend: function (f) {
        return function (l) {
            var go = function (a) {
                return function (v) {
                    var acc$prime = cons(a)(v.acc);
                    return {
                        val: cons(f(acc$prime))(v.val),
                        acc: acc$prime
                    };
                };
            };
            var v = step(l);
            if (v instanceof Nil) {
                return nil;
            };
            if (v instanceof Cons) {
                return cons(f(l))((foldr(go)({
                    val: nil,
                    acc: nil
                })(v.value1)).val);
            };
            throw new Error("Failed pattern match at Data.List.Lazy.Types (line 197, column 5 - line 200, column 55): " + [ v.constructor.name ]);
        };
    },
    Functor0: function () {
        return functorList;
    }
};
var extendNonEmptyList = {
    extend: function (f) {
        return function (v) {
            var go = function (a) {
                return function (v1) {
                    return {
                        val: cons(f(Data_Lazy.defer(function (v2) {
                            return new Data_NonEmpty.NonEmpty(a, v1.acc);
                        })))(v1.val),
                        acc: cons(a)(v1.acc)
                    };
                };
            };
            var v1 = Data_Lazy.force(v);
            return Data_Lazy.defer(function (v2) {
                return new Data_NonEmpty.NonEmpty(f(v), (foldr(go)({
                    val: nil,
                    acc: nil
                })(v1.value1)).val);
            });
        };
    },
    Functor0: function () {
        return functorNonEmptyList;
    }
};
var foldableNonEmptyList = {
    foldr: function (f) {
        return function (b) {
            return function (v) {
                return foldr1(f)(b)(Data_Lazy.force(v));
            };
        };
    },
    foldl: function (f) {
        return function (b) {
            return function (v) {
                return foldl(f)(b)(Data_Lazy.force(v));
            };
        };
    },
    foldMap: function (dictMonoid) {
        var foldMap1 = foldMap(dictMonoid);
        return function (f) {
            return function (v) {
                return foldMap1(f)(Data_Lazy.force(v));
            };
        };
    }
};
var showList = function (dictShow) {
    var show = Data_Show.show(dictShow);
    return {
        show: function (xs) {
            return "(fromFoldable [" + ((function () {
                var v = step(xs);
                if (v instanceof Nil) {
                    return "";
                };
                if (v instanceof Cons) {
                    return show(v.value0) + foldl1(function (shown) {
                        return function (x$prime) {
                            return shown + ("," + show(x$prime));
                        };
                    })("")(v.value1);
                };
                throw new Error("Failed pattern match at Data.List.Lazy.Types (line 66, column 13 - line 69, column 78): " + [ v.constructor.name ]);
            })() + "])");
        }
    };
};
var showNonEmptyList = function (dictShow) {
    var show = Data_Show.show(Data_Lazy.showLazy(Data_NonEmpty.showNonEmpty(dictShow)(showList(dictShow))));
    return {
        show: function (v) {
            return "(NonEmptyList " + (show(v) + ")");
        }
    };
};
var showStep = function (dictShow) {
    var show = Data_Show.show(dictShow);
    var show1 = Data_Show.show(showList(dictShow));
    return {
        show: function (v) {
            if (v instanceof Nil) {
                return "Nil";
            };
            if (v instanceof Cons) {
                return "(" + (show(v.value0) + (" : " + (show1(v.value1) + ")")));
            };
            throw new Error("Failed pattern match at Data.List.Lazy.Types (line 36, column 1 - line 38, column 62): " + [ v.constructor.name ]);
        }
    };
};
var foldableWithIndexList = {
    foldrWithIndex: function (f) {
        return function (b) {
            return function (xs) {
                var v = (function () {
                    
                    // As we create our reversed list, we count elements.
var rev = foldl1(function (v1) {
                        return function (a) {
                            return new Data_Tuple.Tuple(v1.value0 + 1 | 0, cons(a)(v1.value1));
                        };
                    });
                    return rev(new Data_Tuple.Tuple(0, nil))(xs);
                })();
                return Data_Tuple.snd(foldl1(function (v1) {
                    return function (a) {
                        return new Data_Tuple.Tuple(v1.value0 - 1 | 0, f(v1.value0 - 1 | 0)(a)(v1.value1));
                    };
                })(new Data_Tuple.Tuple(v.value0, b))(v.value1));
            };
        };
    },
    foldlWithIndex: function (f) {
        return function (acc) {
            var $321 = foldl1(function (v) {
                return function (a) {
                    return new Data_Tuple.Tuple(v.value0 + 1 | 0, f(v.value0)(v.value1)(a));
                };
            })(new Data_Tuple.Tuple(0, acc));
            return function ($322) {
                return Data_Tuple.snd($321($322));
            };
        };
    },
    foldMapWithIndex: function (dictMonoid) {
        var append2 = Data_Semigroup.append(dictMonoid.Semigroup0());
        var mempty = Data_Monoid.mempty(dictMonoid);
        return function (f) {
            return Data_FoldableWithIndex.foldlWithIndex(foldableWithIndexList)(function (i) {
                return function (acc) {
                    var $323 = append2(acc);
                    var $324 = f(i);
                    return function ($325) {
                        return $323($324($325));
                    };
                };
            })(mempty);
        };
    },
    Foldable0: function () {
        return foldableList;
    }
};
var foldableWithIndexNonEmpty = /* #__PURE__ */ Data_NonEmpty.foldableWithIndexNonEmpty(foldableWithIndexList);
var foldMapWithIndex = /* #__PURE__ */ Data_FoldableWithIndex.foldMapWithIndex(foldableWithIndexNonEmpty);
var foldlWithIndex = /* #__PURE__ */ Data_FoldableWithIndex.foldlWithIndex(foldableWithIndexNonEmpty);
var foldrWithIndex = /* #__PURE__ */ Data_FoldableWithIndex.foldrWithIndex(foldableWithIndexNonEmpty);
var foldrWithIndex1 = /* #__PURE__ */ Data_FoldableWithIndex.foldrWithIndex(foldableWithIndexList);
var foldableWithIndexNonEmptyList = {
    foldMapWithIndex: function (dictMonoid) {
        var foldMapWithIndex1 = foldMapWithIndex(dictMonoid);
        return function (f) {
            return function (v) {
                return foldMapWithIndex1((function () {
                    var $326 = Data_Maybe.maybe(0)(add(1));
                    return function ($327) {
                        return f($326($327));
                    };
                })())(Data_Lazy.force(v));
            };
        };
    },
    foldlWithIndex: function (f) {
        return function (b) {
            return function (v) {
                return foldlWithIndex((function () {
                    var $328 = Data_Maybe.maybe(0)(add(1));
                    return function ($329) {
                        return f($328($329));
                    };
                })())(b)(Data_Lazy.force(v));
            };
        };
    },
    foldrWithIndex: function (f) {
        return function (b) {
            return function (v) {
                return foldrWithIndex((function () {
                    var $330 = Data_Maybe.maybe(0)(add(1));
                    return function ($331) {
                        return f($330($331));
                    };
                })())(b)(Data_Lazy.force(v));
            };
        };
    },
    Foldable0: function () {
        return foldableNonEmptyList;
    }
};
var functorWithIndexList = {
    mapWithIndex: function (f) {
        return foldrWithIndex1(function (i) {
            return function (x) {
                return function (acc) {
                    return cons(f(i)(x))(acc);
                };
            };
        })(nil);
    },
    Functor0: function () {
        return functorList;
    }
};
var mapWithIndex = /* #__PURE__ */ Data_FunctorWithIndex.mapWithIndex(/* #__PURE__ */ Data_NonEmpty.functorWithIndex(functorWithIndexList));
var functorWithIndexNonEmptyList = {
    mapWithIndex: function (f) {
        return function (v) {
            return Data_Lazy.defer(function (v1) {
                return mapWithIndex((function () {
                    var $332 = Data_Maybe.maybe(0)(add(1));
                    return function ($333) {
                        return f($332($333));
                    };
                })())(Data_Lazy.force(v));
            });
        };
    },
    Functor0: function () {
        return functorNonEmptyList;
    }
};
var toList = function (v) {
    return defer(function (v1) {
        var v2 = Data_Lazy.force(v);
        return cons(v2.value0)(v2.value1);
    });
};
var semigroupNonEmptyList = {
    append: function (v) {
        return function (as$prime) {
            var v1 = Data_Lazy.force(v);
            return Data_Lazy.defer(function (v2) {
                return new Data_NonEmpty.NonEmpty(v1.value0, append1(v1.value1)(toList(as$prime)));
            });
        };
    }
};
var traversableList = {
    traverse: function (dictApplicative) {
        var Apply0 = dictApplicative.Apply0();
        var apply1 = Control_Apply.apply(Apply0);
        var map2 = Data_Functor.map(Apply0.Functor0());
        var pure = Control_Applicative.pure(dictApplicative);
        return function (f) {
            return foldr(function (a) {
                return function (b) {
                    return apply1(map2(cons)(f(a)))(b);
                };
            })(pure(nil));
        };
    },
    sequence: function (dictApplicative) {
        return Data_Traversable.traverse(traversableList)(dictApplicative)(identity);
    },
    Functor0: function () {
        return functorList;
    },
    Foldable1: function () {
        return foldableList;
    }
};
var traversableNonEmpty = /* #__PURE__ */ Data_NonEmpty.traversableNonEmpty(traversableList);
var traverse = /* #__PURE__ */ Data_Traversable.traverse(traversableNonEmpty);
var sequence = /* #__PURE__ */ Data_Traversable.sequence(traversableNonEmpty);
var traversableNonEmptyList = {
    traverse: function (dictApplicative) {
        var map2 = Data_Functor.map((dictApplicative.Apply0()).Functor0());
        var traverse1 = traverse(dictApplicative);
        return function (f) {
            return function (v) {
                return map2(function (xxs) {
                    return Data_Lazy.defer(function (v1) {
                        return xxs;
                    });
                })(traverse1(f)(Data_Lazy.force(v)));
            };
        };
    },
    sequence: function (dictApplicative) {
        var map2 = Data_Functor.map((dictApplicative.Apply0()).Functor0());
        var sequence1 = sequence(dictApplicative);
        return function (v) {
            return map2(function (xxs) {
                return Data_Lazy.defer(function (v1) {
                    return xxs;
                });
            })(sequence1(Data_Lazy.force(v)));
        };
    },
    Functor0: function () {
        return functorNonEmptyList;
    },
    Foldable1: function () {
        return foldableNonEmptyList;
    }
};
var traversableWithIndexList = {
    traverseWithIndex: function (dictApplicative) {
        var Apply0 = dictApplicative.Apply0();
        var apply1 = Control_Apply.apply(Apply0);
        var map2 = Data_Functor.map(Apply0.Functor0());
        var pure = Control_Applicative.pure(dictApplicative);
        return function (f) {
            return foldrWithIndex1(function (i) {
                return function (a) {
                    return function (b) {
                        return apply1(map2(cons)(f(i)(a)))(b);
                    };
                };
            })(pure(nil));
        };
    },
    FunctorWithIndex0: function () {
        return functorWithIndexList;
    },
    FoldableWithIndex1: function () {
        return foldableWithIndexList;
    },
    Traversable2: function () {
        return traversableList;
    }
};
var traverseWithIndex = /* #__PURE__ */ Data_TraversableWithIndex.traverseWithIndex(/* #__PURE__ */ Data_NonEmpty.traversableWithIndexNonEmpty(traversableWithIndexList));
var traversableWithIndexNonEmptyList = {
    traverseWithIndex: function (dictApplicative) {
        var map2 = Data_Functor.map((dictApplicative.Apply0()).Functor0());
        var traverseWithIndex1 = traverseWithIndex(dictApplicative);
        return function (f) {
            return function (v) {
                return map2(function (xxs) {
                    return Data_Lazy.defer(function (v1) {
                        return xxs;
                    });
                })(traverseWithIndex1((function () {
                    var $334 = Data_Maybe.maybe(0)(add(1));
                    return function ($335) {
                        return f($334($335));
                    };
                })())(Data_Lazy.force(v)));
            };
        };
    },
    FunctorWithIndex0: function () {
        return functorWithIndexNonEmptyList;
    },
    FoldableWithIndex1: function () {
        return foldableWithIndexNonEmptyList;
    },
    Traversable2: function () {
        return traversableNonEmptyList;
    }
};
var unfoldable1List = {
    unfoldr1: /* #__PURE__ */ (function () {
        var go = function (f) {
            return function (b) {
                return defer(function (v) {
                    var v1 = f(b);
                    if (v1.value1 instanceof Data_Maybe.Just) {
                        return cons(v1.value0)(go(f)(v1.value1.value0));
                    };
                    if (v1.value1 instanceof Data_Maybe.Nothing) {
                        return cons(v1.value0)(nil);
                    };
                    throw new Error("Failed pattern match at Data.List.Lazy.Types (line 151, column 28 - line 153, column 33): " + [ v1.constructor.name ]);
                });
            };
        };
        return go;
    })()
};
var unfoldableList = {
    unfoldr: /* #__PURE__ */ (function () {
        var go = function (f) {
            return function (b) {
                return defer(function (v) {
                    var v1 = f(b);
                    if (v1 instanceof Data_Maybe.Nothing) {
                        return nil;
                    };
                    if (v1 instanceof Data_Maybe.Just) {
                        return cons(v1.value0.value0)(go(f)(v1.value0.value1));
                    };
                    throw new Error("Failed pattern match at Data.List.Lazy.Types (line 157, column 28 - line 159, column 39): " + [ v1.constructor.name ]);
                });
            };
        };
        return go;
    })(),
    Unfoldable10: function () {
        return unfoldable1List;
    }
};
var unfoldr1 = /* #__PURE__ */ Data_Unfoldable1.unfoldr1(/* #__PURE__ */ Data_NonEmpty.unfoldable1NonEmpty(unfoldableList));
var unfoldable1NonEmptyList = {
    unfoldr1: function (f) {
        return function (b) {
            return Data_Lazy.defer(function (v) {
                return unfoldr1(f)(b);
            });
        };
    }
};
var comonadNonEmptyList = {
    extract: function (v) {
        return Data_NonEmpty.head(Data_Lazy.force(v));
    },
    Extend0: function () {
        return extendNonEmptyList;
    }
};
var monadList = {
    Applicative0: function () {
        return applicativeList;
    },
    Bind1: function () {
        return bindList;
    }
};
var bindList = {
    bind: function (xs) {
        return function (f) {
            var go = function (v) {
                if (v instanceof Nil) {
                    return Nil.value;
                };
                if (v instanceof Cons) {
                    return step(append1(f(v.value0))(Control_Bind.bind(bindList)(v.value1)(f)));
                };
                throw new Error("Failed pattern match at Data.List.Lazy.Types (line 180, column 5 - line 180, column 17): " + [ v.constructor.name ]);
            };
            return map(go)(unwrap(xs));
        };
    },
    Apply0: function () {
        return $lazy_applyList(0);
    }
};
var applicativeList = {
    pure: function (a) {
        return cons(a)(nil);
    },
    Apply0: function () {
        return $lazy_applyList(0);
    }
};
var $lazy_applyList = /* #__PURE__ */ $runtime_lazy("applyList", "Data.List.Lazy.Types", function () {
    return {
        apply: Control_Monad.ap(monadList),
        Functor0: function () {
            return functorList;
        }
    };
});
var applyList = /* #__PURE__ */ $lazy_applyList(171);
var apply = /* #__PURE__ */ Control_Apply.apply(applyList);
var bind = /* #__PURE__ */ Control_Bind.bind(bindList);
var applyNonEmptyList = {
    apply: function (v) {
        return function (v1) {
            var v2 = Data_Lazy.force(v1);
            var v3 = Data_Lazy.force(v);
            return Data_Lazy.defer(function (v4) {
                return new Data_NonEmpty.NonEmpty(v3.value0(v2.value0), append1(apply(v3.value1)(cons(v2.value0)(nil)))(apply(cons(v3.value0)(v3.value1))(v2.value1)));
            });
        };
    },
    Functor0: function () {
        return functorNonEmptyList;
    }
};
var bindNonEmptyList = {
    bind: function (v) {
        return function (f) {
            var v1 = Data_Lazy.force(v);
            var v2 = Data_Lazy.force(unwrap(f(v1.value0)));
            return Data_Lazy.defer(function (v3) {
                return new Data_NonEmpty.NonEmpty(v2.value0, append1(v2.value1)(bind(v1.value1)(function ($336) {
                    return toList(f($336));
                })));
            });
        };
    },
    Apply0: function () {
        return applyNonEmptyList;
    }
};
var altNonEmptyList = {
    alt: /* #__PURE__ */ Data_Semigroup.append(semigroupNonEmptyList),
    Functor0: function () {
        return functorNonEmptyList;
    }
};
var altList = {
    alt: append1,
    Functor0: function () {
        return functorList;
    }
};
var plusList = {
    empty: nil,
    Alt0: function () {
        return altList;
    }
};
var singleton = /* #__PURE__ */ Data_NonEmpty.singleton(plusList);
var alternativeList = {
    Applicative0: function () {
        return applicativeList;
    },
    Plus1: function () {
        return plusList;
    }
};
var monadPlusList = {
    Monad0: function () {
        return monadList;
    },
    Alternative1: function () {
        return alternativeList;
    }
};
var applicativeNonEmptyList = {
    pure: function (a) {
        return Data_Lazy.defer(function (v) {
            return singleton(a);
        });
    },
    Apply0: function () {
        return applyNonEmptyList;
    }
};
var monadNonEmptyList = {
    Applicative0: function () {
        return applicativeNonEmptyList;
    },
    Bind1: function () {
        return bindNonEmptyList;
    }
};
export {
    List,
    Nil,
    Cons,
    step,
    nil,
    cons,
    NonEmptyList,
    toList,
    showStep,
    newtypeList,
    showList,
    eqList,
    eq1List,
    ordList,
    ord1List,
    lazyList,
    semigroupList,
    monoidList,
    functorList,
    functorWithIndexList,
    foldableList,
    foldableWithIndexList,
    unfoldable1List,
    unfoldableList,
    traversableList,
    traversableWithIndexList,
    applyList,
    applicativeList,
    bindList,
    monadList,
    altList,
    plusList,
    alternativeList,
    monadPlusList,
    extendList,
    newtypeNonEmptyList,
    eqNonEmptyList,
    ordNonEmptyList,
    eq1NonEmptyList,
    ord1NonEmptyList,
    showNonEmptyList,
    functorNonEmptyList,
    applyNonEmptyList,
    applicativeNonEmptyList,
    bindNonEmptyList,
    monadNonEmptyList,
    altNonEmptyList,
    extendNonEmptyList,
    comonadNonEmptyList,
    semigroupNonEmptyList,
    foldableNonEmptyList,
    traversableNonEmptyList,
    unfoldable1NonEmptyList,
    functorWithIndexNonEmptyList,
    foldableWithIndexNonEmptyList,
    traversableWithIndexNonEmptyList
};

// | This module defines a type of sets as balanced 2-3 trees, based on
// | <http://www.cs.princeton.edu/~dpw/courses/cos326-12/ass/2-3-trees.pdf>
// |
// | Qualified import is encouraged, so as to avoid name clashes with other modules.
import * as Control_Applicative from "../Control.Applicative/index.js";
import * as Control_Bind from "../Control.Bind/index.js";
import * as Control_Category from "../Control.Category/index.js";
import * as Control_Monad_Rec_Class from "../Control.Monad.Rec.Class/index.js";
import * as Control_Monad_ST_Internal from "../Control.Monad.ST.Internal/index.js";
import * as Data_Array from "../Data.Array/index.js";
import * as Data_Array_ST from "../Data.Array.ST/index.js";
import * as Data_Eq from "../Data.Eq/index.js";
import * as Data_Foldable from "../Data.Foldable/index.js";
import * as Data_Function from "../Data.Function/index.js";
import * as Data_Functor from "../Data.Functor/index.js";
import * as Data_List from "../Data.List/index.js";
import * as Data_List_Types from "../Data.List.Types/index.js";
import * as Data_Map_Internal from "../Data.Map.Internal/index.js";
import * as Data_Maybe from "../Data.Maybe/index.js";
import * as Data_Ord from "../Data.Ord/index.js";
import * as Data_Ordering from "../Data.Ordering/index.js";
import * as Data_Show from "../Data.Show/index.js";
import * as Data_Unfoldable from "../Data.Unfoldable/index.js";
import * as Data_Unit from "../Data.Unit/index.js";
var foldMap = /* #__PURE__ */ Data_Foldable.foldMap(Data_List_Types.foldableList);
var foldl = /* #__PURE__ */ Data_Foldable.foldl(Data_List_Types.foldableList);
var foldr = /* #__PURE__ */ Data_Foldable.foldr(Data_List_Types.foldableList);
var map1 = /* #__PURE__ */ Data_Functor.map(Data_Maybe.functorMaybe);
var fromFoldable1 = /* #__PURE__ */ Data_Array.fromFoldable(Data_List_Types.foldableList);
var unsafeIndex = /* #__PURE__ */ Data_Array.unsafeIndex();
var bind = /* #__PURE__ */ Control_Bind.bind(Control_Monad_ST_Internal.bindST);
var pure = /* #__PURE__ */ Control_Applicative.pure(Control_Monad_ST_Internal.applicativeST);
var tailRecM2 = /* #__PURE__ */ Control_Monad_Rec_Class.tailRecM2(Control_Monad_ST_Internal.monadRecST);
var identity = /* #__PURE__ */ Control_Category.identity(Control_Category.categoryFn);

// | `Set a` represents a set of values of type `a`
var $$Set = function (x) {
    return x;
};

// | Form the union of two sets
// |
// | Running time: `O(n * log(m))`
var union = function (dictOrd) {
    var union1 = Data_Map_Internal.union(dictOrd);
    return function (v) {
        return function (v1) {
            return union1(v)(v1);
        };
    };
};

// | Insert a value into a set if it is not already present, if it is present, delete it.
var toggle = function (dictOrd) {
    var alter = Data_Map_Internal.alter(dictOrd);
    return function (a) {
        return function (v) {
            return alter(Data_Maybe.maybe(new Data_Maybe.Just(Data_Unit.unit))(function (v1) {
                return Data_Maybe.Nothing.value;
            }))(a)(v);
        };
    };
};

// | A set is a map with no value attached to each key.
var toMap = function (v) {
    return v;
};
var toList = function (v) {
    return Data_Map_Internal.keys(v);
};

// | Convert a set to an unfoldable structure.
var toUnfoldable = function (dictUnfoldable) {
    var $127 = Data_List.toUnfoldable(dictUnfoldable);
    return function ($128) {
        return $127(toList($128));
    };
};
var toUnfoldable1 = /* #__PURE__ */ toUnfoldable(Data_Unfoldable.unfoldableArray);

// | Find the size of a set
var size = function (v) {
    return Data_Map_Internal.size(v);
};

// | Create a set with one element
var singleton = function (a) {
    return Data_Map_Internal.singleton(a)(Data_Unit.unit);
};
var showSet = function (dictShow) {
    var show = Data_Show.show(Data_Show.showArray(dictShow));
    return {
        show: function (s) {
            return "(fromFoldable " + (show(toUnfoldable1(s)) + ")");
        }
    };
};
var semigroupSet = function (dictOrd) {
    return {
        append: union(dictOrd)
    };
};

// | Test if a value is a member of a set
var member = function (dictOrd) {
    var member1 = Data_Map_Internal.member(dictOrd);
    return function (a) {
        return function (v) {
            return member1(a)(v);
        };
    };
};

// | Test if a set is empty
var isEmpty = function (v) {
    return Data_Map_Internal.isEmpty(v);
};

// | Insert a value into a set
var insert = function (dictOrd) {
    var insert1 = Data_Map_Internal.insert(dictOrd);
    return function (a) {
        return function (v) {
            return insert1(a)(Data_Unit.unit)(v);
        };
    };
};

// | A map with no value attached to each key is a set.
// | See also `Data.Map.keys`.
var fromMap = $$Set;
var foldableSet = {
    foldMap: function (dictMonoid) {
        var foldMap1 = foldMap(dictMonoid);
        return function (f) {
            var $129 = foldMap1(f);
            return function ($130) {
                return $129(toList($130));
            };
        };
    },
    foldl: function (f) {
        return function (x) {
            var $131 = foldl(f)(x);
            return function ($132) {
                return $131(toList($132));
            };
        };
    },
    foldr: function (f) {
        return function (x) {
            var $133 = foldr(f)(x);
            return function ($134) {
                return $133(toList($134));
            };
        };
    }
};
var foldl1 = /* #__PURE__ */ Data_Foldable.foldl(foldableSet);
var foldr1 = /* #__PURE__ */ Data_Foldable.foldr(foldableSet);
var findMin = function (v) {
    return map1(function (v1) {
        return v1.key;
    })(Data_Map_Internal.findMin(v));
};
var findMax = function (v) {
    return map1(function (v1) {
        return v1.key;
    })(Data_Map_Internal.findMax(v));
};

// | Filter out those values of a set for which a predicate on the value fails
// | to hold.
var filter = function (dictOrd) {
    var filterWithKey = Data_Map_Internal.filterWithKey(dictOrd);
    return function (f) {
        return function (v) {
            return filterWithKey(function (k) {
                return function (v1) {
                    return f(k);
                };
            })(v);
        };
    };
};
var eqSet = function (dictEq) {
    var eq = Data_Eq.eq(Data_Map_Internal.eqMap(dictEq)(Data_Eq.eqUnit));
    return {
        eq: function (v) {
            return function (v1) {
                return eq(v)(v1);
            };
        }
    };
};
var ordSet = function (dictOrd) {
    var compare = Data_Ord.compare(Data_List_Types.ordList(dictOrd));
    var eqSet1 = eqSet(dictOrd.Eq0());
    return {
        compare: function (s1) {
            return function (s2) {
                return compare(toList(s1))(toList(s2));
            };
        },
        Eq0: function () {
            return eqSet1;
        }
    };
};
var eq1Set = {
    eq1: function (dictEq) {
        return Data_Eq.eq(eqSet(dictEq));
    }
};
var ord1Set = {
    compare1: function (dictOrd) {
        return Data_Ord.compare(ordSet(dictOrd));
    },
    Eq10: function () {
        return eq1Set;
    }
};

// | An empty set
var empty = Data_Map_Internal.empty;

// | Create a set from a foldable structure.
var fromFoldable = function (dictFoldable) {
    var foldl2 = Data_Foldable.foldl(dictFoldable);
    return function (dictOrd) {
        var insert1 = insert(dictOrd);
        return foldl2(function (m) {
            return function (a) {
                return insert1(a)(m);
            };
        })(empty);
    };
};
var fromFoldable2 = /* #__PURE__ */ fromFoldable(Data_Foldable.foldableArray);

// | The set of elements which are in both the first and second set
var intersection = function (dictOrd) {
    var compare = Data_Ord.compare(dictOrd);
    var fromFoldable3 = fromFoldable2(dictOrd);
    return function (s1) {
        return function (s2) {
            var toArray = function ($135) {
                return fromFoldable1(toList($135));
            };
            var rs = toArray(s2);
            var rl = Data_Array.length(rs);
            var ls = toArray(s1);
            var ll = Data_Array.length(ls);
            var intersect = function (acc) {
                var go = function (l) {
                    return function (r) {
                        var $122 = l < ll && r < rl;
                        if ($122) {
                            var v = compare(unsafeIndex(ls)(l))(unsafeIndex(rs)(r));
                            if (v instanceof Data_Ordering.EQ) {
                                return function __do() {
                                    Data_Array_ST.push(unsafeIndex(ls)(l))(acc)();
                                    return new Control_Monad_Rec_Class.Loop({
                                        a: l + 1 | 0,
                                        b: r + 1 | 0
                                    });
                                };
                            };
                            if (v instanceof Data_Ordering.LT) {
                                return pure(new Control_Monad_Rec_Class.Loop({
                                    a: l + 1 | 0,
                                    b: r
                                }));
                            };
                            if (v instanceof Data_Ordering.GT) {
                                return pure(new Control_Monad_Rec_Class.Loop({
                                    a: l,
                                    b: r + 1 | 0
                                }));
                            };
                            throw new Error("Failed pattern match at Data.Set (line 184, column 12 - line 189, column 43): " + [ v.constructor.name ]);
                        };
                        return pure(new Control_Monad_Rec_Class.Done(acc));
                    };
                };
                return tailRecM2(go)(0)(0);
            };
            return fromFoldable3(bind(bind(Data_Array_ST["new"])(intersect))(Data_Array_ST.unsafeFreeze)());
        };
    };
};

// | Maps over the values in a set.
// |
// | This operation is not structure-preserving for sets, so is not a valid
// | `Functor`. An example case: mapping `const x` over a set with `n > 0`
// | elements will result in a set with one element.
var map = function (dictOrd) {
    var insert1 = insert(dictOrd);
    return function (f) {
        return foldl1(function (m) {
            return function (a) {
                return insert1(f(a))(m);
            };
        })(empty);
    };
};

// | Applies a function to each value in a set, discarding entries where the
// | function returns `Nothing`.
var mapMaybe = function (dictOrd) {
    var insert1 = insert(dictOrd);
    return function (f) {
        return foldr1(function (a) {
            return function (acc) {
                return Data_Maybe.maybe(acc)(function (b) {
                    return insert1(b)(acc);
                })(f(a));
            };
        })(empty);
    };
};
var monoidSet = function (dictOrd) {
    var semigroupSet1 = semigroupSet(dictOrd);
    return {
        mempty: empty,
        Semigroup0: function () {
            return semigroupSet1;
        }
    };
};

// | Form the union of a collection of sets
var unions = function (dictFoldable) {
    var foldl2 = Data_Foldable.foldl(dictFoldable);
    return function (dictOrd) {
        return foldl2(union(dictOrd))(empty);
    };
};

// | Delete a value from a set
var $$delete = function (dictOrd) {
    var delete1 = Data_Map_Internal["delete"](dictOrd);
    return function (a) {
        return function (v) {
            return delete1(a)(v);
        };
    };
};

// | Form the set difference
var difference = function (dictOrd) {
    var delete1 = $$delete(dictOrd);
    return function (s1) {
        return function (s2) {
            return foldl(Data_Function.flip(delete1))(s1)(toList(s2));
        };
    };
};

// | True if and only if every element in the first set
// | is an element of the second set
var subset = function (dictOrd) {
    var difference1 = difference(dictOrd);
    return function (s1) {
        return function (s2) {
            return isEmpty(difference1(s1)(s2));
        };
    };
};

// | True if and only if the first set is a subset of the second set
// | and the sets are not equal
var properSubset = function (dictOrd) {
    var subset1 = subset(dictOrd);
    var notEq = Data_Eq.notEq(eqSet(dictOrd.Eq0()));
    return function (s1) {
        return function (s2) {
            return subset1(s1)(s2) && notEq(s1)(s2);
        };
    };
};

// | Check whether the underlying tree satisfies the 2-3 invariant
// |
// | This function is provided for internal use.
var checkValid = function (v) {
    return Data_Map_Internal.checkValid(v);
};

// | Filter a set of optional values, discarding values that contain `Nothing`
var catMaybes = function (dictOrd) {
    return mapMaybe(dictOrd)(identity);
};
export {
    fromFoldable,
    toUnfoldable,
    empty,
    isEmpty,
    singleton,
    map,
    checkValid,
    insert,
    member,
    $$delete as delete,
    toggle,
    size,
    findMin,
    findMax,
    union,
    unions,
    difference,
    subset,
    properSubset,
    intersection,
    filter,
    mapMaybe,
    catMaybes,
    toMap,
    fromMap,
    eqSet,
    eq1Set,
    showSet,
    ordSet,
    ord1Set,
    monoidSet,
    semigroupSet,
    foldableSet
};

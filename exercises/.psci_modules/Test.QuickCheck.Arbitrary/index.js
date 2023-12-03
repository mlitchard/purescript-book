import * as Control_Applicative from "../Control.Applicative/index.js";
import * as Control_Apply from "../Control.Apply/index.js";
import * as Control_Bind from "../Control.Bind/index.js";
import * as Control_Category from "../Control.Category/index.js";
import * as Control_Monad_Gen_Class from "../Control.Monad.Gen.Class/index.js";
import * as Control_Monad_Gen_Common from "../Control.Monad.Gen.Common/index.js";
import * as Data_Array from "../Data.Array/index.js";
import * as Data_Array_NonEmpty from "../Data.Array.NonEmpty/index.js";
import * as Data_Array_ST from "../Data.Array.ST/index.js";
import * as Data_Bounded from "../Data.Bounded/index.js";
import * as Data_Either from "../Data.Either/index.js";
import * as Data_Enum from "../Data.Enum/index.js";
import * as Data_Foldable from "../Data.Foldable/index.js";
import * as Data_Function from "../Data.Function/index.js";
import * as Data_Functor from "../Data.Functor/index.js";
import * as Data_Generic_Rep from "../Data.Generic.Rep/index.js";
import * as Data_Identity from "../Data.Identity/index.js";
import * as Data_Int from "../Data.Int/index.js";
import * as Data_Lazy from "../Data.Lazy/index.js";
import * as Data_List_Types from "../Data.List.Types/index.js";
import * as Data_Maybe from "../Data.Maybe/index.js";
import * as Data_Monoid_Additive from "../Data.Monoid.Additive/index.js";
import * as Data_Monoid_Conj from "../Data.Monoid.Conj/index.js";
import * as Data_Monoid_Disj from "../Data.Monoid.Disj/index.js";
import * as Data_Monoid_Dual from "../Data.Monoid.Dual/index.js";
import * as Data_Monoid_Endo from "../Data.Monoid.Endo/index.js";
import * as Data_Monoid_Multiplicative from "../Data.Monoid.Multiplicative/index.js";
import * as Data_Newtype from "../Data.Newtype/index.js";
import * as Data_NonEmpty from "../Data.NonEmpty/index.js";
import * as Data_Ordering from "../Data.Ordering/index.js";
import * as Data_Semigroup_First from "../Data.Semigroup.First/index.js";
import * as Data_Semigroup_Last from "../Data.Semigroup.Last/index.js";
import * as Data_String_CodeUnits from "../Data.String.CodeUnits/index.js";
import * as Data_String_Common from "../Data.String.Common/index.js";
import * as Data_String_NonEmpty_CodeUnits from "../Data.String.NonEmpty.CodeUnits/index.js";
import * as Data_String_NonEmpty_Internal from "../Data.String.NonEmpty.Internal/index.js";
import * as Data_Tuple from "../Data.Tuple/index.js";
import * as Data_Unit from "../Data.Unit/index.js";
import * as Record from "../Record/index.js";
import * as Test_QuickCheck_Gen from "../Test.QuickCheck.Gen/index.js";
import * as Type_Proxy from "../Type.Proxy/index.js";
var identity = /* #__PURE__ */ Control_Category.identity(Control_Category.categoryFn);
var foldl = /* #__PURE__ */ Data_Foldable.foldl(Data_List_Types.foldableList);
var fromEnum = /* #__PURE__ */ Data_Enum.fromEnum(Data_Enum.boundedEnumChar);
var foldl1 = /* #__PURE__ */ Data_Foldable.foldl(Data_Foldable.foldableArray);
var map = /* #__PURE__ */ Data_Functor.map(Data_Functor.functorArray);
var wrap = /* #__PURE__ */ Data_Newtype.wrap();
var pure = /* #__PURE__ */ Control_Applicative.pure(Test_QuickCheck_Gen.applicativeGen);
var map1 = /* #__PURE__ */ Data_Functor.map(Test_QuickCheck_Gen.functorGen);
var bind = /* #__PURE__ */ Control_Bind.bind(Test_QuickCheck_Gen.bindGen);
var apply = /* #__PURE__ */ Control_Apply.apply(Test_QuickCheck_Gen.applyGen);
var fromJust = /* #__PURE__ */ Data_Maybe.fromJust();
var genMaybe = /* #__PURE__ */ Control_Monad_Gen_Common.genMaybe(Test_QuickCheck_Gen.monadGenGen);
var genEither = /* #__PURE__ */ Control_Monad_Gen_Common.genEither(Test_QuickCheck_Gen.monadGenGen);
var coarbitraryNoArguments = {
    coarbitrary: function (v) {
        return identity;
    }
};
var coarbitrary = function (dict) {
    return dict.coarbitrary;
};
var coarbitraryArgument = function (dictCoarbitrary) {
    var coarbitrary3 = coarbitrary(dictCoarbitrary);
    return {
        coarbitrary: function (v) {
            return coarbitrary3(v);
        }
    };
};
var coarbitraryConstructor = function (dictCoarbitrary) {
    var coarbitrary3 = coarbitrary(dictCoarbitrary);
    return {
        coarbitrary: function (v) {
            return coarbitrary3(v);
        }
    };
};
var coarbitraryProduct = function (dictCoarbitrary) {
    var coarbitrary3 = coarbitrary(dictCoarbitrary);
    return function (dictCoarbitrary1) {
        var coarbitrary4 = coarbitrary(dictCoarbitrary1);
        return {
            coarbitrary: function (v) {
                var $211 = coarbitrary4(v.value1);
                var $212 = coarbitrary3(v.value0);
                return function ($213) {
                    return $211($212($213));
                };
            }
        };
    };
};
var coarbitrarySum = function (dictCoarbitrary) {
    var coarbitrary3 = coarbitrary(dictCoarbitrary);
    return function (dictCoarbitrary1) {
        var coarbitrary4 = coarbitrary(dictCoarbitrary1);
        return {
            coarbitrary: function (v) {
                if (v instanceof Data_Generic_Rep.Inl) {
                    return coarbitrary3(v.value0);
                };
                if (v instanceof Data_Generic_Rep.Inr) {
                    return coarbitrary4(v.value0);
                };
                throw new Error("Failed pattern match at Test.QuickCheck.Arbitrary (line 249, column 1 - line 251, column 38): " + [ v.constructor.name ]);
            }
        };
    };
};

// | A `Generic` implementation of the `coarbitrary` member from the `Coarbitrary` type class.
var genericCoarbitrary = function (dictGeneric) {
    var from = Data_Generic_Rep.from(dictGeneric);
    return function (dictCoarbitrary) {
        var coarbitrary3 = coarbitrary(dictCoarbitrary);
        return function (x) {
            return coarbitrary3(from(x));
        };
    };
};
var coarbUnit = {
    coarbitrary: function (v) {
        return Test_QuickCheck_Gen.perturbGen(1.0);
    }
};
var coarbTuple = function (dictCoarbitrary) {
    var coarbitrary3 = coarbitrary(dictCoarbitrary);
    return function (dictCoarbitrary1) {
        var coarbitrary4 = coarbitrary(dictCoarbitrary1);
        return {
            coarbitrary: function (v) {
                var $214 = coarbitrary4(v.value1);
                var $215 = coarbitrary3(v.value0);
                return function ($216) {
                    return $214($215($216));
                };
            }
        };
    };
};
var coarbOrdering = {
    coarbitrary: function (v) {
        if (v instanceof Data_Ordering.LT) {
            return Test_QuickCheck_Gen.perturbGen(1.0);
        };
        if (v instanceof Data_Ordering.EQ) {
            return Test_QuickCheck_Gen.perturbGen(2.0);
        };
        if (v instanceof Data_Ordering.GT) {
            return Test_QuickCheck_Gen.perturbGen(3.0);
        };
        throw new Error("Failed pattern match at Test.QuickCheck.Arbitrary (line 123, column 1 - line 126, column 34): " + [ v.constructor.name ]);
    }
};
var coarbNumber = {
    coarbitrary: Test_QuickCheck_Gen.perturbGen
};
var coarbNonEmpty = function (dictCoarbitrary) {
    var coarbitrary3 = coarbitrary(dictCoarbitrary);
    return function (dictCoarbitrary1) {
        var coarbitrary4 = coarbitrary(dictCoarbitrary1);
        return {
            coarbitrary: function (v) {
                var $217 = coarbitrary3(v.value1);
                var $218 = coarbitrary4(v.value0);
                return function ($219) {
                    return $217($218($219));
                };
            }
        };
    };
};
var coarbMaybe = function (dictCoarbitrary) {
    var coarbitrary3 = coarbitrary(dictCoarbitrary);
    return {
        coarbitrary: function (v) {
            if (v instanceof Data_Maybe.Nothing) {
                return Test_QuickCheck_Gen.perturbGen(1.0);
            };
            if (v instanceof Data_Maybe.Just) {
                return coarbitrary3(v.value0);
            };
            throw new Error("Failed pattern match at Test.QuickCheck.Arbitrary (line 187, column 1 - line 189, column 39): " + [ v.constructor.name ]);
        }
    };
};
var coarbList = function (dictCoarbitrary) {
    var coarbitrary3 = coarbitrary(dictCoarbitrary);
    return {
        coarbitrary: foldl(function (f) {
            return function (x) {
                var $220 = coarbitrary3(x);
                return function ($221) {
                    return f($220($221));
                };
            };
        })(identity)
    };
};
var coarbNonEmptyList = function (dictCoarbitrary) {
    var coarbitrary3 = coarbitrary(coarbNonEmpty(coarbList(dictCoarbitrary))(dictCoarbitrary));
    return {
        coarbitrary: function (v) {
            return coarbitrary3(v);
        }
    };
};
var coarbLazy = function (dictCoarbitrary) {
    var coarbitrary3 = coarbitrary(dictCoarbitrary);
    return {
        coarbitrary: function (a) {
            return coarbitrary3(Data_Lazy.force(a));
        }
    };
};
var coarbInt = {
    coarbitrary: function ($222) {
        return Test_QuickCheck_Gen.perturbGen(Data_Int.toNumber($222));
    }
};
var coarbitrary1 = /* #__PURE__ */ coarbitrary(coarbInt);
var coarbIdentity = function (dictCoarbitrary) {
    var coarbitrary3 = coarbitrary(dictCoarbitrary);
    return {
        coarbitrary: function (v) {
            return coarbitrary3(v);
        }
    };
};
var coarbEither = function (dictCoarbitrary) {
    var coarbitrary3 = coarbitrary(dictCoarbitrary);
    return function (dictCoarbitrary1) {
        var coarbitrary4 = coarbitrary(dictCoarbitrary1);
        return {
            coarbitrary: function (v) {
                if (v instanceof Data_Either.Left) {
                    return coarbitrary3(v.value0);
                };
                if (v instanceof Data_Either.Right) {
                    return coarbitrary4(v.value0);
                };
                throw new Error("Failed pattern match at Test.QuickCheck.Arbitrary (line 194, column 1 - line 196, column 40): " + [ v.constructor.name ]);
            }
        };
    };
};
var coarbChar = {
    coarbitrary: function (c) {
        return coarbitrary1(fromEnum(c));
    }
};
var coarbBoolean = {
    coarbitrary: function (v) {
        if (v) {
            return Test_QuickCheck_Gen.perturbGen(1.0);
        };
        if (!v) {
            return Test_QuickCheck_Gen.perturbGen(2.0);
        };
        throw new Error("Failed pattern match at Test.QuickCheck.Arbitrary (line 80, column 1 - line 82, column 37): " + [ v.constructor.name ]);
    }
};
var coarbArray = function (dictCoarbitrary) {
    var coarbitrary3 = coarbitrary(dictCoarbitrary);
    return {
        coarbitrary: foldl1(function (f) {
            return function (x) {
                var $223 = coarbitrary3(x);
                return function ($224) {
                    return f($223($224));
                };
            };
        })(identity)
    };
};
var coarbitrary2 = /* #__PURE__ */ coarbitrary(/* #__PURE__ */ coarbArray(/* #__PURE__ */ coarbMaybe(coarbChar)));
var coarbNonEmptyArray = function (dictCoarbitrary) {
    return {
        coarbitrary: (function () {
            var $225 = coarbitrary(coarbArray(dictCoarbitrary));
            return function ($226) {
                return $225(Data_Array_NonEmpty.toArray($226));
            };
        })()
    };
};
var coarbString = {
    coarbitrary: function (s) {
        return coarbitrary2(map(Data_String_CodeUnits.charAt(0))(Data_String_Common.split(wrap(""))(s)));
    }
};
var coarbNonEmptyString = {
    coarbitrary: /* #__PURE__ */ (function () {
        var $227 = coarbitrary(coarbString);
        return function ($228) {
            return $227(Data_String_NonEmpty_Internal.toString($228));
        };
    })()
};
var arbitraryRowListNil = {
    arbitraryRecord: function (v) {
        return pure({});
    }
};
var arbitraryRecord = function (dict) {
    return dict.arbitraryRecord;
};
var arbitraryRecordInstance = function () {
    return function (dictArbitraryRowList) {
        return {
            arbitrary: arbitraryRecord(dictArbitraryRowList)(Type_Proxy["Proxy"].value)
        };
    };
};
var arbitraryNoArguments = /* #__PURE__ */ (function () {
    return {
        arbitrary: pure(Data_Generic_Rep.NoArguments.value)
    };
})();
var arbitraryGenericSum = function (dict) {
    return dict.arbitraryGenericSum;
};
var arbitrary = function (dict) {
    return dict.arbitrary;
};
var arbitraryArgument = function (dictArbitrary) {
    return {
        arbitrary: map1(Data_Generic_Rep.Argument)(arbitrary(dictArbitrary))
    };
};
var arbitraryConstructor = function (dictArbitrary) {
    return {
        arbitrary: map1(Data_Generic_Rep.Constructor)(arbitrary(dictArbitrary))
    };
};
var arbitraryIdentity = function (dictArbitrary) {
    return {
        arbitrary: map1(Data_Identity.Identity)(arbitrary(dictArbitrary))
    };
};
var arbitraryLazy = function (dictArbitrary) {
    return {
        arbitrary: bind(arbitrary(dictArbitrary))(function ($229) {
            return pure(Data_Lazy.defer(Data_Function["const"]($229)));
        })
    };
};
var arbitraryList = function (dictArbitrary) {
    var arbitrary1 = arbitrary(dictArbitrary);
    return {
        arbitrary: Test_QuickCheck_Gen.sized(function (n) {
            return bind(Test_QuickCheck_Gen.chooseInt(0)(n))(Data_Function.flip(Test_QuickCheck_Gen.listOf)(arbitrary1));
        })
    };
};
var arbitraryProduct = function (dictArbitrary) {
    var arbitrary1 = arbitrary(dictArbitrary);
    return function (dictArbitrary1) {
        return {
            arbitrary: apply(map1(Data_Generic_Rep.Product.create)(arbitrary1))(arbitrary(dictArbitrary1))
        };
    };
};
var arbitraryRowListCons = function (dictArbitrary) {
    var arbitrary1 = arbitrary(dictArbitrary);
    return function (dictArbitraryRowList) {
        var arbitraryRecord1 = arbitraryRecord(dictArbitraryRowList);
        return function () {
            return function () {
                return function () {
                    return function (dictIsSymbol) {
                        var insert = Record.insert(dictIsSymbol)()();
                        return {
                            arbitraryRecord: function (v) {
                                return bind(arbitrary1)(function (value) {
                                    return bind(arbitraryRecord1(Type_Proxy["Proxy"].value))(function (previous) {
                                        return pure(insert(Type_Proxy["Proxy"].value)(value)(previous));
                                    });
                                });
                            }
                        };
                    };
                };
            };
        };
    };
};
var arbitrarySum = function (dictArbitrary) {
    var arbitrary1 = arbitrary(dictArbitrary);
    return function (dictArbitraryGenericSum) {
        return {
            arbitrary: Test_QuickCheck_Gen.oneOf(fromJust(Data_Array_NonEmpty.fromArray(Data_Array.cons(map1(Data_Generic_Rep.Inl.create)(arbitrary1))(map(map1(Data_Generic_Rep.Inr.create))(arbitraryGenericSum(dictArbitraryGenericSum))))))
        };
    };
};

// | A `Generic` implementation of the `arbitrary` member from the `Arbitrary` type class.
var genericArbitrary = function (dictGeneric) {
    var to = Data_Generic_Rep.to(dictGeneric);
    return function (dictArbitrary) {
        return map1(to)(arbitrary(dictArbitrary));
    };
};
var arbUnit = {
    arbitrary: /* #__PURE__ */ pure(Data_Unit.unit)
};
var arbTuple = function (dictArbitrary) {
    var arbitrary1 = arbitrary(dictArbitrary);
    return function (dictArbitrary1) {
        return {
            arbitrary: apply(map1(Data_Tuple.Tuple.create)(arbitrary1))(arbitrary(dictArbitrary1))
        };
    };
};
var arbOrdering = /* #__PURE__ */ (function () {
    return {
        arbitrary: Test_QuickCheck_Gen.elements(fromJust(Data_Array_NonEmpty.fromArray([ Data_Ordering.LT.value, Data_Ordering.EQ.value, Data_Ordering.GT.value ])))
    };
})();
var arbNumber = {
    arbitrary: Test_QuickCheck_Gen.uniform
};
var arbNonEmpty = function (dictArbitrary) {
    var arbitrary1 = arbitrary(dictArbitrary);
    return function (dictArbitrary1) {
        return {
            arbitrary: apply(map1(Data_NonEmpty.NonEmpty.create)(arbitrary(dictArbitrary1)))(arbitrary1)
        };
    };
};
var arbNonEmptyList = function (dictArbitrary) {
    return {
        arbitrary: map1(Data_List_Types.NonEmptyList)(arbitrary(arbNonEmpty(arbitraryList(dictArbitrary))(dictArbitrary)))
    };
};
var arbMultiplicative = function (dictArbitrary) {
    return {
        arbitrary: map1(Data_Monoid_Multiplicative.Multiplicative)(arbitrary(dictArbitrary))
    };
};
var arbMaybe = function (dictArbitrary) {
    return {
        arbitrary: genMaybe(arbitrary(dictArbitrary))
    };
};
var arbLast = function (dictArbitrary) {
    return {
        arbitrary: map1(Data_Semigroup_Last.Last)(arbitrary(dictArbitrary))
    };
};
var arbInt = /* #__PURE__ */ (function () {
    return {
        arbitrary: Test_QuickCheck_Gen.chooseInt(-1000000 | 0)(1000000)
    };
})();
var arbGenSumSum = function (dictArbitrary) {
    var arbitrary1 = arbitrary(dictArbitrary);
    return function (dictArbitraryGenericSum) {
        return {
            arbitraryGenericSum: Data_Array.cons(map1(Data_Generic_Rep.Inl.create)(arbitrary1))(map(map1(Data_Generic_Rep.Inr.create))(arbitraryGenericSum(dictArbitraryGenericSum)))
        };
    };
};
var arbGenSumConstructor = function (dictArbitrary) {
    return {
        arbitraryGenericSum: [ arbitrary(arbitraryConstructor(dictArbitrary)) ]
    };
};
var arbFunction = function (dictCoarbitrary) {
    var coarbitrary3 = coarbitrary(dictCoarbitrary);
    return function (dictArbitrary) {
        var arbitrary1 = arbitrary(dictArbitrary);
        return {
            arbitrary: Test_QuickCheck_Gen.repeatable(function (a) {
                return coarbitrary3(a)(arbitrary1);
            })
        };
    };
};
var arbFirst = function (dictArbitrary) {
    return {
        arbitrary: map1(Data_Semigroup_First.First)(arbitrary(dictArbitrary))
    };
};
var arbEndo = function (dictArbitrary) {
    return {
        arbitrary: map1(Data_Monoid_Endo.Endo)(arbitrary(dictArbitrary))
    };
};
var arbEither = function (dictArbitrary) {
    var arbitrary1 = arbitrary(dictArbitrary);
    return function (dictArbitrary1) {
        return {
            arbitrary: genEither(arbitrary1)(arbitrary(dictArbitrary1))
        };
    };
};
var arbDual = function (dictArbitrary) {
    return {
        arbitrary: map1(Data_Monoid_Dual.Dual)(arbitrary(dictArbitrary))
    };
};
var arbDisj = function (dictArbitrary) {
    return {
        arbitrary: map1(Data_Monoid_Disj.Disj)(arbitrary(dictArbitrary))
    };
};
var arbConj = function (dictArbitrary) {
    return {
        arbitrary: map1(Data_Monoid_Conj.Conj)(arbitrary(dictArbitrary))
    };
};
var arbChar = {
    arbitrary: /* #__PURE__ */ map1(/* #__PURE__ */ Data_Enum.toEnumWithDefaults(Data_Enum.boundedEnumChar)(/* #__PURE__ */ Data_Bounded.bottom(Data_Bounded.boundedChar))(/* #__PURE__ */ Data_Bounded.top(Data_Bounded.boundedChar)))(/* #__PURE__ */ Test_QuickCheck_Gen.chooseInt(0)(65536))
};
var arbBoolean = {
    arbitrary: /* #__PURE__ */ Control_Monad_Gen_Class.chooseBool(Test_QuickCheck_Gen.monadGenGen)
};
var arbArray = function (dictArbitrary) {
    return {
        arbitrary: Test_QuickCheck_Gen.arrayOf(arbitrary(dictArbitrary))
    };
};
var arbNonEmptyArray = function (dictArbitrary) {
    var arbitrary1 = arbitrary(arbArray(dictArbitrary));
    return {
        arbitrary: bind(arbitrary(dictArbitrary))(function (x) {
            return bind(arbitrary1)(function (xs) {
                return pure(fromJust(Data_Array_NonEmpty.fromArray((function __do() {
                    var mxs = Data_Array_ST.unsafeThaw(xs)();
                    Data_Array_ST.push(x)(mxs)();
                    return Data_Array_ST.unsafeFreeze(mxs)();
                })())));
            });
        })
    };
};
var arbString = {
    arbitrary: /* #__PURE__ */ map1(Data_String_CodeUnits.fromCharArray)(/* #__PURE__ */ arbitrary(/* #__PURE__ */ arbArray(arbChar)))
};
var arbNonEmptyString = {
    arbitrary: /* #__PURE__ */ apply(/* #__PURE__ */ map1(Data_String_NonEmpty_CodeUnits.cons)(/* #__PURE__ */ arbitrary(arbChar)))(/* #__PURE__ */ arbitrary(arbString))
};
var coarbFunction = function (dictArbitrary) {
    var arbitrary1 = arbitrary(arbArray(dictArbitrary));
    return function (dictCoarbitrary) {
        var coarbitrary3 = coarbitrary(coarbArray(dictCoarbitrary));
        return {
            coarbitrary: function (f) {
                return function (gen) {
                    return bind(arbitrary1)(function (xs) {
                        return coarbitrary3(map(f)(xs))(gen);
                    });
                };
            }
        };
    };
};
var arbAdditive = function (dictArbitrary) {
    return {
        arbitrary: map1(Data_Monoid_Additive.Additive)(arbitrary(dictArbitrary))
    };
};
export {
    arbitrary,
    coarbitrary,
    genericArbitrary,
    genericCoarbitrary,
    arbitraryGenericSum,
    arbitraryRecord,
    arbBoolean,
    coarbBoolean,
    arbNumber,
    coarbNumber,
    arbInt,
    coarbInt,
    arbString,
    coarbString,
    arbNonEmptyString,
    coarbNonEmptyString,
    arbChar,
    coarbChar,
    arbUnit,
    coarbUnit,
    arbOrdering,
    coarbOrdering,
    arbArray,
    coarbArray,
    arbNonEmptyArray,
    coarbNonEmptyArray,
    arbFunction,
    coarbFunction,
    arbFirst,
    arbLast,
    arbAdditive,
    arbMultiplicative,
    arbConj,
    arbDisj,
    arbDual,
    arbEndo,
    arbTuple,
    coarbTuple,
    arbMaybe,
    coarbMaybe,
    arbEither,
    coarbEither,
    arbitraryList,
    coarbList,
    arbitraryIdentity,
    coarbIdentity,
    arbitraryLazy,
    coarbLazy,
    arbNonEmpty,
    coarbNonEmpty,
    arbNonEmptyList,
    coarbNonEmptyList,
    arbitraryNoArguments,
    coarbitraryNoArguments,
    arbGenSumSum,
    arbGenSumConstructor,
    arbitrarySum,
    coarbitrarySum,
    arbitraryProduct,
    coarbitraryProduct,
    arbitraryConstructor,
    coarbitraryConstructor,
    arbitraryArgument,
    coarbitraryArgument,
    arbitraryRowListNil,
    arbitraryRowListCons,
    arbitraryRecordInstance
};

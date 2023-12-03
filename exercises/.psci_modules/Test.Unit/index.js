import * as Control_Alt from "../Control.Alt/index.js";
import * as Control_Applicative from "../Control.Applicative/index.js";
import * as Control_Bind from "../Control.Bind/index.js";
import * as Control_Monad_Error_Class from "../Control.Monad.Error.Class/index.js";
import * as Control_Monad_Free from "../Control.Monad.Free/index.js";
import * as Control_Monad_Rec_Class from "../Control.Monad.Rec.Class/index.js";
import * as Control_Monad_State from "../Control.Monad.State/index.js";
import * as Control_Monad_State_Class from "../Control.Monad.State.Class/index.js";
import * as Control_Monad_State_Trans from "../Control.Monad.State.Trans/index.js";
import * as Control_Parallel_Class from "../Control.Parallel.Class/index.js";
import * as Data_Boolean from "../Data.Boolean/index.js";
import * as Data_Either from "../Data.Either/index.js";
import * as Data_Foldable from "../Data.Foldable/index.js";
import * as Data_Function from "../Data.Function/index.js";
import * as Data_Functor from "../Data.Functor/index.js";
import * as Data_HeytingAlgebra from "../Data.HeytingAlgebra/index.js";
import * as Data_Identity from "../Data.Identity/index.js";
import * as Data_Int from "../Data.Int/index.js";
import * as Data_List from "../Data.List/index.js";
import * as Data_List_Types from "../Data.List.Types/index.js";
import * as Data_Newtype from "../Data.Newtype/index.js";
import * as Data_Semiring from "../Data.Semiring/index.js";
import * as Data_Show from "../Data.Show/index.js";
import * as Data_Traversable from "../Data.Traversable/index.js";
import * as Data_Tuple from "../Data.Tuple/index.js";
import * as Data_Unit from "../Data.Unit/index.js";
import * as Effect_Aff from "../Effect.Aff/index.js";
import * as Effect_Aff_AVar from "../Effect.Aff.AVar/index.js";
import * as Effect_Exception from "../Effect.Exception/index.js";
var pure = /* #__PURE__ */ Control_Applicative.pure(Effect_Aff.applicativeAff);
var show = /* #__PURE__ */ Data_Show.show(Data_Show.showBoolean);
var discard = /* #__PURE__ */ Control_Bind.discard(Control_Bind.discardUnit)(Effect_Aff.bindAff);
var throwError = /* #__PURE__ */ Control_Monad_Error_Class.throwError(Effect_Aff.monadThrowAff);
var show1 = /* #__PURE__ */ Data_Show.show(Data_Show.showInt);
var bind = /* #__PURE__ */ Control_Bind.bind(Effect_Aff.bindAff);
var sequential = /* #__PURE__ */ Control_Parallel_Class.sequential(Effect_Aff.parallelAff);
var alt = /* #__PURE__ */ Control_Alt.alt(Effect_Aff.altParAff);
var parallel = /* #__PURE__ */ Control_Parallel_Class.parallel(Effect_Aff.parallelAff);
var over2 = /* #__PURE__ */ Data_Newtype.over2()();
var conj = /* #__PURE__ */ Data_HeytingAlgebra.conj(Data_HeytingAlgebra.heytingAlgebraBoolean);
var not = /* #__PURE__ */ Data_HeytingAlgebra.not(Data_HeytingAlgebra.heytingAlgebraBoolean);
var voidLeft = /* #__PURE__ */ Data_Functor.voidLeft(/* #__PURE__ */ Control_Monad_State_Trans.functorStateT(Data_Identity.functorIdentity));
var modify = /* #__PURE__ */ Control_Monad_State_Class.modify(/* #__PURE__ */ Control_Monad_State_Trans.monadStateStateT(Data_Identity.monadIdentity));
var pure1 = /* #__PURE__ */ Control_Applicative.pure(/* #__PURE__ */ Control_Monad_State_Trans.applicativeStateT(Data_Identity.monadIdentity));
var foldFree = /* #__PURE__ */ Control_Monad_Free.foldFree(/* #__PURE__ */ Control_Monad_State_Trans.monadRecStateT(Control_Monad_Rec_Class.monadRecIdentity));
var un = /* #__PURE__ */ Data_Newtype.un();
var add = /* #__PURE__ */ Data_Semiring.add(Data_Semiring.semiringInt);
var map = /* #__PURE__ */ Data_Functor.map(Effect_Aff.functorAff);
var $$for = /* #__PURE__ */ Data_Traversable["for"](Effect_Aff.applicativeAff)(Data_List_Types.traversableList);
var Skip = function (x) {
    return x;
};
var Only = function (x) {
    return x;
};
var Group = /* #__PURE__ */ (function () {
    function Group(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    Group.create = function (value0) {
        return function (value1) {
            return new Group(value0, value1);
        };
    };
    return Group;
})();
var TestGroup = /* #__PURE__ */ (function () {
    function TestGroup(value0, value1, value2, value3) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
    };
    TestGroup.create = function (value0) {
        return function (value1) {
            return function (value2) {
                return function (value3) {
                    return new TestGroup(value0, value1, value2, value3);
                };
            };
        };
    };
    return TestGroup;
})();
var TestUnit = /* #__PURE__ */ (function () {
    function TestUnit(value0, value1, value2, value3, value4) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
        this.value4 = value4;
    };
    TestUnit.create = function (value0) {
        return function (value1) {
            return function (value2) {
                return function (value3) {
                    return function (value4) {
                        return new TestUnit(value0, value1, value2, value3, value4);
                    };
                };
            };
        };
    };
    return TestUnit;
})();
var SkipUnit = /* #__PURE__ */ (function () {
    function SkipUnit(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    SkipUnit.create = function (value0) {
        return function (value1) {
            return new SkipUnit(value0, value1);
        };
    };
    return SkipUnit;
})();

// | Skip a test.
var testSkip = function (l) {
    return function (t) {
        return Control_Monad_Free.liftF(new TestUnit(l, true, false, t, Data_Unit.unit));
    };
};

// | `xit` is an alias for `testSkip`.
var xit = testSkip;

// | Run only this test.
var testOnly = function (l) {
    return function (t) {
        return Control_Monad_Free.liftF(new TestUnit(l, false, true, t, Data_Unit.unit));
    };
};

// | Define a labelled test.
var test = function (l) {
    return function (t) {
        return Control_Monad_Free.liftF(new TestUnit(l, false, false, t, Data_Unit.unit));
    };
};

// | Skip this suite.
var suiteSkip = function (label) {
    return function (tests) {
        return Control_Monad_Free.liftF(new TestGroup(new Group(label, tests), true, false, Data_Unit.unit));
    };
};

// | `xdescribe` is an alias for `suiteSkip`.
var xdescribe = suiteSkip;

// | Run only this suite.
var suiteOnly = function (label) {
    return function (tests) {
        return Control_Monad_Free.liftF(new TestGroup(new Group(label, tests), false, true, Data_Unit.unit));
    };
};

// | Define a test suite, which can contain a number of nested suites
// | as well as tests.
var suite = function (label) {
    return function (tests) {
        return Control_Monad_Free.liftF(new TestGroup(new Group(label, tests), false, false, Data_Unit.unit));
    };
};

// | The basic value for a succeeding test.
var success = /* #__PURE__ */ pure(Data_Unit.unit);
var skipUnit = function (t) {
    return function (a) {
        return Control_Monad_Free.liftF(SkipUnit.create(t)(a));
    };
};
var showOnly = {
    show: function (v) {
        return show(v);
    }
};
var newtypeSkip = {
    Coercible0: function () {
        return undefined;
    }
};
var newtypeOnly = {
    Coercible0: function () {
        return undefined;
    }
};
var makeTimeout = function (time) {
    return discard(Effect_Aff.delay(Data_Int.toNumber(time)))(function () {
        return throwError(Effect_Exception.error("test timed out after " + (show1(time) + "ms")));
    });
};

// | Set a test to fail after a given number of milliseconds.
var timeout = function (time) {
    return function (t) {
        return bind(sequential(alt(parallel(Effect_Aff.attempt(makeTimeout(time))))(parallel(Effect_Aff.attempt(t)))))(function (r) {
            return Data_Either.either(throwError)(Data_Function["const"](success))(r);
        });
    };
};

// | Filter successes out of a list of test results.
var keepErrors = /* #__PURE__ */ (function () {
    var run = function (v) {
        return function (v1) {
            if (v1.value1 instanceof Data_Either.Left) {
                return Data_List.snoc(v)(new Data_Tuple.Tuple(v1.value0, v1.value1.value0));
            };
            return v;
        };
    };
    return Data_Foldable.foldl(Data_List_Types.foldableList)(run)(Data_List_Types.Nil.value);
})();

// | `it` is an alias for `test` for BDD enthusiasts.
var it = test;
var haytingAlgebraOnly = {
    ff: false,
    tt: true,
    implies: /* #__PURE__ */ over2(Only)(/* #__PURE__ */ Data_HeytingAlgebra.implies(Data_HeytingAlgebra.heytingAlgebraBoolean)),
    conj: /* #__PURE__ */ over2(Only)(conj),
    disj: /* #__PURE__ */ over2(Only)(/* #__PURE__ */ Data_HeytingAlgebra.disj(Data_HeytingAlgebra.heytingAlgebraBoolean)),
    not: /* #__PURE__ */ Data_Newtype.over()()(Only)(not)
};
var heytingAlgebraTuple = /* #__PURE__ */ Data_Tuple.heytingAlgebraTuple(haytingAlgebraOnly)(haytingAlgebraOnly);
var disj = /* #__PURE__ */ Data_HeytingAlgebra.disj(heytingAlgebraTuple);
var ff = /* #__PURE__ */ Data_HeytingAlgebra.ff(haytingAlgebraOnly);
var ff1 = /* #__PURE__ */ Data_HeytingAlgebra.ff(heytingAlgebraTuple);
var conj1 = /* #__PURE__ */ Data_HeytingAlgebra.conj(haytingAlgebraOnly);
var implies = /* #__PURE__ */ Data_HeytingAlgebra.implies(haytingAlgebraOnly);

// | Find if there are suites and tests with `Only true` flag.
// | Returns a tuple where the first factor is `Only true` iff there is a suite
// | with only flag set to true, and the second factor is `Only true` iff there
// | is a test with only flag set to true.
var hasOnly = function (t) {
    var go = function (v) {
        if (v instanceof TestGroup) {
            return voidLeft(modify((function () {
                var $199 = disj(hasOnly(v.value0.value1));
                var $200 = disj(new Data_Tuple.Tuple(v.value2, ff));
                return function ($201) {
                    return $199($200($201));
                };
            })()))(v.value3);
        };
        if (v instanceof TestUnit) {
            return voidLeft(modify(disj(new Data_Tuple.Tuple(ff, v.value2))))(v.value4);
        };
        if (v instanceof SkipUnit) {
            return pure1(v.value1);
        };
        throw new Error("Failed pattern match at Test.Unit (line 135, column 5 - line 135, column 43): " + [ v.constructor.name ]);
    };
    return Control_Monad_State.execState(foldFree(go)(t))(ff1);
};
var functorTestF = {
    map: function (v) {
        return function (v1) {
            if (v1 instanceof TestGroup) {
                return new TestGroup(v1.value0, v1.value1, v1.value2, v(v1.value3));
            };
            if (v1 instanceof TestUnit) {
                return new TestUnit(v1.value0, v1.value1, v1.value2, v1.value3, v(v1.value4));
            };
            if (v1 instanceof SkipUnit) {
                return new SkipUnit(Data_Functor.map(functorTestF)(v)(v1.value0), v(v1.value1));
            };
            throw new Error("Failed pattern match at Test.Unit (line 98, column 1 - line 101, column 50): " + [ v.constructor.name, v1.constructor.name ]);
        };
    }
};
var runFreeM = /* #__PURE__ */ Control_Monad_Free.runFreeM(functorTestF)(Effect_Aff.monadRecAff);

// | Walk through a test suite, calling the provided function for each item,
// | and returning a `TestList` of all tests walked. The tests won't actually
// | run unless you run them explicitly from your walker function.
var walkSuite = function (runItem) {
    return function (tests) {
        return bind(Effect_Aff_AVar["new"](Data_List_Types.Nil.value))(function (coll) {
            var walkItem = function (v) {
                return function (v1) {
                    if (v1 instanceof TestGroup) {
                        return discard(runItem(v)(new Data_Either.Left(v1.value0.value0)))(function () {
                            return discard(runFreeM(walkItem(Data_List.snoc(v)(v1.value0.value0)))(v1.value0.value1))(function () {
                                return pure(v1.value3);
                            });
                        });
                    };
                    if (v1 instanceof TestUnit) {
                        return bind(Effect_Aff.suspendAff(v1.value3))(function (fiber) {
                            return bind(Effect_Aff_AVar.take(coll))(function (cs) {
                                return discard(Effect_Aff_AVar.put(new Data_List_Types.Cons(new Data_Tuple.Tuple(Data_List.snoc(v)(v1.value0), Effect_Aff.joinFiber(fiber)), cs))(coll))(function () {
                                    return discard(runItem(v)(new Data_Either.Right(new Data_Tuple.Tuple(v1.value0, Effect_Aff.joinFiber(fiber)))))(function () {
                                        return pure(v1.value4);
                                    });
                                });
                            });
                        });
                    };
                    if (v1 instanceof SkipUnit) {
                        return pure(v1.value1);
                    };
                    throw new Error("Failed pattern match at Test.Unit (line 205, column 7 - line 208, column 18): " + [ v.constructor.name, v1.constructor.name ]);
                };
            };
            return discard(runFreeM(walkItem(Data_List_Types.Nil.value))(tests))(function () {
                return bind(Effect_Aff_AVar.take(coll))(function (res) {
                    return pure(res);
                });
            });
        });
    };
};

// | `fit` is an alias for `testOnly`.
var fit = testOnly;
var filterEmptyNodes = /* #__PURE__ */ (function () {
    var isEmpty = function (t) {
        return Control_Monad_State.execState(foldFree(empty)(t))(true);
    };
    var empty = function (v) {
        if (v instanceof TestGroup) {
            return voidLeft(modify(conj(isEmpty(v.value0.value1))))(v.value3);
        };
        if (v instanceof TestUnit) {
            return voidLeft(modify(conj(false)))(v.value4);
        };
        if (v instanceof SkipUnit) {
            return pure1(v.value1);
        };
        throw new Error("Failed pattern match at Test.Unit (line 152, column 5 - line 152, column 36): " + [ v.constructor.name ]);
    };
    var go = function (v) {
        if (v instanceof TestGroup) {
            if (isEmpty(v.value0.value1)) {
                return skipUnit(v)(v.value3);
            };
            if (Data_Boolean.otherwise) {
                return Control_Monad_Free.liftF(v);
            };
        };
        return Control_Monad_Free.liftF(v);
    };
    return Control_Monad_Free.substFree(go);
})();

// | Filter suites and tests with `Only` and `Skip` flags and removes suites
// | that do not contain any tests.
var filterTests = function (t) {
    var v = hasOnly(t);
    var go = function (v1) {
        return function (v2) {
            if (v2 instanceof TestGroup) {
                var $134 = un(Skip)(v2.value1);
                if ($134) {
                    return skipUnit(v2)(v2.value3);
                };
                return Control_Monad_Free.liftF(new TestGroup(new Group(v2.value0.value0, Control_Monad_Free.substFree(go(v2.value2))(v2.value0.value1)), v2.value1, v2.value2, v2.value3));
            };
            if (v2 instanceof TestUnit) {
                var v3 = un(Only)(conj1(implies(v.value0)(v1))(implies(v.value1)(v2.value2))) && !un(Skip)(v2.value1);
                if (v3) {
                    return Control_Monad_Free.liftF(v2);
                };
                if (!v3) {
                    return skipUnit(v2)(v2.value4);
                };
                throw new Error("Failed pattern match at Test.Unit (line 187, column 11 - line 189, column 35): " + [ v3.constructor.name ]);
            };
            if (v2 instanceof SkipUnit) {
                return Control_Monad_Free.liftF(v2);
            };
            throw new Error("Failed pattern match at Test.Unit (line 181, column 7 - line 181, column 40): " + [ v1.constructor.name, v2.constructor.name ]);
        };
    };
    return filterEmptyNodes(Control_Monad_Free.substFree(go(false))(t));
};

// | `fdescribe` is an alias for `suiteOnly`.
var fdescribe = suiteOnly;

// | Make a failing test, given a reason for the failure.
var failure = function ($202) {
    return throwError(Effect_Exception.error($202));
};

// Some aliases to keep Dan North happy.
// | `describe` is an alias for `suite` for BDD enthusiasts.
var describe = suite;
var countTests = function (ts) {
    var go = function (v) {
        if (v instanceof SkipUnit) {
            return pure1(v.value1);
        };
        if (v instanceof TestUnit) {
            return voidLeft(modify(add(1)))(v.value4);
        };
        if (v instanceof TestGroup) {
            return voidLeft(modify(add(countTests(v.value0.value1))))(v.value3);
        };
        throw new Error("Failed pattern match at Test.Unit (line 160, column 5 - line 160, column 29): " + [ v.constructor.name ]);
    };
    return Control_Monad_State.execState(foldFree(go)(ts))(0);
};
var countSkippedTests = function (ts) {
    var go = function (v) {
        if (v instanceof SkipUnit && v.value0 instanceof TestUnit) {
            return voidLeft(modify(add(1)))(v.value1);
        };
        if (v instanceof SkipUnit && v.value0 instanceof TestGroup) {
            return voidLeft(modify(add(countTests(v.value0.value0.value1))))(v.value1);
        };
        if (v instanceof SkipUnit && v.value0 instanceof SkipUnit) {
            return pure1(v.value1);
        };
        if (v instanceof TestUnit) {
            return pure1(v.value4);
        };
        if (v instanceof TestGroup) {
            return voidLeft(modify(add(countSkippedTests(v.value0.value1))))(v.value3);
        };
        throw new Error("Failed pattern match at Test.Unit (line 168, column 5 - line 168, column 29): " + [ v.constructor.name ]);
    };
    return Control_Monad_State.execState(foldFree(go)(ts))(0);
};

// | Walk through a test suite, returning a `TestList` of all tests walked.
// | This operation will not actually run the tests.
var collectTests = /* #__PURE__ */ (function () {
    var $203 = map(Data_List.reverse);
    var $204 = walkSuite(function (v) {
        return function (v1) {
            return pure(Data_Unit.unit);
        };
    });
    return function ($205) {
        return $203($204($205));
    };
})();

// | Run a list of tests and collect each test result.
var collectResults = function (tests) {
    var run = function (v) {
        return map(Data_Tuple.Tuple.create(v.value0))(Effect_Aff.attempt(v.value1));
    };
    return $$for(tests)(run);
};
export {
    TestGroup,
    TestUnit,
    SkipUnit,
    Group,
    Skip,
    Only,
    success,
    failure,
    timeout,
    test,
    testOnly,
    testSkip,
    suite,
    suiteOnly,
    suiteSkip,
    walkSuite,
    filterTests,
    collectTests,
    collectResults,
    countSkippedTests,
    keepErrors,
    describe,
    it,
    newtypeSkip,
    newtypeOnly,
    showOnly,
    haytingAlgebraOnly,
    functorTestF
};

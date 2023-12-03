import * as Control_Applicative from "../Control.Applicative/index.js";
import * as Control_Bind from "../Control.Bind/index.js";
import * as Data_Either from "../Data.Either/index.js";
import * as Data_Foldable from "../Data.Foldable/index.js";
import * as Data_Functor from "../Data.Functor/index.js";
import * as Data_List from "../Data.List/index.js";
import * as Data_List_Types from "../Data.List.Types/index.js";
import * as Data_Maybe from "../Data.Maybe/index.js";
import * as Data_Monoid from "../Data.Monoid/index.js";
import * as Data_Show from "../Data.Show/index.js";
import * as Effect from "../Effect/index.js";
import * as Effect_Aff from "../Effect.Aff/index.js";
import * as Effect_Class from "../Effect.Class/index.js";
import * as Effect_Exception from "../Effect.Exception/index.js";
import * as Test_Unit from "../Test.Unit/index.js";
import * as Test_Unit_Console from "../Test.Unit.Console/index.js";
var mempty = /* #__PURE__ */ Data_Monoid.mempty(Data_Monoid.monoidString);
var liftEffect = /* #__PURE__ */ Effect_Class.liftEffect(Effect_Aff.monadEffectAff);
var discard = /* #__PURE__ */ Control_Bind.discard(Control_Bind.discardUnit);
var $$void = /* #__PURE__ */ Data_Functor["void"](Effect.functorEffect);
var discard2 = /* #__PURE__ */ discard(Effect_Aff.bindAff);
var bind = /* #__PURE__ */ Control_Bind.bind(Effect_Aff.bindAff);
var void1 = /* #__PURE__ */ Data_Functor["void"](Effect_Aff.functorAff);
var traverse_ = /* #__PURE__ */ Data_Foldable.traverse_(Effect.applicativeEffect)(Data_List_Types.foldableList);
var show = /* #__PURE__ */ Data_Show.show(Data_Show.showInt);
var pure = /* #__PURE__ */ Control_Applicative.pure(Effect_Aff.applicativeAff);
var indent = function (v) {
    if (v === 0) {
        return mempty;
    };
    return "  " + indent(v - 1 | 0);
};
var indent$prime = function ($41) {
    return indent(Data_List.length($41));
};
var printLive = function (tst) {
    var runSuiteItem = function (v) {
        return function (v1) {
            if (v1 instanceof Data_Either.Left) {
                return liftEffect(function __do() {
                    Test_Unit_Console.print(indent$prime(v))();
                    Test_Unit_Console.print("\u2192 Suite: ")();
                    Test_Unit_Console.printLabel(v1.value0)();
                    return $$void(Test_Unit_Console.print("\x0a"))();
                });
            };
            if (v1 instanceof Data_Either.Right) {
                return discard2(liftEffect(function __do() {
                    Test_Unit_Console.print(indent$prime(v))();
                    Test_Unit_Console.savePos();
                    Test_Unit_Console.print("\u2192 Running: ")();
                    Test_Unit_Console.printLabel(v1.value0.value0)();
                    return Test_Unit_Console.restorePos();
                }))(function () {
                    return bind(Effect_Aff.attempt(v1.value0.value1))(function (result) {
                        return void1((function () {
                            if (result instanceof Data_Either.Right) {
                                return liftEffect(function __do() {
                                    Test_Unit_Console.eraseLine();
                                    Test_Unit_Console.printPass("\u2713 Passed: ")();
                                    Test_Unit_Console.printLabel(v1.value0.value0)();
                                    return Test_Unit_Console.print("\x0a")();
                                });
                            };
                            if (result instanceof Data_Either.Left) {
                                return liftEffect(function __do() {
                                    Test_Unit_Console.eraseLine();
                                    Test_Unit_Console.printFail("\u2620 Failed: ")();
                                    Test_Unit_Console.printLabel(v1.value0.value0)();
                                    Test_Unit_Console.print(" because ")();
                                    Test_Unit_Console.printFail(Effect_Exception.message(result.value0))();
                                    return Test_Unit_Console.print("\x0a")();
                                });
                            };
                            throw new Error("Failed pattern match at Test.Unit.Output.Fancy (line 42, column 14 - line 54, column 21): " + [ result.constructor.name ]);
                        })());
                    });
                });
            };
            throw new Error("Failed pattern match at Test.Unit.Output.Fancy (line 28, column 5 - line 33, column 26): " + [ v.constructor.name, v1.constructor.name ]);
        };
    };
    return Test_Unit.walkSuite(runSuiteItem)(tst);
};
var printErrors = function (tests) {
    return function (skCount) {
        var printHeader = function (level) {
            return function (path) {
                var v = Data_List.uncons(path);
                if (v instanceof Data_Maybe.Nothing) {
                    return Test_Unit_Console.print(indent(level));
                };
                if (v instanceof Data_Maybe.Just) {
                    return function __do() {
                        Test_Unit_Console.print(indent(level) + ("In \"" + (v.value0.head + "\":\x0a")))();
                        return printHeader(level + 1 | 0)(v.value0.tail)();
                    };
                };
                throw new Error("Failed pattern match at Test.Unit.Output.Fancy (line 79, column 34 - line 83, column 41): " + [ v.constructor.name ]);
            };
        };
        var printError = function (err) {
            return function __do() {
                Data_Maybe.maybe(Test_Unit_Console.printFail(Effect_Exception.message(err)))(Test_Unit_Console.printFail)(Effect_Exception.stack(err))();
                return Test_Unit_Console.print("\x0a")();
            };
        };
        var printItem = function (v) {
            return function __do() {
                printHeader(0)(v.value0)();
                printError(v.value1)();
                return Test_Unit_Console.print("\x0a")();
            };
        };
        var list = traverse_(printItem);
        return bind(Test_Unit.collectResults(tests))(function (results) {
            var skMsg = (function () {
                if (skCount === 0) {
                    return "";
                };
                if (skCount === 1) {
                    return " (1 test skipped)";
                };
                return " (" + (show(skCount) + " tests skipped)");
            })();
            var errors = Test_Unit.keepErrors(results);
            return liftEffect((function () {
                var v = Data_List.length(errors);
                if (v === 0) {
                    return Test_Unit_Console.printPass("\x0aAll " + (show(Data_List.length(results)) + (" tests passed" + (skMsg + "! \ud83c\udf89\x0a"))));
                };
                if (v === 1) {
                    return function __do() {
                        Test_Unit_Console.printFail("\x0a1 test failed" + (skMsg + ":\x0a\x0a"))();
                        return list(errors)();
                    };
                };
                return function __do() {
                    Test_Unit_Console.printFail("\x0a" + (show(v) + (" tests failed" + (skMsg + ":\x0a\x0a"))))();
                    return list(errors)();
                };
            })());
        });
    };
};
var runTest = function (suite) {
    return bind(printLive(suite))(function (tests) {
        return discard2(printErrors(tests)(Test_Unit.countSkippedTests(suite)))(function () {
            return pure(tests);
        });
    });
};
export {
    runTest
};

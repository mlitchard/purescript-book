import * as Control_Applicative from "../Control.Applicative/index.js";
import * as Control_Bind from "../Control.Bind/index.js";
import * as Data_Either from "../Data.Either/index.js";
import * as Data_Foldable from "../Data.Foldable/index.js";
import * as Data_List from "../Data.List/index.js";
import * as Data_List_Types from "../Data.List.Types/index.js";
import * as Data_Maybe from "../Data.Maybe/index.js";
import * as Data_Monoid from "../Data.Monoid/index.js";
import * as Data_Show from "../Data.Show/index.js";
import * as Data_Unit from "../Data.Unit/index.js";
import * as Effect_Aff from "../Effect.Aff/index.js";
import * as Effect_Exception from "../Effect.Exception/index.js";
import * as Test_Unit from "../Test.Unit/index.js";
import * as Test_Unit_Console from "../Test.Unit.Console/index.js";
var mempty = /* #__PURE__ */ Data_Monoid.mempty(Data_Monoid.monoidString);
var discard = /* #__PURE__ */ Control_Bind.discard(Control_Bind.discardUnit)(Effect_Aff.bindAff);
var log = /* #__PURE__ */ Test_Unit_Console.log(Effect_Aff.monadEffectAff);
var pure = /* #__PURE__ */ Control_Applicative.pure(Effect_Aff.applicativeAff);
var bind = /* #__PURE__ */ Control_Bind.bind(Effect_Aff.bindAff);
var traverse_ = /* #__PURE__ */ Data_Foldable.traverse_(Effect_Aff.applicativeAff)(Data_List_Types.foldableList);
var show = /* #__PURE__ */ Data_Show.show(Data_Show.showInt);
var indent = function (v) {
    if (v === 0) {
        return mempty;
    };
    return "  " + indent(v - 1 | 0);
};
var indent$prime = function ($38) {
    return indent(Data_List.length($38));
};
var printLive = function (tst) {
    var runSuiteItem = function (v) {
        return function (v1) {
            if (v1 instanceof Data_Either.Left) {
                return discard(log(indent$prime(v) + ("- Suite: " + v1.value0)))(function () {
                    return pure(Data_Unit.unit);
                });
            };
            if (v1 instanceof Data_Either.Right) {
                return bind(Effect_Aff.attempt(v1.value0.value1))(function (result) {
                    return discard((function () {
                        if (result instanceof Data_Either.Right) {
                            return log(indent$prime(v) + ("\u2713 Passed: " + v1.value0.value0));
                        };
                        if (result instanceof Data_Either.Left) {
                            return log(indent$prime(v) + ("\u2620 Failed: " + (v1.value0.value0 + (" because " + Effect_Exception.message(result.value0)))));
                        };
                        throw new Error("Failed pattern match at Test.Unit.Output.Simple (line 32, column 7 - line 36, column 59): " + [ result.constructor.name ]);
                    })())(function () {
                        return pure(Data_Unit.unit);
                    });
                });
            };
            throw new Error("Failed pattern match at Test.Unit.Output.Simple (line 27, column 5 - line 29, column 16): " + [ v.constructor.name, v1.constructor.name ]);
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
                    return pure(Data_Unit.unit);
                };
                if (v instanceof Data_Maybe.Just) {
                    return discard(log(indent(level) + ("In \"" + (v.value0.head + "\":"))))(function () {
                        return printHeader(level + 1 | 0)(v.value0.tail);
                    });
                };
                throw new Error("Failed pattern match at Test.Unit.Output.Simple (line 61, column 34 - line 65, column 41): " + [ v.constructor.name ]);
            };
        };
        var printError = function (err) {
            return log("Error: " + Data_Maybe.fromMaybe(Effect_Exception.message(err))(Effect_Exception.stack(err)));
        };
        var print = function (v) {
            return discard(printHeader(0)(v.value0))(function () {
                return discard(printError(v.value1))(function () {
                    return log("");
                });
            });
        };
        var list = traverse_(print);
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
            return discard(log(""))(function () {
                var v = Data_List.length(errors);
                if (v === 0) {
                    return log("All " + (show(Data_List.length(results)) + (" tests passed" + (skMsg + "!"))));
                };
                if (v === 1) {
                    return discard(log("1 test failed" + (skMsg + ":\x0a")))(function () {
                        return list(errors);
                    });
                };
                return discard(log(show(v) + (" tests failed" + (skMsg + ":\x0a"))))(function () {
                    return list(errors);
                });
            });
        });
    };
};
var runTest = function (suite) {
    return bind(printLive(suite))(function (tests) {
        return discard(printErrors(tests)(Test_Unit.countSkippedTests(suite)))(function () {
            return pure(tests);
        });
    });
};
export {
    runTest
};

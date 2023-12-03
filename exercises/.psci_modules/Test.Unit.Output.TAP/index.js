import * as $foreign from "./foreign.js";
import * as Control_Applicative from "../Control.Applicative/index.js";
import * as Control_Bind from "../Control.Bind/index.js";
import * as Data_Either from "../Data.Either/index.js";
import * as Data_Foldable from "../Data.Foldable/index.js";
import * as Data_Functor from "../Data.Functor/index.js";
import * as Data_List from "../Data.List/index.js";
import * as Data_List_Types from "../Data.List.Types/index.js";
import * as Data_Maybe from "../Data.Maybe/index.js";
import * as Data_Semigroup from "../Data.Semigroup/index.js";
import * as Data_Show from "../Data.Show/index.js";
import * as Data_String_Common from "../Data.String.Common/index.js";
import * as Data_Tuple from "../Data.Tuple/index.js";
import * as Data_Unfoldable from "../Data.Unfoldable/index.js";
import * as Data_Unit from "../Data.Unit/index.js";
import * as Effect_Aff from "../Effect.Aff/index.js";
import * as Effect_Exception from "../Effect.Exception/index.js";
import * as Test_Unit from "../Test.Unit/index.js";
import * as Test_Unit_Console from "../Test.Unit.Console/index.js";
var pure = /* #__PURE__ */ Control_Applicative.pure(Effect_Aff.applicativeAff);
var discard = /* #__PURE__ */ Control_Bind.discard(Control_Bind.discardUnit)(Effect_Aff.bindAff);
var log = /* #__PURE__ */ Test_Unit_Console.log(Effect_Aff.monadEffectAff);
var map = /* #__PURE__ */ Data_Functor.map(Data_Functor.functorArray);
var append = /* #__PURE__ */ Data_Semigroup.append(Data_Semigroup.semigroupString);
var toUnfoldable = /* #__PURE__ */ Data_List.toUnfoldable(Data_Unfoldable.unfoldableArray);
var bind = /* #__PURE__ */ Control_Bind.bind(Effect_Aff.bindAff);
var show = /* #__PURE__ */ Data_Show.show(Data_Show.showInt);
var foldl = /* #__PURE__ */ Data_Foldable.foldl(Data_List_Types.foldableList);
var sequence_ = /* #__PURE__ */ Data_Foldable.sequence_(Effect_Aff.applicativeAff)(Data_List_Types.foldableList);
var printStack = function (err) {
    var v = Effect_Exception.stack(err);
    if (v instanceof Data_Maybe.Nothing) {
        return pure(Data_Unit.unit);
    };
    if (v instanceof Data_Maybe.Just) {
        return discard(log("  stack: |-"))(function () {
            return log(Data_String_Common.joinWith("\x0a")(map(append("    "))(Data_String_Common.split("\x0a")(v.value0))));
        });
    };
    throw new Error("Failed pattern match at Test.Unit.Output.TAP (line 22, column 18 - line 26, column 67): " + [ v.constructor.name ]);
};
var runTest = function (suite) {
    var run = function (v) {
        return function (v1) {
            return new Data_Tuple.Tuple(v.value0 + 1 | 0, Data_List.snoc(v.value1)((function () {
                var label = Data_String_Common.joinWith(" / ")(toUnfoldable(v1.value0));
                return bind(Effect_Aff.attempt(v1.value1))(function (result) {
                    if (result instanceof Data_Either.Left) {
                        return discard(log("not ok " + (show(v.value0) + (" " + label))))(function () {
                            return discard(log("  ---"))(function () {
                                return discard(log("  message: " + Effect_Exception.message(result.value0)))(function () {
                                    return discard(printStack(result.value0))(function () {
                                        return log("  ...");
                                    });
                                });
                            });
                        });
                    };
                    if (result instanceof Data_Either.Right) {
                        return log("ok " + (show(v.value0) + (" " + label)));
                    };
                    throw new Error("Failed pattern match at Test.Unit.Output.TAP (line 39, column 7 - line 46, column 63): " + [ result.constructor.name ]);
                });
            })()));
        };
    };
    return bind(Test_Unit.collectTests(suite))(function (tests) {
        return discard(log("1.." + show(Data_List.length(tests))))(function () {
            var acts = foldl(run)(new Data_Tuple.Tuple(1, Data_List_Types.Nil.value))(tests);
            return discard(sequence_(Data_Tuple.snd(acts)))(function () {
                return pure(tests);
            });
        });
    });
};
export {
    requested
} from "./foreign.js";
export {
    runTest
};

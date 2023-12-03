import * as Control_Bind from "../Control.Bind/index.js";
import * as Data_Foldable from "../Data.Foldable/index.js";
import * as Data_List_Types from "../Data.List.Types/index.js";
import * as Data_Maybe from "../Data.Maybe/index.js";
import * as Data_Show from "../Data.Show/index.js";
import * as Effect_Aff from "../Effect.Aff/index.js";
import * as Effect_Class from "../Effect.Class/index.js";
import * as Random_LCG from "../Random.LCG/index.js";
import * as Test_QuickCheck from "../Test.QuickCheck/index.js";
import * as Test_Unit from "../Test.Unit/index.js";
var bind = /* #__PURE__ */ Control_Bind.bind(Effect_Aff.bindAff);
var liftEffect = /* #__PURE__ */ Effect_Class.liftEffect(Effect_Aff.monadEffectAff);
var foldl = /* #__PURE__ */ Data_Foldable.foldl(Data_List_Types.foldableList);
var show = /* #__PURE__ */ Data_Show.show(Data_Show.showInt);
var quickCheck$prime = function (dictTestable) {
    var quickCheckPure = Test_QuickCheck.quickCheckPure(dictTestable);
    return function (tries) {
        return function (prop) {
            return bind(liftEffect(Random_LCG.randomSeed))(function (seed) {
                var wins$prime = function (v) {
                    return function (v1) {
                        if (v1 instanceof Test_QuickCheck.Success) {
                            return v + 1 | 0;
                        };
                        return v;
                    };
                };
                var results = quickCheckPure(seed)(tries)(prop);
                var wins = foldl(wins$prime)(0)(results);
                var findErr = function ($copy_v) {
                    var $tco_done = false;
                    var $tco_result;
                    function $tco_loop(v) {
                        if (v instanceof Data_List_Types.Nil) {
                            $tco_done = true;
                            return Data_Maybe.Nothing.value;
                        };
                        if (v instanceof Data_List_Types.Cons && v.value0 instanceof Test_QuickCheck.Failed) {
                            $tco_done = true;
                            return new Data_Maybe.Just(v.value0.value0);
                        };
                        if (v instanceof Data_List_Types.Cons) {
                            $copy_v = v.value1;
                            return;
                        };
                        throw new Error("Failed pattern match at Test.Unit.QuickCheck (line 23, column 7 - line 23, column 28): " + [ v.constructor.name ]);
                    };
                    while (!$tco_done) {
                        $tco_result = $tco_loop($copy_v);
                    };
                    return $tco_result;
                };
                var v = findErr(results);
                if (v instanceof Data_Maybe.Nothing) {
                    return Test_Unit.success;
                };
                if (v instanceof Data_Maybe.Just) {
                    return Test_Unit.failure(show(tries - wins | 0) + ("/" + (show(tries) + (" tests failed: " + v.value0))));
                };
                throw new Error("Failed pattern match at Test.Unit.QuickCheck (line 26, column 3 - line 28, column 95): " + [ v.constructor.name ]);
            });
        };
    };
};
var quickCheck = function (dictTestable) {
    return quickCheck$prime(dictTestable)(100);
};
export {
    quickCheck,
    quickCheck$prime
};

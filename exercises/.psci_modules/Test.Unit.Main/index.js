import * as $foreign from "./foreign.js";
import * as Control_Applicative from "../Control.Applicative/index.js";
import * as Control_Bind from "../Control.Bind/index.js";
import * as Data_Either from "../Data.Either/index.js";
import * as Data_List from "../Data.List/index.js";
import * as Data_Unit from "../Data.Unit/index.js";
import * as Effect from "../Effect/index.js";
import * as Effect_Aff from "../Effect.Aff/index.js";
import * as Effect_Class from "../Effect.Class/index.js";
import * as Test_Unit from "../Test.Unit/index.js";
import * as Test_Unit_Console from "../Test.Unit.Console/index.js";
import * as Test_Unit_Output_Fancy from "../Test.Unit.Output.Fancy/index.js";
import * as Test_Unit_Output_Simple from "../Test.Unit.Output.Simple/index.js";
import * as Test_Unit_Output_TAP from "../Test.Unit.Output.TAP/index.js";
var bind = /* #__PURE__ */ Control_Bind.bind(Effect_Aff.bindAff);
var liftEffect = /* #__PURE__ */ Effect_Class.liftEffect(Effect_Aff.monadEffectAff);
var pure = /* #__PURE__ */ Control_Applicative.pure(Effect_Aff.applicativeAff);
var pure1 = /* #__PURE__ */ Control_Applicative.pure(Effect.applicativeEffect);

// | Run a test suite using the provided test runner.
var runTestWith = function (runner) {
    return function (suite) {
        return bind(bind(runner(Test_Unit.filterTests(suite)))(Test_Unit.collectResults))(function (results) {
            var errs = Test_Unit.keepErrors(results);
            var $9 = Data_List.length(errs) > 0;
            if ($9) {
                return liftEffect($foreign.exit(1));
            };
            return pure(Data_Unit.unit);
        });
    };
};
var run = function (e) {
    var successHandler = function (v) {
        return pure1(Data_Unit.unit);
    };
    var errorHandler = function (v) {
        return $foreign.exit(1);
    };
    return function __do() {
        Effect_Aff.runAff(Data_Either.either(errorHandler)(successHandler))(e)();
        return Data_Unit.unit;
    };
};

// | Run a test suite, picking the most appropriate test runner.
var runTest = function (suite) {
    var runner = (function () {
        if (Test_Unit_Output_TAP.requested) {
            return Test_Unit_Output_TAP.runTest;
        };
        var $11 = Test_Unit_Console.hasStderr && Test_Unit_Console.hasColours;
        if ($11) {
            return Test_Unit_Output_Fancy.runTest;
        };
        return Test_Unit_Output_Simple.runTest;
    })();
    return run(runTestWith(runner)(suite));
};
export {
    exit
} from "./foreign.js";
export {
    runTest,
    runTestWith,
    run
};

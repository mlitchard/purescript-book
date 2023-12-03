import * as $foreign from "./foreign.js";
import * as Effect_Class from "../Effect.Class/index.js";
import * as Effect_Console from "../Effect.Console/index.js";
var log = function (dictMonadEffect) {
    var $3 = Effect_Class.liftEffect(dictMonadEffect);
    return function ($4) {
        return $3(Effect_Console.log($4));
    };
};
export {
    hasStderr,
    hasColours,
    consoleLog,
    consoleError,
    savePos,
    restorePos,
    eraseLine,
    print,
    printLabel,
    printFail,
    printPass
} from "./foreign.js";
export {
    log
};

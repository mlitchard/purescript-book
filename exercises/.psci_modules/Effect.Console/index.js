import * as $foreign from "./foreign.js";
import * as Data_Show from "../Data.Show/index.js";

// | Write an warning value to the console, using its `Show` instance to produce
// | a `String`.
var warnShow = function (dictShow) {
    var show = Data_Show.show(dictShow);
    return function (a) {
        return $foreign.warn(show(a));
    };
};

// | Write a value to the console, using its `Show` instance to produce a
// | `String`.
var logShow = function (dictShow) {
    var show = Data_Show.show(dictShow);
    return function (a) {
        return $foreign.log(show(a));
    };
};

// | Write an info value to the console, using its `Show` instance to produce a
// | `String`.
var infoShow = function (dictShow) {
    var show = Data_Show.show(dictShow);
    return function (a) {
        return $foreign.info(show(a));
    };
};

// | Write an error value to the console, using its `Show` instance to produce a
// | `String`.
var errorShow = function (dictShow) {
    var show = Data_Show.show(dictShow);
    return function (a) {
        return $foreign.error(show(a));
    };
};

// | Write an debug value to the console, using its `Show` instance to produce a
// | `String`.
var debugShow = function (dictShow) {
    var show = Data_Show.show(dictShow);
    return function (a) {
        return $foreign.debug(show(a));
    };
};
export {
    log,
    warn,
    error,
    info,
    debug,
    time,
    timeLog,
    timeEnd,
    clear
} from "./foreign.js";
export {
    logShow,
    warnShow,
    errorShow,
    infoShow,
    debugShow
};

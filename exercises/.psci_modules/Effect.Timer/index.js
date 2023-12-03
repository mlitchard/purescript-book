import * as $foreign from "./foreign.js";
import * as Data_Ord from "../Data.Ord/index.js";
var compare = /* #__PURE__ */ Data_Ord.compare(Data_Ord.ordInt);

// | The ID of a timer started with `setTimeout`.
var TimeoutId = function (x) {
    return x;
};

// | The ID of a timer started with `setInterval`.
var IntervalId = function (x) {
    return x;
};

// | Runs an effectful function after the specified delay in milliseconds. The
// | returned `TimeoutId` can be used to cancel the timer before it completes.
// |
// | The timeout delay value is capped at 4ms by the JS API, any value less than
// | this will be clamped.
var setTimeout = $foreign.setTimeoutImpl;

// | Runs an effectful function after on a set interval with the specified delay
// | in milliseconds between iterations. The returned `IntervalId` can be used
// | to cancel the timer and prevent the interval from running any further.
// |
// | The interval delay value is capped at 4ms by the JS API, any value less
// | than this will be clamped.
var setInterval = $foreign.setIntervalImpl;
var eqTimeoutId = {
    eq: function (x) {
        return function (y) {
            return x === y;
        };
    }
};
var ordTimeoutId = {
    compare: function (x) {
        return function (y) {
            return compare(x)(y);
        };
    },
    Eq0: function () {
        return eqTimeoutId;
    }
};
var eqIntervalId = {
    eq: function (x) {
        return function (y) {
            return x === y;
        };
    }
};
var ordIntervalId = {
    compare: function (x) {
        return function (y) {
            return compare(x)(y);
        };
    },
    Eq0: function () {
        return eqIntervalId;
    }
};

// | Cancels a timeout. If the timeout has already been cancelled or has already
// | elapsed this will have no effect.
var clearTimeout = $foreign.clearTimeoutImpl;

// | Cancels an interval timer. If the interval has already been cancelled this
// | will have no effect.
var clearInterval = $foreign.clearIntervalImpl;
export {
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    eqTimeoutId,
    ordTimeoutId,
    eqIntervalId,
    ordIntervalId
};

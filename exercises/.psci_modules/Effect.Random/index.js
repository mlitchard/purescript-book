import * as $foreign from "./foreign.js";
import * as Data_Functor from "../Data.Functor/index.js";
import * as Data_Int from "../Data.Int/index.js";
import * as Effect from "../Effect/index.js";

// | Returns a random number between a minimum value (inclusive) and a maximum
// | value (exclusive). It is unspecified what happens if `maximum < minimum`.
// |
// | For example:
// | ``` purescript
// | randomRange 1.0 2.0 >>= Console.print
// | ```
// | will print a random number between 1 and 2.
var randomRange = function (min) {
    return function (max) {
        return function __do() {
            var n = $foreign.random();
            return n * (max - min) + min;
        };
    };
};

// | Takes a range specified by `low` (the first argument) and `high` (the
// | second), and returns a random integer uniformly distributed in the closed
// | interval `[low, high]`. It is unspecified what happens if `low > high`,
// | or if either of `low` or `high` is not an integer.
// |
// | For example:
// | ``` purescript
// | randomInt 1 10 >>= Console.print
// | ```
// | will print a random integer between 1 and 10.
var randomInt = function (low) {
    return function (high) {
        return function __do() {
            var n = $foreign.random();
            var asNumber = ((Data_Int.toNumber(high) - Data_Int.toNumber(low)) + 1) * n + Data_Int.toNumber(low);
            return Data_Int.floor(asNumber);
        };
    };
};

// | Returns a random boolean value with an equal chance of being `true` or
// | `false`.
var randomBool = /* #__PURE__ */ Data_Functor.map(Effect.functorEffect)(function (v) {
    return v < 0.5;
})($foreign.random);
export {
    random
} from "./foreign.js";
export {
    randomInt,
    randomRange,
    randomBool
};

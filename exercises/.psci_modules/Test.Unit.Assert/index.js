import * as Control_Bind from "../Control.Bind/index.js";
import * as Control_Monad_Error_Class from "../Control.Monad.Error.Class/index.js";
import * as Data_Either from "../Data.Either/index.js";
import * as Data_Eq from "../Data.Eq/index.js";
import * as Data_Function from "../Data.Function/index.js";
import * as Data_Show from "../Data.Show/index.js";
import * as Effect_Aff from "../Effect.Aff/index.js";
import * as Effect_Exception from "../Effect.Exception/index.js";
import * as Test_Unit from "../Test.Unit/index.js";
var bind = /* #__PURE__ */ Control_Bind.bind(Effect_Aff.bindAff);
var catchError = /* #__PURE__ */ Control_Monad_Error_Class.catchError(Effect_Aff.monadErrorAff);
var throwError = /* #__PURE__ */ Control_Monad_Error_Class.throwError(Effect_Aff.monadThrowAff);

// | Expect a test to fail. Given a reason and a test, fail with the given
// | reason if the test succeeds, and succeed if it fails.
var expectFailure = function (reason) {
    return function (t) {
        return bind(Effect_Aff.attempt(t))(function (r) {
            return Data_Either.either(Data_Function["const"](Test_Unit.success))(Data_Function["const"](Test_Unit.failure(reason)))(r);
        });
    };
};

// | Assert that two non-printable values are equal, using a provided failure
// | string instead of generating one.
var equal$prime = function (dictEq) {
    var eq = Data_Eq.eq(dictEq);
    return function (reason) {
        return function (expected) {
            return function (actual) {
                var $24 = eq(expected)(actual);
                if ($24) {
                    return Test_Unit.success;
                };
                return Test_Unit.failure(reason);
            };
        };
    };
};

// | Assert that two printable values are equal.
var equal = function (dictEq) {
    var eq = Data_Eq.eq(dictEq);
    return function (dictShow) {
        var show = Data_Show.show(dictShow);
        return function (expected) {
            return function (actual) {
                var $25 = eq(expected)(actual);
                if ($25) {
                    return Test_Unit.success;
                };
                return Test_Unit.failure("expected " + (show(expected) + (", got " + show(actual))));
            };
        };
    };
};

// | Assert that two printable values are equal, like `equal` but also adds
// | a title string to the error message.
var equal$prime$prime = function (dictEq) {
    var equal1 = equal(dictEq);
    return function (dictShow) {
        var equal2 = equal1(dictShow);
        return function (name) {
            return function (a) {
                return function (b) {
                    return catchError(equal2(a)(b))(function ($30) {
                        return throwError(Effect_Exception.error((function (v) {
                            return name + " " + v;
                        })(Effect_Exception.message($30))));
                    });
                };
            };
        };
    };
};

// | `shouldEqual` is equivalent to `equal`, with the arguments flipped,
// | for people who prefer the BDD style.
// |
// |     it "should do what I expect of it" do
// |       result `shouldEqual` "expected result"
var shouldEqual = function (dictEq) {
    var equal1 = equal(dictEq);
    return function (dictShow) {
        return Data_Function.flip(equal1(dictShow));
    };
};

// | The reverse of `assert`: given a failure reason and a boolean, either
// | succeed if the boolean is false, or fail if the boolean is true.
var assertFalse = function (v) {
    return function (v1) {
        if (!v1) {
            return Test_Unit.success;
        };
        if (v1) {
            return Test_Unit.failure(v);
        };
        throw new Error("Failed pattern match at Test.Unit.Assert (line 26, column 1 - line 26, column 41): " + [ v.constructor.name, v1.constructor.name ]);
    };
};

// | Given a failure reason and a boolean, either succeed if the boolean is
// | true, or fail if the boolean is false.
var assert = function (v) {
    return function (v1) {
        if (v1) {
            return Test_Unit.success;
        };
        if (!v1) {
            return Test_Unit.failure(v);
        };
        throw new Error("Failed pattern match at Test.Unit.Assert (line 20, column 1 - line 20, column 36): " + [ v.constructor.name, v1.constructor.name ]);
    };
};
export {
    assert,
    assertFalse,
    expectFailure,
    equal,
    equal$prime,
    shouldEqual
};

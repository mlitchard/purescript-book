import * as Data_Eq from "../Data.Eq/index.js";
import * as Data_Generic_Rep from "../Data.Generic.Rep/index.js";
var genericEqNoConstructors = {
    "genericEq'": function (v) {
        return function (v1) {
            return true;
        };
    }
};
var genericEqNoArguments = {
    "genericEq'": function (v) {
        return function (v1) {
            return true;
        };
    }
};
var genericEqArgument = function (dictEq) {
    var eq = Data_Eq.eq(dictEq);
    return {
        "genericEq'": function (v) {
            return function (v1) {
                return eq(v)(v1);
            };
        }
    };
};
var genericEq$prime = function (dict) {
    return dict["genericEq'"];
};
var genericEqConstructor = function (dictGenericEq) {
    var genericEq$prime1 = genericEq$prime(dictGenericEq);
    return {
        "genericEq'": function (v) {
            return function (v1) {
                return genericEq$prime1(v)(v1);
            };
        }
    };
};
var genericEqProduct = function (dictGenericEq) {
    var genericEq$prime1 = genericEq$prime(dictGenericEq);
    return function (dictGenericEq1) {
        var genericEq$prime2 = genericEq$prime(dictGenericEq1);
        return {
            "genericEq'": function (v) {
                return function (v1) {
                    return genericEq$prime1(v.value0)(v1.value0) && genericEq$prime2(v.value1)(v1.value1);
                };
            }
        };
    };
};
var genericEqSum = function (dictGenericEq) {
    var genericEq$prime1 = genericEq$prime(dictGenericEq);
    return function (dictGenericEq1) {
        var genericEq$prime2 = genericEq$prime(dictGenericEq1);
        return {
            "genericEq'": function (v) {
                return function (v1) {
                    if (v instanceof Data_Generic_Rep.Inl && v1 instanceof Data_Generic_Rep.Inl) {
                        return genericEq$prime1(v.value0)(v1.value0);
                    };
                    if (v instanceof Data_Generic_Rep.Inr && v1 instanceof Data_Generic_Rep.Inr) {
                        return genericEq$prime2(v.value0)(v1.value0);
                    };
                    return false;
                };
            }
        };
    };
};

// | A `Generic` implementation of the `eq` member from the `Eq` type class.
var genericEq = function (dictGeneric) {
    var from = Data_Generic_Rep.from(dictGeneric);
    return function (dictGenericEq) {
        var genericEq$prime1 = genericEq$prime(dictGenericEq);
        return function (x) {
            return function (y) {
                return genericEq$prime1(from(x))(from(y));
            };
        };
    };
};
export {
    genericEq$prime,
    genericEq,
    genericEqNoConstructors,
    genericEqNoArguments,
    genericEqSum,
    genericEqProduct,
    genericEqConstructor,
    genericEqArgument
};

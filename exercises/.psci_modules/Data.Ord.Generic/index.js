import * as Data_Generic_Rep from "../Data.Generic.Rep/index.js";
import * as Data_Ord from "../Data.Ord/index.js";
import * as Data_Ordering from "../Data.Ordering/index.js";
var genericOrdNoConstructors = {
    "genericCompare'": function (v) {
        return function (v1) {
            return Data_Ordering.EQ.value;
        };
    }
};
var genericOrdNoArguments = {
    "genericCompare'": function (v) {
        return function (v1) {
            return Data_Ordering.EQ.value;
        };
    }
};
var genericOrdArgument = function (dictOrd) {
    var compare = Data_Ord.compare(dictOrd);
    return {
        "genericCompare'": function (v) {
            return function (v1) {
                return compare(v)(v1);
            };
        }
    };
};
var genericCompare$prime = function (dict) {
    return dict["genericCompare'"];
};
var genericOrdConstructor = function (dictGenericOrd) {
    var genericCompare$prime1 = genericCompare$prime(dictGenericOrd);
    return {
        "genericCompare'": function (v) {
            return function (v1) {
                return genericCompare$prime1(v)(v1);
            };
        }
    };
};
var genericOrdProduct = function (dictGenericOrd) {
    var genericCompare$prime1 = genericCompare$prime(dictGenericOrd);
    return function (dictGenericOrd1) {
        var genericCompare$prime2 = genericCompare$prime(dictGenericOrd1);
        return {
            "genericCompare'": function (v) {
                return function (v1) {
                    var v2 = genericCompare$prime1(v.value0)(v1.value0);
                    if (v2 instanceof Data_Ordering.EQ) {
                        return genericCompare$prime2(v.value1)(v1.value1);
                    };
                    return v2;
                };
            }
        };
    };
};
var genericOrdSum = function (dictGenericOrd) {
    var genericCompare$prime1 = genericCompare$prime(dictGenericOrd);
    return function (dictGenericOrd1) {
        var genericCompare$prime2 = genericCompare$prime(dictGenericOrd1);
        return {
            "genericCompare'": function (v) {
                return function (v1) {
                    if (v instanceof Data_Generic_Rep.Inl && v1 instanceof Data_Generic_Rep.Inl) {
                        return genericCompare$prime1(v.value0)(v1.value0);
                    };
                    if (v instanceof Data_Generic_Rep.Inr && v1 instanceof Data_Generic_Rep.Inr) {
                        return genericCompare$prime2(v.value0)(v1.value0);
                    };
                    if (v instanceof Data_Generic_Rep.Inl && v1 instanceof Data_Generic_Rep.Inr) {
                        return Data_Ordering.LT.value;
                    };
                    if (v instanceof Data_Generic_Rep.Inr && v1 instanceof Data_Generic_Rep.Inl) {
                        return Data_Ordering.GT.value;
                    };
                    throw new Error("Failed pattern match at Data.Ord.Generic (line 19, column 1 - line 23, column 39): " + [ v.constructor.name, v1.constructor.name ]);
                };
            }
        };
    };
};

// | A `Generic` implementation of the `compare` member from the `Ord` type class.
var genericCompare = function (dictGeneric) {
    var from = Data_Generic_Rep.from(dictGeneric);
    return function (dictGenericOrd) {
        var genericCompare$prime1 = genericCompare$prime(dictGenericOrd);
        return function (x) {
            return function (y) {
                return genericCompare$prime1(from(x))(from(y));
            };
        };
    };
};
export {
    genericCompare$prime,
    genericCompare,
    genericOrdNoConstructors,
    genericOrdNoArguments,
    genericOrdSum,
    genericOrdProduct,
    genericOrdConstructor,
    genericOrdArgument
};

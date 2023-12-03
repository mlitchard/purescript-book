import * as Data_Show from "../Data.Show/index.js";
import * as Data_Symbol from "../Data.Symbol/index.js";
import * as Type_Proxy from "../Type.Proxy/index.js";
var show = /* #__PURE__ */ Data_Show.show(Data_Show.showString);

// | A representation for types with multiple constructors.
var Inl = /* #__PURE__ */ (function () {
    function Inl(value0) {
        this.value0 = value0;
    };
    Inl.create = function (value0) {
        return new Inl(value0);
    };
    return Inl;
})();

// | A representation for types with multiple constructors.
var Inr = /* #__PURE__ */ (function () {
    function Inr(value0) {
        this.value0 = value0;
    };
    Inr.create = function (value0) {
        return new Inr(value0);
    };
    return Inr;
})();

// | A representation for constructors with multiple fields.
var Product = /* #__PURE__ */ (function () {
    function Product(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    Product.create = function (value0) {
        return function (value1) {
            return new Product(value0, value1);
        };
    };
    return Product;
})();

// | A representation for types with no constructors.
var NoConstructors = function (x) {
    return x;
};

// | A representation for constructors with no arguments.
var NoArguments = /* #__PURE__ */ (function () {
    function NoArguments() {

    };
    NoArguments.value = new NoArguments();
    return NoArguments;
})();

// | A representation for constructors which includes the data constructor name
// | as a type-level string.
var Constructor = function (x) {
    return x;
};

// | A representation for an argument in a data constructor.
var Argument = function (x) {
    return x;
};
var to = function (dict) {
    return dict.to;
};
var showSum = function (dictShow) {
    var show1 = Data_Show.show(dictShow);
    return function (dictShow1) {
        var show2 = Data_Show.show(dictShow1);
        return {
            show: function (v) {
                if (v instanceof Inl) {
                    return "(Inl " + (show1(v.value0) + ")");
                };
                if (v instanceof Inr) {
                    return "(Inr " + (show2(v.value0) + ")");
                };
                throw new Error("Failed pattern match at Data.Generic.Rep (line 32, column 1 - line 34, column 42): " + [ v.constructor.name ]);
            }
        };
    };
};
var showProduct = function (dictShow) {
    var show1 = Data_Show.show(dictShow);
    return function (dictShow1) {
        var show2 = Data_Show.show(dictShow1);
        return {
            show: function (v) {
                return "(Product " + (show1(v.value0) + (" " + (show2(v.value1) + ")")));
            }
        };
    };
};
var showNoArguments = {
    show: function (v) {
        return "NoArguments";
    }
};
var showConstructor = function (dictIsSymbol) {
    var reflectSymbol = Data_Symbol.reflectSymbol(dictIsSymbol);
    return function (dictShow) {
        var show1 = Data_Show.show(dictShow);
        return {
            show: function (v) {
                return "(Constructor @" + (show(reflectSymbol(Type_Proxy["Proxy"].value)) + (" " + (show1(v) + ")")));
            }
        };
    };
};
var showArgument = function (dictShow) {
    var show1 = Data_Show.show(dictShow);
    return {
        show: function (v) {
            return "(Argument " + (show1(v) + ")");
        }
    };
};
var repOf = function (dictGeneric) {
    return function (v) {
        return Type_Proxy["Proxy"].value;
    };
};
var from = function (dict) {
    return dict.from;
};
export {
    to,
    from,
    repOf,
    NoArguments,
    Inl,
    Inr,
    Product,
    Constructor,
    Argument,
    showNoArguments,
    showSum,
    showProduct,
    showConstructor,
    showArgument
};

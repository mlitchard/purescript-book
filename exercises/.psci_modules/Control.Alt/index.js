import * as Data_Functor from "../Data.Functor/index.js";
import * as Data_Semigroup from "../Data.Semigroup/index.js";
var altArray = {
    alt: /* #__PURE__ */ Data_Semigroup.append(Data_Semigroup.semigroupArray),
    Functor0: function () {
        return Data_Functor.functorArray;
    }
};
var alt = function (dict) {
    return dict.alt;
};
export {
    alt,
    altArray
};
export {
    map,
    void
} from "../Data.Functor/index.js";

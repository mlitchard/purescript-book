import * as Control_Apply from "../Control.Apply/index.js";
import * as Control_Category from "../Control.Category/index.js";
import * as Control_Parallel_Class from "../Control.Parallel.Class/index.js";
import * as Data_Foldable from "../Data.Foldable/index.js";
import * as Data_Traversable from "../Data.Traversable/index.js";
var identity = /* #__PURE__ */ Control_Category.identity(Control_Category.categoryFn);

// | Traverse a collection in parallel, discarding any results.
var parTraverse_ = function (dictParallel) {
    var sequential = Control_Parallel_Class.sequential(dictParallel);
    var traverse_ = Data_Foldable.traverse_(dictParallel.Applicative1());
    var parallel = Control_Parallel_Class.parallel(dictParallel);
    return function (dictFoldable) {
        var traverse_1 = traverse_(dictFoldable);
        return function (f) {
            var $48 = traverse_1(function ($50) {
                return parallel(f($50));
            });
            return function ($49) {
                return sequential($48($49));
            };
        };
    };
};

// | Traverse a collection in parallel.
var parTraverse = function (dictParallel) {
    var sequential = Control_Parallel_Class.sequential(dictParallel);
    var Applicative1 = dictParallel.Applicative1();
    var parallel = Control_Parallel_Class.parallel(dictParallel);
    return function (dictTraversable) {
        var traverse = Data_Traversable.traverse(dictTraversable)(Applicative1);
        return function (f) {
            var $51 = traverse(function ($53) {
                return parallel(f($53));
            });
            return function ($52) {
                return sequential($51($52));
            };
        };
    };
};
var parSequence_ = function (dictParallel) {
    var parTraverse_1 = parTraverse_(dictParallel);
    return function (dictFoldable) {
        return parTraverse_1(dictFoldable)(identity);
    };
};
var parSequence = function (dictParallel) {
    var parTraverse1 = parTraverse(dictParallel);
    return function (dictTraversable) {
        return parTraverse1(dictTraversable)(identity);
    };
};

// | Race a collection in parallel while mapping to some effect.
var parOneOfMap = function (dictParallel) {
    var sequential = Control_Parallel_Class.sequential(dictParallel);
    var parallel = Control_Parallel_Class.parallel(dictParallel);
    return function (dictAlternative) {
        var Plus1 = dictAlternative.Plus1();
        return function (dictFoldable) {
            var oneOfMap = Data_Foldable.oneOfMap(dictFoldable)(Plus1);
            return function (dictFunctor) {
                return function (f) {
                    var $54 = oneOfMap(function ($56) {
                        return parallel(f($56));
                    });
                    return function ($55) {
                        return sequential($54($55));
                    };
                };
            };
        };
    };
};

// | Race a collection in parallel.
var parOneOf = function (dictParallel) {
    var sequential = Control_Parallel_Class.sequential(dictParallel);
    var parallel = Control_Parallel_Class.parallel(dictParallel);
    return function (dictAlternative) {
        var Plus1 = dictAlternative.Plus1();
        return function (dictFoldable) {
            var oneOfMap = Data_Foldable.oneOfMap(dictFoldable)(Plus1);
            return function (dictFunctor) {
                var $57 = oneOfMap(parallel);
                return function ($58) {
                    return sequential($57($58));
                };
            };
        };
    };
};

// | Apply a function to an argument under a type constructor in parallel.
var parApply = function (dictParallel) {
    var sequential = Control_Parallel_Class.sequential(dictParallel);
    var apply = Control_Apply.apply((dictParallel.Applicative1()).Apply0());
    var parallel = Control_Parallel_Class.parallel(dictParallel);
    return function (mf) {
        return function (ma) {
            return sequential(apply(parallel(mf))(parallel(ma)));
        };
    };
};
export {
    parApply,
    parTraverse,
    parTraverse_,
    parSequence,
    parSequence_,
    parOneOf,
    parOneOfMap
};
export {
    ParCont,
    parallel,
    sequential
} from "../Control.Parallel.Class/index.js";

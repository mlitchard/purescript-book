import * as Control_Applicative from "../Control.Applicative/index.js";
import * as Control_Bind from "../Control.Bind/index.js";
import * as Control_Monad_Cont_Trans from "../Control.Monad.Cont.Trans/index.js";
import * as Control_Monad_Except_Trans from "../Control.Monad.Except.Trans/index.js";
import * as Control_Monad_Maybe_Trans from "../Control.Monad.Maybe.Trans/index.js";
import * as Control_Monad_Reader_Trans from "../Control.Monad.Reader.Trans/index.js";
import * as Control_Monad_Writer_Trans from "../Control.Monad.Writer.Trans/index.js";
import * as Data_Either from "../Data.Either/index.js";
import * as Data_Functor from "../Data.Functor/index.js";
import * as Data_Functor_Compose from "../Data.Functor.Compose/index.js";
import * as Data_Functor_Costar from "../Data.Functor.Costar/index.js";
import * as Data_Maybe from "../Data.Maybe/index.js";
import * as Data_Profunctor_Star from "../Data.Profunctor.Star/index.js";
import * as Data_Unit from "../Data.Unit/index.js";
import * as Effect_Class from "../Effect.Class/index.js";
import * as Effect_Ref from "../Effect.Ref/index.js";
var discard = /* #__PURE__ */ Control_Bind.discard(Control_Bind.discardUnit);

// | The `ParCont` type constructor provides an `Applicative` instance
// | based on `ContT Unit m`, which waits for multiple continuations to be
// | resumed simultaneously.
// |
// | ParCont sections of code can be embedded in sequential code by using
// | the `parallel` and `sequential` functions:
// |
// | ```purescript
// | loadModel :: ContT Unit (Eff (ajax :: AJAX)) Model
// | loadModel = do
// |   token <- authenticate
// |   sequential $
// |     Model <$> parallel (get "/products/popular/" token)
// |           <*> parallel (get "/categories/all" token)
// | ```
var ParCont = function (x) {
    return x;
};
var sequential = function (dict) {
    return dict.sequential;
};
var parallel = function (dict) {
    return dict.parallel;
};
var newtypeParCont = {
    Coercible0: function () {
        return undefined;
    }
};
var monadParWriterT = function (dictMonoid) {
    var monadWriterT = Control_Monad_Writer_Trans.monadWriterT(dictMonoid);
    var applicativeWriterT = Control_Monad_Writer_Trans.applicativeWriterT(dictMonoid);
    return function (dictParallel) {
        var monadWriterT1 = monadWriterT(dictParallel.Monad0());
        var applicativeWriterT1 = applicativeWriterT(dictParallel.Applicative1());
        return {
            parallel: Control_Monad_Writer_Trans.mapWriterT(parallel(dictParallel)),
            sequential: Control_Monad_Writer_Trans.mapWriterT(sequential(dictParallel)),
            Monad0: function () {
                return monadWriterT1;
            },
            Applicative1: function () {
                return applicativeWriterT1;
            }
        };
    };
};
var monadParStar = function (dictParallel) {
    var parallel1 = parallel(dictParallel);
    var sequential1 = sequential(dictParallel);
    var monadStar = Data_Profunctor_Star.monadStar(dictParallel.Monad0());
    var applicativeStar = Data_Profunctor_Star.applicativeStar(dictParallel.Applicative1());
    return {
        parallel: function (v) {
            return function ($119) {
                return parallel1(v($119));
            };
        },
        sequential: function (v) {
            return function ($120) {
                return sequential1(v($120));
            };
        },
        Monad0: function () {
            return monadStar;
        },
        Applicative1: function () {
            return applicativeStar;
        }
    };
};
var monadParReaderT = function (dictParallel) {
    var monadReaderT = Control_Monad_Reader_Trans.monadReaderT(dictParallel.Monad0());
    var applicativeReaderT = Control_Monad_Reader_Trans.applicativeReaderT(dictParallel.Applicative1());
    return {
        parallel: Control_Monad_Reader_Trans.mapReaderT(parallel(dictParallel)),
        sequential: Control_Monad_Reader_Trans.mapReaderT(sequential(dictParallel)),
        Monad0: function () {
            return monadReaderT;
        },
        Applicative1: function () {
            return applicativeReaderT;
        }
    };
};
var monadParMaybeT = function (dictParallel) {
    var parallel1 = parallel(dictParallel);
    var sequential1 = sequential(dictParallel);
    var monadMaybeT = Control_Monad_Maybe_Trans.monadMaybeT(dictParallel.Monad0());
    var applicativeCompose = Data_Functor_Compose.applicativeCompose(dictParallel.Applicative1())(Data_Maybe.applicativeMaybe);
    return {
        parallel: function (v) {
            return parallel1(v);
        },
        sequential: function (v) {
            return sequential1(v);
        },
        Monad0: function () {
            return monadMaybeT;
        },
        Applicative1: function () {
            return applicativeCompose;
        }
    };
};
var monadParExceptT = function (dictParallel) {
    var parallel1 = parallel(dictParallel);
    var sequential1 = sequential(dictParallel);
    var monadExceptT = Control_Monad_Except_Trans.monadExceptT(dictParallel.Monad0());
    var applicativeCompose = Data_Functor_Compose.applicativeCompose(dictParallel.Applicative1())(Data_Either.applicativeEither);
    return {
        parallel: function (v) {
            return parallel1(v);
        },
        sequential: function (v) {
            return sequential1(v);
        },
        Monad0: function () {
            return monadExceptT;
        },
        Applicative1: function () {
            return applicativeCompose;
        }
    };
};
var monadParCostar = function (dictParallel) {
    var sequential1 = sequential(dictParallel);
    var parallel1 = parallel(dictParallel);
    return {
        parallel: function (v) {
            return function ($121) {
                return v(sequential1($121));
            };
        },
        sequential: function (v) {
            return function ($122) {
                return v(parallel1($122));
            };
        },
        Monad0: function () {
            return Data_Functor_Costar.monadCostar;
        },
        Applicative1: function () {
            return Data_Functor_Costar.applicativeCostar;
        }
    };
};
var monadParParCont = function (dictMonadEffect) {
    var monadContT = Control_Monad_Cont_Trans.monadContT(dictMonadEffect.Monad0());
    return {
        parallel: ParCont,
        sequential: function (v) {
            return v;
        },
        Monad0: function () {
            return monadContT;
        },
        Applicative1: function () {
            return applicativeParCont(dictMonadEffect);
        }
    };
};
var functorParCont = function (dictMonadEffect) {
    var map = Data_Functor.map(Control_Monad_Cont_Trans.functorContT((((dictMonadEffect.Monad0()).Bind1()).Apply0()).Functor0()));
    return {
        map: function (f) {
            var $123 = parallel(monadParParCont(dictMonadEffect));
            var $124 = map(f);
            var $125 = sequential(monadParParCont(dictMonadEffect));
            return function ($126) {
                return $123($124($125($126)));
            };
        }
    };
};
var applyParCont = function (dictMonadEffect) {
    var Bind1 = (dictMonadEffect.Monad0()).Bind1();
    var bind = Control_Bind.bind(Bind1);
    var liftEffect = Effect_Class.liftEffect(dictMonadEffect);
    var discard1 = discard(Bind1);
    return {
        apply: function (v) {
            return function (v1) {
                return function (k) {
                    return bind(liftEffect(Effect_Ref["new"](Data_Maybe.Nothing.value)))(function (ra) {
                        return bind(liftEffect(Effect_Ref["new"](Data_Maybe.Nothing.value)))(function (rb) {
                            return discard1(Control_Monad_Cont_Trans.runContT(v)(function (a) {
                                return bind(liftEffect(Effect_Ref.read(rb)))(function (mb) {
                                    if (mb instanceof Data_Maybe.Nothing) {
                                        return liftEffect(Effect_Ref.write(new Data_Maybe.Just(a))(ra));
                                    };
                                    if (mb instanceof Data_Maybe.Just) {
                                        return k(a(mb.value0));
                                    };
                                    throw new Error("Failed pattern match at Control.Parallel.Class (line 82, column 7 - line 84, column 26): " + [ mb.constructor.name ]);
                                });
                            }))(function () {
                                return Control_Monad_Cont_Trans.runContT(v1)(function (b) {
                                    return bind(liftEffect(Effect_Ref.read(ra)))(function (ma) {
                                        if (ma instanceof Data_Maybe.Nothing) {
                                            return liftEffect(Effect_Ref.write(new Data_Maybe.Just(b))(rb));
                                        };
                                        if (ma instanceof Data_Maybe.Just) {
                                            return k(ma.value0(b));
                                        };
                                        throw new Error("Failed pattern match at Control.Parallel.Class (line 88, column 7 - line 90, column 26): " + [ ma.constructor.name ]);
                                    });
                                });
                            });
                        });
                    });
                };
            };
        },
        Functor0: function () {
            return functorParCont(dictMonadEffect);
        }
    };
};
var applicativeParCont = function (dictMonadEffect) {
    return {
        pure: (function () {
            var $127 = parallel(monadParParCont(dictMonadEffect));
            var $128 = Control_Applicative.pure(Control_Monad_Cont_Trans.applicativeContT((dictMonadEffect.Monad0()).Applicative0()));
            return function ($129) {
                return $127($128($129));
            };
        })(),
        Apply0: function () {
            return applyParCont(dictMonadEffect);
        }
    };
};
var altParCont = function (dictMonadEffect) {
    var Monad0 = dictMonadEffect.Monad0();
    var Bind1 = Monad0.Bind1();
    var bind = Control_Bind.bind(Bind1);
    var liftEffect = Effect_Class.liftEffect(dictMonadEffect);
    var discard1 = discard(Bind1);
    var pure = Control_Applicative.pure(Monad0.Applicative0());
    var functorParCont1 = functorParCont(dictMonadEffect);
    return {
        alt: function (v) {
            return function (v1) {
                return function (k) {
                    return bind(liftEffect(Effect_Ref["new"](false)))(function (done) {
                        return discard1(Control_Monad_Cont_Trans.runContT(v)(function (a) {
                            return bind(liftEffect(Effect_Ref.read(done)))(function (b) {
                                if (b) {
                                    return pure(Data_Unit.unit);
                                };
                                return discard1(liftEffect(Effect_Ref.write(true)(done)))(function () {
                                    return k(a);
                                });
                            });
                        }))(function () {
                            return Control_Monad_Cont_Trans.runContT(v1)(function (a) {
                                return bind(liftEffect(Effect_Ref.read(done)))(function (b) {
                                    if (b) {
                                        return pure(Data_Unit.unit);
                                    };
                                    return discard1(liftEffect(Effect_Ref.write(true)(done)))(function () {
                                        return k(a);
                                    });
                                });
                            });
                        });
                    });
                };
            };
        },
        Functor0: function () {
            return functorParCont1;
        }
    };
};
var plusParCont = function (dictMonadEffect) {
    var pure = Control_Applicative.pure((dictMonadEffect.Monad0()).Applicative0());
    var altParCont1 = altParCont(dictMonadEffect);
    return {
        empty: function (v) {
            return pure(Data_Unit.unit);
        },
        Alt0: function () {
            return altParCont1;
        }
    };
};
var alternativeParCont = function (dictMonadEffect) {
    var applicativeParCont1 = applicativeParCont(dictMonadEffect);
    var plusParCont1 = plusParCont(dictMonadEffect);
    return {
        Applicative0: function () {
            return applicativeParCont1;
        },
        Plus1: function () {
            return plusParCont1;
        }
    };
};
export {
    parallel,
    sequential,
    ParCont,
    monadParExceptT,
    monadParReaderT,
    monadParWriterT,
    monadParMaybeT,
    monadParStar,
    monadParCostar,
    newtypeParCont,
    functorParCont,
    applyParCont,
    applicativeParCont,
    altParCont,
    plusParCont,
    alternativeParCont,
    monadParParCont
};

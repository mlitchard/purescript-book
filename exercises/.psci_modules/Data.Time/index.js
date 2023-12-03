import * as Control_Apply from "../Control.Apply/index.js";
import * as Data_Bounded from "../Data.Bounded/index.js";
import * as Data_Enum from "../Data.Enum/index.js";
import * as Data_Eq from "../Data.Eq/index.js";
import * as Data_Functor from "../Data.Functor/index.js";
import * as Data_Int from "../Data.Int/index.js";
import * as Data_Maybe from "../Data.Maybe/index.js";
import * as Data_Newtype from "../Data.Newtype/index.js";
import * as Data_Number from "../Data.Number/index.js";
import * as Data_Ord from "../Data.Ord/index.js";
import * as Data_Ordering from "../Data.Ordering/index.js";
import * as Data_Semigroup from "../Data.Semigroup/index.js";
import * as Data_Show from "../Data.Show/index.js";
import * as Data_Time_Component from "../Data.Time.Component/index.js";
import * as Data_Time_Duration from "../Data.Time.Duration/index.js";
import * as Data_Tuple from "../Data.Tuple/index.js";
var show = /* #__PURE__ */ Data_Show.show(Data_Time_Component.showHour);
var show1 = /* #__PURE__ */ Data_Show.show(Data_Time_Component.showMinute);
var show2 = /* #__PURE__ */ Data_Show.show(Data_Time_Component.showSecond);
var show3 = /* #__PURE__ */ Data_Show.show(Data_Time_Component.showMillisecond);
var fromJust = /* #__PURE__ */ Data_Maybe.fromJust();
var apply = /* #__PURE__ */ Control_Apply.apply(Data_Maybe.applyMaybe);
var map = /* #__PURE__ */ Data_Functor.map(Data_Maybe.functorMaybe);
var toEnum = /* #__PURE__ */ Data_Enum.toEnum(Data_Time_Component.boundedEnumHour);
var toEnum1 = /* #__PURE__ */ Data_Enum.toEnum(Data_Time_Component.boundedEnumMinute);
var toEnum2 = /* #__PURE__ */ Data_Enum.toEnum(Data_Time_Component.boundedEnumSecond);
var toEnum3 = /* #__PURE__ */ Data_Enum.toEnum(Data_Time_Component.boundedEnumMillisecond);
var fromEnum = /* #__PURE__ */ Data_Enum.fromEnum(Data_Time_Component.boundedEnumHour);
var fromEnum1 = /* #__PURE__ */ Data_Enum.fromEnum(Data_Time_Component.boundedEnumMinute);
var fromEnum2 = /* #__PURE__ */ Data_Enum.fromEnum(Data_Time_Component.boundedEnumSecond);
var fromEnum3 = /* #__PURE__ */ Data_Enum.fromEnum(Data_Time_Component.boundedEnumMillisecond);
var eq = /* #__PURE__ */ Data_Eq.eq(Data_Time_Component.eqHour);
var eq1 = /* #__PURE__ */ Data_Eq.eq(Data_Time_Component.eqMinute);
var eq2 = /* #__PURE__ */ Data_Eq.eq(Data_Time_Component.eqSecond);
var eq3 = /* #__PURE__ */ Data_Eq.eq(Data_Time_Component.eqMillisecond);
var compare = /* #__PURE__ */ Data_Ord.compare(Data_Time_Component.ordHour);
var compare1 = /* #__PURE__ */ Data_Ord.compare(Data_Time_Component.ordMinute);
var compare2 = /* #__PURE__ */ Data_Ord.compare(Data_Time_Component.ordSecond);
var compare3 = /* #__PURE__ */ Data_Ord.compare(Data_Time_Component.ordMillisecond);
var append1 = /* #__PURE__ */ Data_Semigroup.append(Data_Time_Duration.semigroupMilliseconds);
var negateDuration = /* #__PURE__ */ Data_Time_Duration.negateDuration(Data_Time_Duration.durationMilliseconds);
var unwrap = /* #__PURE__ */ Data_Newtype.unwrap();
var fromDuration = /* #__PURE__ */ Data_Time_Duration.fromDuration(Data_Time_Duration.durationDays);
var greaterThan = /* #__PURE__ */ Data_Ord.greaterThan(Data_Time_Duration.ordMilliseconds);
var lessThan = /* #__PURE__ */ Data_Ord.lessThan(Data_Time_Duration.ordMilliseconds);
var append2 = /* #__PURE__ */ Data_Semigroup.append(Data_Time_Duration.semigroupDays);
var Time = /* #__PURE__ */ (function () {
    function Time(value0, value1, value2, value3) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
    };
    Time.create = function (value0) {
        return function (value1) {
            return function (value2) {
                return function (value3) {
                    return new Time(value0, value1, value2, value3);
                };
            };
        };
    };
    return Time;
})();
var showTime = {
    show: function (v) {
        return "(Time " + (show(v.value0) + (" " + (show1(v.value1) + (" " + (show2(v.value2) + (" " + (show3(v.value3) + ")")))))));
    }
};

// | Alters the second component of a time value.
var setSecond = function (s) {
    return function (v) {
        return new Time(v.value0, v.value1, s, v.value3);
    };
};

// | Alters the minute component of a time value.
var setMinute = function (m) {
    return function (v) {
        return new Time(v.value0, m, v.value2, v.value3);
    };
};

// | Alters the millisecond component of a time value.
var setMillisecond = function (ms) {
    return function (v) {
        return new Time(v.value0, v.value1, v.value2, ms);
    };
};

// | Alters the hour component of a time value.
var setHour = function (h) {
    return function (v) {
        return new Time(h, v.value1, v.value2, v.value3);
    };
};

// | The second component of a time value.
var second = function (v) {
    return v.value2;
};

// | The minute component of a time value.
var minute = function (v) {
    return v.value1;
};

// | The millisecond component of a time value.
var millisecond = function (v) {
    return v.value3;
};
var millisToTime = function (v) {
    var hours = Data_Number.floor(v / 3600000.0);
    var minutes = Data_Number.floor((v - hours * 3600000.0) / 60000.0);
    var seconds = Data_Number.floor((v - (hours * 3600000.0 + minutes * 60000.0)) / 1000.0);
    var milliseconds = v - (hours * 3600000.0 + minutes * 60000.0 + seconds * 1000.0);
    return fromJust(apply(apply(apply(map(Time.create)(toEnum(Data_Int.floor(hours))))(toEnum1(Data_Int.floor(minutes))))(toEnum2(Data_Int.floor(seconds))))(toEnum3(Data_Int.floor(milliseconds))));
};

// | The hour component of a time value.
var hour = function (v) {
    return v.value0;
};
var timeToMillis = function (t) {
    return 3600000.0 * Data_Int.toNumber(fromEnum(hour(t))) + 60000.0 * Data_Int.toNumber(fromEnum1(minute(t))) + 1000.0 * Data_Int.toNumber(fromEnum2(second(t))) + Data_Int.toNumber(fromEnum3(millisecond(t)));
};
var eqTime = {
    eq: function (x) {
        return function (y) {
            return eq(x.value0)(y.value0) && eq1(x.value1)(y.value1) && eq2(x.value2)(y.value2) && eq3(x.value3)(y.value3);
        };
    }
};
var ordTime = {
    compare: function (x) {
        return function (y) {
            var v = compare(x.value0)(y.value0);
            if (v instanceof Data_Ordering.LT) {
                return Data_Ordering.LT.value;
            };
            if (v instanceof Data_Ordering.GT) {
                return Data_Ordering.GT.value;
            };
            var v1 = compare1(x.value1)(y.value1);
            if (v1 instanceof Data_Ordering.LT) {
                return Data_Ordering.LT.value;
            };
            if (v1 instanceof Data_Ordering.GT) {
                return Data_Ordering.GT.value;
            };
            var v2 = compare2(x.value2)(y.value2);
            if (v2 instanceof Data_Ordering.LT) {
                return Data_Ordering.LT.value;
            };
            if (v2 instanceof Data_Ordering.GT) {
                return Data_Ordering.GT.value;
            };
            return compare3(x.value3)(y.value3);
        };
    },
    Eq0: function () {
        return eqTime;
    }
};

// | Calculates the difference between two times, returning the result as a
// | duration.
var diff = function (dictDuration) {
    var toDuration = Data_Time_Duration.toDuration(dictDuration);
    return function (t1) {
        return function (t2) {
            return toDuration(append1(timeToMillis(t1))(negateDuration(timeToMillis(t2))));
        };
    };
};
var boundedTime = /* #__PURE__ */ (function () {
    return {
        bottom: new Time(Data_Bounded.bottom(Data_Time_Component.boundedHour), Data_Bounded.bottom(Data_Time_Component.boundedMinute), Data_Bounded.bottom(Data_Time_Component.boundedSecond), Data_Bounded.bottom(Data_Time_Component.boundedMillisecond)),
        top: new Time(Data_Bounded.top(Data_Time_Component.boundedHour), Data_Bounded.top(Data_Time_Component.boundedMinute), Data_Bounded.top(Data_Time_Component.boundedSecond), Data_Bounded.top(Data_Time_Component.boundedMillisecond)),
        Ord0: function () {
            return ordTime;
        }
    };
})();
var maxTime = /* #__PURE__ */ timeToMillis(/* #__PURE__ */ Data_Bounded.top(boundedTime));
var minTime = /* #__PURE__ */ timeToMillis(/* #__PURE__ */ Data_Bounded.bottom(boundedTime));

// | Adjusts a time value with a duration offset. The result includes a
// | remainder value of the whole number of days involved in the adjustment,
// | for example, if a time of 23:00:00:00 has a duration of +2 hours added to
// | it, the result will be 1 day, and 01:00:00:00. Correspondingly, if the
// | duration is negative, a negative number of days may also be returned as
// | the remainder.
var adjust = function (dictDuration) {
    var fromDuration1 = Data_Time_Duration.fromDuration(dictDuration);
    return function (d) {
        return function (t) {
            var tLength = timeToMillis(t);
            var d$prime = fromDuration1(d);
            var wholeDays = Data_Number.floor(unwrap(d$prime) / 8.64e7);
            var msAdjust = append1(d$prime)(negateDuration(fromDuration(wholeDays)));
            var msAdjusted = append1(tLength)(msAdjust);
            var wrap = (function () {
                var $157 = greaterThan(msAdjusted)(maxTime);
                if ($157) {
                    return 1.0;
                };
                var $158 = lessThan(msAdjusted)(minTime);
                if ($158) {
                    return -1.0;
                };
                return 0.0;
            })();
            return new Data_Tuple.Tuple(append2(wholeDays)(wrap), millisToTime(append1(msAdjusted)(8.64e7 * -wrap)));
        };
    };
};
export {
    Time,
    hour,
    setHour,
    minute,
    setMinute,
    second,
    setSecond,
    millisecond,
    setMillisecond,
    adjust,
    diff,
    eqTime,
    ordTime,
    boundedTime,
    showTime
};

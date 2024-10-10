const events = function (obj) {
    let result = {};
    const arr_len = Array.isArray(obj) ? obj.length : false;

    function formCondition(condition) {
        if (!isDefined(condition)) throw new Error("Invalid condition");
        switch (typeof condition) {
            case "function":
                return condition;
            case "object":
                const cond_keys = Object.keys(condition);
                if (cond_keys.some((key) => !isDefined(v[key]))) {
                    throw new Error(`Invalid condition: unknown key ${key}`);
                }

                return (val) =>
                    cond_keys.every((key) => condition[key] === val[key]);
            default:
                return (val) => condition === val;
        }
    }

    for (let [k, v] of Object.entries(obj)) {
        const events = [];
        Object.defineProperties(result, {
            [k]: {
                configurable: false,
                enumerable: false,
                get: function () {
                    return v;
                },
                set: function (val) {
                    v = val;
                    events = events.filter(([condition, func, options], id) => {
                        if (!condition(val)) return true;
                        func(result[k]);
                        return !options.once;
                    });
                },
            },
            [k + "$on"]: {
                configurable: false,
                enumerable: false,
                value: function (condition, func, options = { once: false }) {
                    events.push([formCondition(condition), func, options]);
                    return condition;
                },
            },
            [k + "$onChange"]: {
                configurable: false,
                enumerable: false,
                value: function (func) {
                    events.push([() => true, func]);
                },
            },
        });
    }

    if (arr_len) {
        Object.setPrototypeOf(result, Array.prototype);
        result.length = arr_len;
    }

    return result;
};

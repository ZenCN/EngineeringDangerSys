﻿//----------------------date----------------------
Date.prototype.get_day = function (d) {  //default today(undefined)、oneday: -7 7、lastday 0
    var date = new Date();  //default today

    if (d != undefined) {
        if (typeof d == 'number') {
            if (d != 0) {  //oneday
                date = date.valueOf();
                date = date + d * 24 * 60 * 60 * 1000;
                date = new Date(date);
            } else {  //this month lastday
                date = new Date(date.getFullYear(), date.getMonth(), 0);
            }
        }
    }

    return date;
};

Date.prototype.get_lastday = function (m) {
    var y = new Date().getFullYear(), date;

    if (angular.isArray(m)) {
        date = [];
        angular.forEach(m, function (val) {
            val = parseInt(val) < 10 ? ('0' + val) : val;
            date.push(val + '月' + new Date(y, val, 0).getDate() + '日')
        });
    } else {
        m = parseInt(m) < 10 ? ('0' + m) : m;
        date = m + '月' + new Date(y, m, 0).getDate() + '日';
    }

    return date;
};

Date.prototype.to_str = function (formate) {
    var m = this.getMonth() + 1;
    if (m < 10) {
        m = '0' + m;
    }

    var d = this.getDate();
    if (d < 10) {
        d = '0' + d;
    }

    switch (formate) {
        case '-':
            return this.getFullYear() + "-" + m + "-" + d;
        case 'MM月dd日':
            return m + "月" + d + '日';
        default:
            return this.getFullYear() + "年" + m + "月" + d + '日';
    }

};

//---------------------string---------------------
String.prototype.replace_all = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2); //g全局     
};

String.prototype.contains = function (str) {
    if (typeof(str) == "string" && this.indexOf(str) >= 0) {
        return true;
    } else {
        return false;
    }
};

//---------------------array----------------------
Array.prototype.extract = function (keys) {
    var arr = [];
    if (keys.length) {
        var obj;
        for (var i = 0; i < this.length; i++) {
            obj = {};
            for (var j = 0; j < keys.length; j++) {
                if (this[i][keys[j]] == null || this[i][keys[j]] == 0 ||
                    typeof this[i][keys[j]] == "string" && this[i][keys[j]].trim().length == 0 ||
                    typeof this[i][keys[j]] == "number" && this[i][keys[j]] == 0) {
                    continue;
                }
                obj[keys[j]] = this[i][keys[j]];
            }

            if (!$.isEmptyObject(obj)) {
                arr.push(obj);
            }
        }
    }

    return arr;
};

Array.prototype.the_first = function () {  //注意：不要跟jquery的first方法冲突
    if (this.length) {
        return this[0];
    } else {
        return undefined;
    }
};

Array.prototype.the_last = function () {
    if (this.length) {
        return this[this.length - 1];
    } else {
        return undefined;
    }
};

Array.prototype.seek = function (predicate, match_val, option) {
    if (this == null) {
        throw new TypeError('Array.prototype.find called on null or undefined');
    }

    var list = Object(this);
    var length = list.length >>> 0;
    var value;

    if (typeof predicate == 'function') {
        var thisArg = arguments[1];
        for (var i = 0; i < length; i++) {
            value = list[i];
            //while thisArg is function 'return false' in func inner will break the func
            if (predicate.call(thisArg, value, i, list)) {
                return value;
            }
        }
    } else if (typeof predicate == "string") {
        for (var i = 0; i < length; i++) {
            value = list[i];
            if (value[predicate] == match_val) {
                switch (typeof option) {
                    case 'string':
                        return value[option || predicate];  //return the appointed key
                    case 'number':
                        if (option == 1) {  //find and remove
                            list.splice(i, 1);
                            return true;
                        }
                        break;
                    default:
                        return value;  //找到后默认返回obj
                }
            }
        }
    }

    return false;  //没有找到返回false
};

Array.prototype.exist = function (e) {   //e可为string、number类型或等于null、undefined
    var exist = false;
    if (typeof e == "string") {
        var s = String.fromCharCode(2);
        exist = new RegExp(s + e + s).test(s + this.join(s) + s);
    } else {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == e) {
                exist = true;
                break;
            }
        }
    }

    return exist;
};

//---------------------number----------------------
Number.prototype.toFixed = function (exponent) {  //overwrite toFixed function
    if (exponent) {
        var result = (parseInt(this * Math.pow(10, exponent) + 0.5) / Math.pow(10, exponent)).toString();
        var count = 0;
        if (result.indexOf(".") > 0) {
            count = exponent - result.split(".")[1].length;
        } else {
            count = exponent;
            result += ".";
        }

        for (count; count > 0; count--) {
            result += "0";
        }

        return result;
    } else {
        return parseInt(this);
    }
};
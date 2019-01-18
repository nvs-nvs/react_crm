/* Проверка на существование элемента */
function inArray(needle, haystack) {
    var length = haystack.length;
    for (var i = 0; i < length; i++) {
        if (haystack[i] == needle) return true;
    }
    return false;
}

/**
 * Разрешает вводить только целые числа или запятая
 * @param e {event}
 * @returns {boolean}
 * */
const onlyNumbers = function(e) {
    if (inArray(e.which, [
                "0",
                "8",
                "44",
                "48",
                "49",
                "50",
                "51",
                "52",
                "53",
                "54",
                "55",
                "56",
                "57"
            ])) {
        return true;
    }
    return false;
};

/**
 * Проверка на количество разрядов после запятой
 * @param num Число
 * @param digitAfterComma Сколько цифр после запятой разрешать
 * @returns {boolean}
 */
const checkDigitAfterComma = function (num, digitAfterComma){
    var number = num.replace(",", ".");
    var regexp = /[\.]{1}/;
    if (regexp.test(number)) {
        var arr = number.split('.');
        if (arr.length > 2) {
            return false;
        }
        if(arr[0] == ''){
            return false;
        }
        if (arr[1].length <= digitAfterComma) {
            return true;
        }
        return false;
    }
    else return false;
}

function validateIpAddress(ipaddress){
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        ipaddress)) {
        return (true);
    }
    return (false);
}

function validateMacAddress(macaddress){
    if (/[0-9a-f]{2}:[0-9a-f]{2}:[0-9a-f]{2}:[0-9a-f]{2}:[0-9a-f]{2}:[0-9a-f]{2}$/i.test(
        macaddress)) {
        return (true);
    }
    return (false);
}

/* Проверяет написания email */
function isValidEmailAddress(emailAddress) {
    const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
}

/** Проверка на содержание знака минус
 * @param  str
 * @returns {boolean}
 */
function isHasMinus(str) {
    if (~str.indexOf("-")) {
        return true;
    }
    else return false;
}

/**
 * Проверяет целое ли число?
 * @param num
 * @returns {boolean}
 */
function isInteger(num) {
    var number = num.replace(",", ".");
    var regexp = /\./;
    if (number % 1 == 0 && !regexp.test(number)) {
        return true;
    }
    else return false;
}

export {
    onlyNumbers,
    validateIpAddress
}


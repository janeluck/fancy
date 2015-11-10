/**
 * Created by janeluck on 11/10/15.
 */

// 目前只考虑正整数型
// @param n {Number}

module.exports = function(n) {
    var result = 0, str,secondDigit;
    str = n.toString();
    secondDigit = str.length - 1;
    if (!secondDigit){
        // n < 10
        result = (n <= 5 ? 5 : 10);

    } else {
        if (n == 10) {
            // n = 10
            result = 10;
        } else {
            // n > 10
            result = str.slice(1) -  Math.pow(10, secondDigit-1)*5 > 0 ? (str.substr(0, 1) * 1 + 1) * Math.pow(10, secondDigit) : str.substr(0, 1) * Math.pow(10, secondDigit) +Math.pow(10, secondDigit-1)*5;
        }

    }

    return result;
}

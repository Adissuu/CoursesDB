const { indexOf } = require("lodash");

exports.smartTrim = (str, length, delim, appendix) => {
    if (str.length <= length) return str;

    var trimmedStr = str.substr(str.indexOf('>') + 1, str.indexOf('<', (str.indexOf('>') + 1)));

    trimmedStr = trimmedStr.substr(0, length + delim.length);

    var lastDelimIndex = trimmedStr.lastIndexOf(delim);
    if (lastDelimIndex >= 0) trimmedStr = trimmedStr.substr(0, lastDelimIndex);

    if (trimmedStr) trimmedStr += appendix;
    return trimmedStr;
};
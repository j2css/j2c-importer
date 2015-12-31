module.exports.id = function (x) {return x}
module.exports.beautifyOptions = function (options) {
    var indent = (options || {}).indent  == null ?  "  " : options.indent

    if (!/^(\\t|\t| +)$/.test(indent)) throw new Error("inconsistent indentation, please use tabs or spaces, not mixed")
    if (indent === '\\t') indent = '\t'
    return {
        indent_char: indent[0],
        indent_size: indent.length
    }
}

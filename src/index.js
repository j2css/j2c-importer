var toJ2c = require("./to-j2c")
var beautify = require("js-beautify")
var util = require('util')
var utils = require('./utils')

module.exports = {
    toJ2c: toJ2c,
    toJS: function(source, options) {
        var res = util.inspect(
            toJ2c(source, options), 
            {depth: null}
        )
        if (options && !options.beautify) return res
        else return beautify(
            res,
            utils.beautifyOptions(options)
        )
    },
    toJSON: function(source, options) {
        var res = JSON.stringify(
            toJ2c(source, options)
        )
        if (options && !options.beautify) return res
        else return beautify(
            res,
            utils.beautifyOptions(options)
        )
    }
}

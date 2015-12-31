var toJ2c = require("./to-j2c")
var beautify = require("js-beautify")
var util = require('util')
var utils = require('./utils')

module.exports = {
    toJ2c: toJ2c,
    toJS: function(source, options) {
        return beautify(
            util.inspect(
                toJ2c(source, options), 
                {depth: null}
            ),
            utils.beautifyOptions(options)
        )
    },
    toJSON: function(source, options) {
        return beautify(
            JSON.stringify(
                toJ2c(source, options)
            ),
            utils.beautifyOptions(options)
        )
    }
}

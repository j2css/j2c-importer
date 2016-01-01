var toJ2c = require("./to-j2c")
var beautify = require("js-beautify")
var util = require('util')
var utils = require('./utils')
var defaultsDeep = require('lodash.defaultsdeep');

var defaultOptions = {
    js : {
        case: 'camel',
        beautify: true,
        indent: '  ',
    },
    json : {
        case: 'dash',
        beautify: true,
        indent: '  ',
    }
}


module.exports = {
    toJ2c: function(source, options) {
        options = defaultsDeep({}, options, defaultOptions.js)
        return toJ2c(source, options)
    },
    toJS: function(source, options) {
        options = defaultsDeep({}, options, defaultOptions.js)
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
        options = defaultsDeep({}, options, defaultOptions.json)
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

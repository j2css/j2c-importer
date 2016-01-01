serializers = {
    atrule: function(node, res, caseConverter, adjascent) {
        var k = atRuleKey(node)
        var bl
        switch(node.name) {
            case 'import': case 'charset': case 'namespace': bl = node.params; break
            case 'font-face': case 'viewport': case 'page': bl = block(node.nodes); break
            default: bl = block(node.nodes, caseConverter)
        }
        if (adjascent) {
            res[k] = (res[k] instanceof Array) ? res[k] : [res[k]]
            res[k].push(bl)
        } else {
            res[k] = bl
        }
    },
    rule: function (node, res, caseConverter, adjascent) {
        var k = selectorKey(node)
        var decl = block(node.nodes, caseConverter)
        if (adjascent) {
            res[k] = (res[k] instanceof Array) ? res[k] : [res[k]]
            res[k].push(decl)
        } else {
            res[k] = decl
        }
    },
    decl: function (node, res, caseConverter, adjascent) {
        var k = node.prop.replace(/-([a-z])/g, caseConverter)
        var value = propValue(node)
        if (adjascent) {
            res[k] = (res[k] instanceof Array) ? res[k] : [res[k]]
            res[k].push(value)
        } else {
            res[k] = value
        }
    },
    comment: function(){
        // for now, drop the comments.
    }
}

function atRuleKey (node) {
    if (!node) return null;
    switch(node.name) {
        case 'import': case 'charset': case 'namespace':
        case 'font-face': case 'viewport': return '@' + node.name;
        default: return '@' + node.name + ' ' + node.params
    }
}

function selectorKey (node) {
    if (!node) return null;
    return (/^(?![\d])[-\w]+$/.test(node.selector) ? ' ' : '') + node.selector
}

function propKey (node) {
    var m = ''
    if ('string' === typeof node.raws.before) {
        m = node.raws.before.match(/(?:^|\s+)([\*\(\):_])$/)
        m = m ? m[1] : ''
    }
    return m + node.prop
}

function propValue (node) {
    var value = node.value;
    if (Number(value) === parseInt(value) && Number(value) === Number(value)) value = Number(value)
    return (node.important ? value + ' !important' : value)
}

cornerCase = {
    atrule: function (node, previous, dict) {
        var k = atRuleKey(node)
        if (k in dict) {
            if (atRuleKey(previous) === k) {
                return 'adjascent'
            } else {
                return 'dupe'
            }
        }
        dict[k] = true
    },
    rule: function (node, previous, dict){
        var k = selectorKey(node)
        if (k in dict){
            if (selectorKey(previous) === k) {
                return 'adjascent'
            } else {
                return 'dupe'
            }
        }
        dict[k] = true
    },
    decl: function (node, previous, dict) {
        var k = propKey(node)
        if (!/^(?!\d_)[-\w]+$/.test(k)) return 'hack'

        if (k in dict){
            if (propKey(previous) === k ) {
                return 'adjascent'
            } else {
                return 'dupe'
            }
        }
        dict[k] = true
    },
    comment: function(){}
}

function block(nodes, caseConverter) {
    var dict = {}
    var ary = []
    var res = {}
    var previous
    nodes.forEach(function(node) {
        var special = cornerCase[node.type](node, previous, dict)
        if (special === 'adjascent') {
            serializers[node.type](node, res, caseConverter, true)
        } else if (special === 'hack'){
            if (Object.keys(res).length > 0) {
                ary.push(res)
                res = {}
                dict = {}
            }
            ary.push(propKey(node) + ':' + propValue(node))
        } else {
            if (special === 'dupe') {
                ary.push(res)
                res = {}
                dict = {}
            }
            serializers[node.type](node, res, caseConverter)
        }
        previous = node
    })
    if (ary.length) {
        if (Object.keys(res).length > 0) ary.push(res)
        return ary
    } else {
        return res
    }
}

function analyze(nodes) {
    return {needsAtGlobal: true}
}

var caseHandlers = require('./case')
var postcss = require('postcss')
var safe = require('postcss-safe-parser')

module.exports = function(source, options) {
    var AST = postcss().process(source,  {parser: safe}).root
    var properties = analyze(AST.nodes)
    var caseConverter = caseHandlers[options.case]
    var res = block(AST.nodes, caseConverter, properties)
    if (properties.needsAtGlobal) res = {'@global': res}
    return res
}
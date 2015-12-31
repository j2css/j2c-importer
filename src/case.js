var id = require('./utils').id

module.exports = {
    camel: function(match, letter) {return letter.toUpperCase()},
    snake: function(match, letter) {return '_' + letter},
    dash: id
}

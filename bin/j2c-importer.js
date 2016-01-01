#! /usr/bin/env node

var importer = require('../src')
var fs = require('fs')

var argv = require('yargs')
    .usage('Usage: $0 [options] <input.css>')
    .option('format', {
        describe: 'the output format',
        choices: ['js', 'json'],
        default: 'js'
    })
    .option('case', {
        describe: 'how you want dashed property names to appear in the output. ' +
                  'The options map to camelCase, snake_case and dash-case. ' +
                  'Defaults to `camel` in `js` mode and `dash` in `json` mode.',
        choices: ['camel', 'snake', 'dash']
    })
    .option('beautify', {
        describe: 'when true, the ouput is put on several line and indented.',
        boolean: true,
        default: true
    })
    .option('indent', {
        describe: 'the output indentation level when beautifying (use spaces or tabs)',
        default: '  '
    })
    .help('h')
    .alias('h', 'help').argv

if (!argv._.length) {
    console.error("reading from STDIN has yet to be implemented. Please specify the input file.")
    process.exit(1)
} else {
    var source = fs.readFileSync(argv._[0])
    if (argv.format === 'js') console.log(importer.toJS(source, argv))
    else console.log(importer.toJSON(source, argv))
}

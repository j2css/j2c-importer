#j2c-importer

Reads CSS, prints or loads [J2C](http://j2c.py.gy) source objects.

## Usage

### CLI

```Shell
$ npm install -g j2c-importer
# ...

$ j2c-importer [options] your-sheet.css
# outputs to STDOUT

```

#### options:

- `--format`: `js|json` the output format. Defaults to `js`.
- `--case`: `camel|snake|dash` how you want hyphenated property names to appear in the output? Defaults to `camel` in `js` mode and to `dash` in `json` mode.
- `--beautify`: whether you want the output to be beautified. Defaults to `true`.
- `--indent`: the indentation of the output when beautifying. Defaults to two spaces.

### API

```Shell
npm install --save j2c-importer
```

```
c2j = require('j2c-importer')


obj = importer.toJ2c('a {background-color: red;}', {case:'camel'})
// returns an object, rea
// {'@global': {' a': {backgroundColor: 'red'}}}

js = importer.toJS('a {background-color: red;}', {case:'snake', indent: '\t'})
// returns a multi-line, tab-indented version of 
// "{'@global': {' a': {background_color: 'red'}}}"

JSON = importer.toJSON('a {background-color: red;}', {case:'dash', beautify:false})
// returns a JSON string
// "{\"@global\":{\" a\":{\"background-color\":\"red\"}}}"
```

### Limitations:

- Comments are dropped
- Some CSS hacks may end up mangled. Check twice (or thrice).
- May be more conservative than needed to ensure that `source` and `j2c.sheet(importer.toJ2c(sheet))` are functionally equivalent.
- Little to no systematic testing (WIP).

## License: MIT

The MIT License (MIT)

Copyright (c) 2015 Pierre-Yves Gérardy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
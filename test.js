const { pathToRegexp, match, parse, compile } = require('path-to-regexp')
const path = '/platform/v1/add/:userId'
const regx = pathToRegexp(path)
console.log(regx)
console.log(regx.test('/platform/v1/add/asd123'))

'use strict'

module.exports = () => {
  arguments.map(arg => {
    switch (arg[1]) {
      case '[':
        return arg
              .slice(1)
              .slice(0, arg.length-1)
              .split(',')
        break;
      case '{':
        return JSON.parse(arg)
        break;
      default:
        return arg
        break;
    }
  })
}

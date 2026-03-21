const morgan = require('morgan')

morgan.token('bodyToJson', function (req) {
  return JSON.stringify(req.body)
})

const logger = morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms',
    tokens['bodyToJson'](req, res),
  ].join(' ')
})

module.exports = logger
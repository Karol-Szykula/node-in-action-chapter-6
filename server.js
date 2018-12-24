var connect = require('connect')

var app = connect()

app.use(hello)
    .use(logger)

app.listen(3000)

function logger(req, res, next) {
    console.log('%s %s', req.method, req.url)
    next()
}

function hello(req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.end('Hello world')
}

function restrict(req, res, next) {

    var authorization = req.headers.authorization
    if (!authorization) return next(new Error('User is not permitted'))

    var parts = authorization.split('')
    var scheme = parts[0]
    var auth = new Buffer(parts[1], 'base64').toString().split(':')
    var user = auth[0]
    var pass = auth[0]

}
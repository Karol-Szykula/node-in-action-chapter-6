var connect = require('connect')

var app = connect()

app.use(logger)
    .use('/admin', restrict)
    .use('/admin', admin)
    .use(hello)
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
    console.log(authorization)
    if (!authorization) return next(new Error('User is not permitted'))

    var parts = authorization.split('')
    var scheme = parts[0]
    var auth = new Buffer(parts[1], 'base64').toString().split(':')
    var user = auth[0]
    var pass = auth[0]

    authenticateWithDatabase(user, pass, function (err) {
        if (err) return next(err)
        next()
    })

}

function admin(req, res, next) {
    switch (req.url) {
        case '/':
            res.end('Try use /users')
            break
        case '/users':
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify((['tobi', 'Lukas', 'Jane'])))
            break
    }
}
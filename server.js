const connect = require('connect')

const db = {
    users: [
        { name: 'tobi' },
        { name: 'Lukas' },
        { name: 'Jane' }
    ]
}

const api = connect()
    .use(users)
    .use(pets)
    .use(errorHandler)

const app = connect()
    .use(hello)
    .use('/api', api)
    .use(errorPage)
    .listen(3000)

function hello(req, res, next) {
    if (req.url.match(/^\/hello/)) {
        res.end('Hello world')
    } else {
        next()
    }
}

function users(req, res, next) {
    let match = req.url.match(/^\/user\/(.+)/)
    if (match) {
        let user = db.users[match[1]]
        if (user) {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(user))
        } else {
            let err = new Error('User has not been found')
            err.notFound = true
            next(err)
        }
    } else {
        next()
    }
}

function pets(req, res, next) {
    if (req.url.match(/^\/pet\/(.+)/)) {
        foo()
    } else {
        next()
    }
}
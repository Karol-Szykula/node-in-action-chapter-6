const connect = require('connet')
const router = require('./middleware/router')
const url = require('url')

const routes = {
    GET: {
        '/users': function (req, res) {
            res.end('tobi', 'Lukas', 'Jane')
        },
        '/user/:id': function (req, res, id) {
            res.end('user ' + id)
        }
    },
    DELETE: {
        '/user/:id': function (req, res, id) {
            res.end('Removed user ' + id)
        }
    }
}

connect()
    .use(reqrite)
    .use(showPost)
    .use(router(routes))
    .listen(3000)

function setup(format) {
    var regexp = /:(\w+)/g

    return function logger(req, res, next) {
        var str = format.replace(regexp, function (match, property) {
            return req[property]
        })
        console.log(str)
        next()
    }
}
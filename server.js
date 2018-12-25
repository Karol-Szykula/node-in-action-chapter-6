const connect = require('connect')

const api = connect()
    .use(users)
    .use(pets)
    .use(errorHandler)

const app = connect()
    .use(hello)
    .use('/api', api)
    .use(errorPage)
    .listen(3000)
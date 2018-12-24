const path = url.parse(req.url).pathname

module.exports = function rewrite(req, res, next) {
    if (match) {
        findPostIdBySlug(match[1], function (err, id) {
            if (err) return next(err)
            if (!id) return next(new Error('User has been not found'))
            req.url = '/blog/post/' + id
            next()
        })
    } else {
        next()
    }
}
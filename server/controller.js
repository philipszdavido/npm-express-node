//server/controller.js
const Movie = require('./movie')

module.exports = {
    create(req, res, next) {
        (new Movie(req.body)).save((err, newMovie) => {
            if (err)
                res.send(err)
            else if (!newMovie)
                res.send(400)
            else
                res.send(newMovie)
            next()
        })
    },
    findAll(req, res, next) {
        Movie.find((err, data) => {
            if (err) {
                res.send(err)
            } else {
                res.send(data)
            }
            next()
        })
    },
    deleteMovie(req, res, next) {
        Movie.findByIdAndRemove(req.params.id, (err) => {
            if (err)
                res.send(err)
            else
                res.sendStatus(204)
            next()
        })
    },
    updateMovie(req, res, next) {
        Movie.findByIdAndUpdate(req.params.id, req.body, (err, updatedMovie) => {
            if (err)
                res.send(err)
            else if (!updatedMovie)
                res.send(400)
            else
                res.send(req.body)
            next()
        })
    },
    getMovie(req, res, next) {
        Movie.findById(req.params.id, (err, Movie) => {
            if (err)
                res.send(err)
            else if (!Movie)
                res.send(404)
            else
                res.send(Movie)
            next()
        })
    }
}
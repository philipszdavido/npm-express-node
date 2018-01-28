const movieController = require('./controller')
const multipart = require('connect-multiparty')

const multipartWare = multipart()

module.exports = (router) => {
    router
        .route('/movies')
        .get(movieController.findAll)

    router
        .route('/movies')
        .post(multipartWare, movieController.create)

    router
        .route('/movies/:id')
        .put(movieController.updateMovie)

    router
        .route('/movies/:id')
        .delete(movieController.deleteMovie)

    router
        .route('/movies/:id')
        .get(movieController.getMovie)
}
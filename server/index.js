const express = require('express')
const cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser')
const multipart = require('connect-multiparty')
const jwt = require('express-jwt')
const morgan = require('morgan')
const jwks = require('jwks-rsa');
const compression = require('compression')
const helmet = require('helmet')
const routes = require('./routes')

const app = express()
const router = express.Router()

app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
app.use(compression())

if (process.env.NODE_ENV != 'test')
    app.use(morgan('common'))

if (process.env.NODE_ENV != 'test') {
    var jwtCheck = jwt({
        secret: jwks.expressJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: process.env.AUTH0_URL
        }),
        audience: process.env.AUTH0_AUDIENCE,
        issuer: process.env.AUTH0_ISSUER,
        algorithms: ['RS256']
    });

    app.use(jwtCheck);

    // catch error
    app.use(function(err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
            res.status(401).send('Invalid token, or no token supplied!');
        } else {
            res.status(401).send(err);
        }
    });

    app.use((err, request, response, next) => {
        response.status(err.status || 500);
        response.json({
            error: "Server error"
        })
    });
}

routes(router)
app.use('/api', router)
let port = process.env.PORT || 3003

const server = app.listen(port, () => {
    console.log(`Server listening on port:${port}`)
})

module.exports = app
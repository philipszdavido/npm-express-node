[![Build Status](https://travis-ci.org/philipszdavido/npm-express-node.svg?branch=master)](https://travis-ci.org/philipszdavido/npm-express-node)
[![Coverage Status](https://coveralls.io/repos/github/philipszdavido/npm-express-node/badge.svg?branch=master)](https://coveralls.io/github/philipszdavido/npm-express-node?branch=master)

# npm-express-node
This repo demontrates 15 usefuls NPM packages to use in `Node.js` + `Express` app.

### NPM packages used
s/n | NPM package | Description
--- | ----------- | -----------
1 | [body-parser](https://www.npmjs.com/package/body-parser) | This module lets you authenticate HTTP requests using JWT tokens in your Node.js applications.
2 | [chai](https://www.npmjs.com/package/chai) | BDD/TDD assertion library for Node.js and the browser. Test framework agnostic.
3 | [compression](https://www.npmjs.com/package/compression) | Node.js compression middleware.
4 | [connect-multiparty](https://www.npmjs.com/package/connect-multiparty) | A Node.js module for parsing multipart-form data requests
5 | [cors](https://www.npmjs.com/package/cors) | CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
6 | [coveralls](https://www.npmjs.com/package/coveralls) | Coveralls.io support for Node.js. Get the great coverage reporting of coveralls.io and add a cool coverage button ( like the one above ) to your README.
7 | [dotenv](https://www.npmjs.com/package/dotenv) | Loads environment variables from .env file
8 | [express](https://www.npmjs.com/package/express) | Fast, unopinionated, minimalist web framework for Node.js.
9 | [express-jwt](https://www.npmjs.com/package/express-jwt) | JWT authentication middleware.
10 | [helmet](https://www.npmjs.com/package/helmet) | help secure Express/Connect apps with various HTTP headers
11 | [istanbul](https://www.npmjs.com/package/istanbul) | a JS code coverage tool written in JavaScript
12 | [jwks-rsa](https://www.npmjs.com/package/jwks-rsa) | Library to retrieve RSA public keys from a JWKS endpoint
13 | [mocha](https://www.npmjs.com/package/mocha) | simple, flexible, fun test framework
14 | [mongoose](https://www.npmjs.com/package/mongoose) | Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
15 | [morgan](https://www.npmjs.com/package/morgan) | HTTP request logger middleware for Node.js

To demonstrate how the NPM packages are used in an Express + Node.js app, I implemented a Movies API, below is the Movies API Object Model and the API Summary.

## Movies API Object Model

```json
  "name": "",
  "description": "",
  "rating": "",
  "image": ""
```

## API Summary

**Note**: All requests must be prefixed with  **<YOUR_URL_HERE>/api/**

## Movie

EndPoint | Functionality
-------- | -------------
POST /movies/ | Creates a new movie instance.
GET /movies/ | Returns all movies.
GET /movies/`<id>` | Returns the specified movie id.
PUT /movies/`<id>` | Update movie attributes.
DELETE /movies/`<id>` | Delete movie.

### Installation

1.  Clone the [**repository here**](https://github.com/philipszdavido/npm-packages.git):

        git clone https://github.com/philipszdavido/npm-packages.git

1.  Move into the folder form your terminal:

        cd npm-packages

1.  Copy `.env.template` to `.env`:

        cp .env.template .env

1.  Edit the `.env` key-value pairs to your own configuration.
1.  Run `npm install` to install node dependencies.
1.  Run `node .` or `npm run start` to start the server.

## Usage

**Note**: Replace your Auth0 authentication credentials in the `.env` file.

```env
...
AUTH0_ISSUER = <YOUR_AUTH0_ISSUER_HERE>
AUTH0_URL = <YOUR_AUTH0_URL_HERE>
API_AUDIENCE = <YOUR_API_AUDIENCE_HERE>
```

### Movies POST Test - This creates a new movie
```sh
CLIENT_ID="<YOUR-CLIENT-ID-HERE>";
CLIENT_SECRET="<YOUR-CLIENT-SECRET-HERE>";
AUDIENCE_ATTRIBUTE="<YOUR-AUDIENCE-ATTRIBUTE-HERE>"
AUTH0_DOMAIN="<YOUR-AUTH0-DOMAIN>"

JWT=$(curl --request POST \
  --url https://$AUTH0_DOMAIN.auth0.com/oauth/token \
  --header 'content-type: application/json' \
  --data '{"client_id":"'$CLIENT_ID'","client_secret":"'$CLIENT_SECRET'","audience":"'$AUDIENCE_ATTRIBUTE'","grant_type":"client_credentials"}' | jq .access_token -r);

curl --request POST \
  --url http://localhost:3003/api/movies \
  --header 'authorization: Bearer '$JWT \
  --header 'content-type: application/json' \
  --data '{"name":"Arrow","description":"bad movie","rating":"7.0","image":"michaeljackson.png"}'
```

### Movies GET Test - This retrieves all movies from the database
```sh
CLIENT_ID="<YOUR-CLIENT-ID-HERE>";
CLIENT_SECRET="<YOUR-CLIENT-SECRET-HERE>";
AUDIENCE_ATTRIBUTE="<YOUR-AUDIENCE-ATTRIBUTE-HERE>"
AUTH0_DOMAIN="<YOUR-AUTH0-DOMAIN>"

JWT=$(curl --request POST \
  --url https://$AUTH0_DOMAIN.auth0.com/oauth/token \
  --header 'content-type: application/json' \
  --data '{"client_id":"'$CLIENT_ID'","client_secret":"'$CLIENT_SECRET'","audience":"'$AUDIENCE_ATTRIBUTE'","grant_type":"client_credentials"}' | jq .access_token -r);

curl --request GET \
  --url http://localhost:3003/api/movies \
  --header 'authorization: Bearer '$JWT
```

### Movies GET `<id>` Test - This retrieves a specific movie id from the database 
```sh
CLIENT_ID="<YOUR-CLIENT-ID-HERE>";
CLIENT_SECRET="<YOUR-CLIENT-SECRET-HERE>";
AUDIENCE_ATTRIBUTE="<YOUR-AUDIENCE-ATTRIBUTE-HERE>"
AUTH0_DOMAIN="<YOUR-AUTH0-DOMAIN>"

JWT=$(curl --request POST \
  --url https://$AUTH0_DOMAIN.auth0.com/oauth/token \
  --header 'content-type: application/json' \
  --data '{"client_id":"'$CLIENT_ID'","client_secret":"'$CLIENT_SECRET'","audience":"'$AUDIENCE_ATTRIBUTE'","grant_type":"client_credentials"}' | jq .access_token -r);

curl --request GET \
  --url http://localhost:3003/api/movies/<MOVIE_ID_HERE> \
  --header 'authorization: Bearer '$JWT
```

## Requirements
* [**Node JS**](https://nodejs.org/en/)
* [**Mongodb**](https://www.mongodb.org/downloads/)

### Test
Run `npm test` on your terminal. Remember to  run test on the project root directory.

### Contributing
1. Create an issue. First look through [the open issues](https://github.com/philipszdavido/npm-packages/issues).
1. Clone the repository or fork it.

         git clone https://github.com/philipszdavido/npm-packages

1. Create your feature branch:

         git checkout -b new-feature

1. Commit your changes:

         git commit -m 'Add some feature'

1. Push to the branch:

         git push origin new-feature

1. Submit a pull request.

###  Links
* Follow me on [twitter](https://twitter.com/ngArchangel).

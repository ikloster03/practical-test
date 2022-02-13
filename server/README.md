# Server

## Install

1. [Download and install LTS Node.js](https://nodejs.org/en/download/)
2. [Download, install and run MongoDB 4.4.3 or higher](https://docs.mongodb.com/manual/installation/)
   1. Or you can use [MongoDB Atlas](https://cloud.mongodb.com).
3. Move to server directory (if you are in the root directory)
```sh
cd server
```
4. Install dependencies
```sh
npm i # or yarn
```
5. Set your custom environment variables (copy example env)
```sh
cp .env.example .env
```
6. Run seeding migrations
```sh
npm run migrate:up # or yarn migrate:up
```
7. Start dev version
```sh
npm run dev # or yarn dev
```

### If you would like see production version

Set `NODE_ENV=production`

```sh
npm run start # or yarn start
```

## Test

You can run integration API tests

```sh
npm run test # or yarn test
```

## Main libraries

1. [express](https://expressjs.com/) is a minimal and flexible Node.js web application framework.
2. [nodemon](https://nodemon.io/) is a utility for monitoring any changes in your source and automatically restarting your server.
3. [dotenv](https://github.com/motdotla/dotenv) is a zero-dependency module that loads environment variables. It uses [The Twelve-Factor App methodology.](https://12factor.net/config)
4. [body-parser](https://github.com/expressjs/body-parser) is Node.js body parsing middleware.
5. [mongoose](https://mongoosejs.com/) provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.
6. [yup](https://github.com/jquense/yup) is a schema builder for runtime value parsing and validation.

## Code linting

1. [eslint](https://eslint.org/) (with [airbnb](https://www.npmjs.com/package/eslint-config-airbnb)) is statically code analyzer.

## Migrations

1. [migrate-mongo](https://github.com/seppevs/migrate-mongo) is a database migration tool for MongoDB running in Node.js.
2. [faker](https://github.com/marak/Faker.js/) - generate massive amounts of fake data in the browser and node.js. But now you need to use [this correct version - 5.5.3](https://www.npmjs.com/package/faker/v/5.5.3).

## Testing libraries

1. [jest](https://jestjs.io/) is JavaScript Testing Framework.
2. [supertest](https://github.com/visionmedia/supertest). HTTP assertions made easy via superagent.
3. [coveralls](https://coveralls.io/) can get the great coverage reporting.

## API documentation

1. [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express). This module allows you to serve auto-generated swagger-ui generated API docs from express, based on a swagger.json file. The result is living documentation for your API hosted from your API server via a route.
2. [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc). This library reads your JSDoc-annotated source code and generates an OpenAPI (Swagger) specification.

## Security issues 

1. [cors](https://github.com/expressjs/cors) is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
2. [helmet](https://helmetjs.github.io/) helps you secure your Express apps by setting various HTTP headers.
3. [xss-clean](https://github.com/jsonmaur/xss-clean) is a middleware to sanitize user input coming from POST body, GET queries, and url params.
4. [express-mongo-sanitize](https://github.com/fiznool/express-mongo-sanitize) is a middleware which sanitizes user-supplied data to prevent MongoDB Operator Injection.
5. [eslint-plugin-security](https://github.com/nodesecurity/eslint-plugin-security) is ESLint rules for Node Security.

## Extra libraries

1. [winston](https://github.com/winstonjs/winston) is designed to be a simple and universal logging library with support for multiple transports.
2. [morgan](https://github.com/expressjs/morgan) is HTTP request logger middleware for node.js
3. [yup-phone](https://github.com/abhisekp/yup-phone) is yup phone validator using [google-libphonenumber](https://memoryleak.dev/google-libphonenumber/).
4. [http-status](https://github.com/adaltas/node-http-status) is a utility to interact with HTTP status codes.

require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
require('./src/utils/database');
// require('./src/helpers/authProviders');
require('./src/utils/globals');
const path = require('path')
const morgan = require('morgan')

const app = express();

app.use(express.json());



const { logger, accessLogStream } = require('./src/utils/logger');
const corsMiddleware = require('./src/utils/cors');

// Middleware
app.use(morgan('combined', { stream: accessLogStream })); // Log HTTP requests to file
app.use(express.json());
app.use(corsMiddleware);

// Serve static files from the "public" directory, including Nuxt build
app.use(express.static(path.join(__dirname, 'public')));


// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle all other routes - serve the SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Set up express-session middleware
app.use(
  session({
    secret: process.env.SECRET, // Change this to a secret key for session encryption
    resave: false,
    saveUninitialized: false,
    // Set the session to expire after 20 days
    cookie: {
      maxAge: 20 * 24 * 60 * 60 * 1000, // 20 days in milliseconds
    },
  })
);

const passport = require('passport');
// Configure Passport.js middleware
app.use(passport.initialize());

// const Honeybadger = require('@honeybadger-io/js');
// Honeybadger.configure({
//   apiKey: process.env.HONEYBADGER,
//   environment: process.env.HONEYBADGER_ENV
// });

const cors = require('cors');

app.use(
  cors({
    origin: ['http://localhost:3001', 'https://app.betakopa.com'],
  })
);

app.get('/', (req, res) => {
  res.send('API is active 🚀')
})

/**
 * Middleware for handling errors.
 * @param {Error} err - The error object.
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 * @param {express.NextFunction} next - The next function.
 */
app.use((err, req, res, next) => {
  return errorResponse(res, 'Internal server error');
});

// Swagger documentation
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/apidocs.json');
const options = {
  customCss: '.swagger-ui .topbar { display: none }',
};
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

// Import base routes
const routes = require('./routes');

// Use base routes
app.use(routes);

/**
 * The port number the application will listen on.
 * @type {number|string}
 */
const port = process.env.PORT || 3000;
app.listen(port, () => {
  log(`Server listening on port ${port} 🚀`);
});


// utils/cors.js
const cors = require('cors');

const corsOptions = {
origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'], // Allow specific origins
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;


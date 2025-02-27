const express = require("express");

const router = express.Router();

// Import routes
const userRoute = require("./src/modules/user/route");


// Mount routes
router.use(
  userRoute,
);

module.exports = router;

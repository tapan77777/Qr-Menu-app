const moment = require('moment');

// Middleware to validate request timestamp
const validateRequestTime = (req, res, next) => {
  const requestTime = req.headers['x-request-time']; // Assumes the timestamp is passed in headers
  const currentTime = moment.utc(); // Get the current UTC time
  const requestTimeMoment = moment.utc(requestTime); // Convert the request time to UTC

  // Ensure the request time is within 1 hour difference
  if (currentTime.diff(requestTimeMoment, 'minutes') > 60) {
    return res.status(400).json({
      message: `Stale request - reported time is ${requestTime} which is more than 1 hour ago`
    });
  }

  next();
};

module.exports = validateRequestTime;

const cors = require('cors');

const { CORS_WHITELIST } = require('../configs');

const corsOptions = {
  origin(origin, callback) {
    if (CORS_WHITELIST.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

const corsValidate = cors(corsOptions);

module.exports = corsValidate;

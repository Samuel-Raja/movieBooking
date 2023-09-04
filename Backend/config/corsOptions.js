
 //const whitelist = ['http://example1.com', 'http://example2.com']

 const allowedOrigins = require('./allowedOrigins');

const  corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}


module.exports = corsOptions ;
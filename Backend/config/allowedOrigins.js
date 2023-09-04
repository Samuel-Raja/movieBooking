
require('dotenv').config();

const allowedOrigins = [


   process.env.FRONTEND_URL,

   "https://movie-booking-chi-flax.vercel.app"

  


]


module.exports = allowedOrigins ;

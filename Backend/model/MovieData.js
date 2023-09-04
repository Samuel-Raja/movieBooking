const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
     
     Name : {

        type: String,
        required: true

     },

     Src : {

        type: String,
        required: true

     }

  });



  module.exports =  mongoose.model('Movie', movieSchema);
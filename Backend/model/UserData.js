
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

   UserName : {
   
        type: String,
        required: true

   },

   Password: {

      type: String,
      required: true 
      // match : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i

   },

   Role :  String,

   refreshToken : String, 




});


module.exports = mongoose.model("User", userSchema );


const jwt = require('jsonwebtoken');
const UserData = require('../model/UserData');

const handleRefreshToken = async(req, res) => {

    const cookies = req.cookies;

    if(!cookies?.jwt) {

      return res.status(401).json("Refresh Token required")

    }

    const token = cookies.jwt; 

    const findUser = await UserData.findOne({"refreshToken": token }).exec()

    if(!findUser){

        return res.status(401).json("Not a valid refresh Token");

    }



    jwt.verify(

      token,
      process.env.REFRESH_TOKEN_SECRET_KEY,
      (error, decoded) => {

        if(error || (decoded.UserName !== findUser.UserName) ){
        
            return res.status(401).json("Not a valid refresh Token");

        } 


     const accessToken =  jwt.sign(

            {
                "UserInfo" : 
                 {
                 "UserName" : findUser.UserName,
                 "Role": findUser.Role
                  }
         
             },
             
           process.env.ACCESS_TOKEN_SECRET_KEY,
         
           {expiresIn: '1m' }
         
         
        );


       res.status(201).json({accessToken, Role: findUser.Role});


      }



    )




}


module.exports = handleRefreshToken ;



const UserData = require('../model/UserData');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const handleLogin = async(req, res) => {


    const UserName = req.body.UserName;
    const Password = req.body.Password;

    if(!UserName || !Password) {

       return  res.status(404).json({error : "UserName and Password is required"});

    }

  const findUser = await UserData.findOne({UserName});

  if(!findUser) {

   return res.status(406).json({error: "UserName is not registered"});

  }

  const verifyPassword = await bcrypt.compare(Password, findUser.Password );

  if(!verifyPassword){

    return res.status(406).json({error: "Incorrect Password" });

 }

  
 //const roles = Object.values(findUser.Role);

 const accessToken = jwt.sign(

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


 const refreshToken = jwt.sign(

    {
        "UserName": findUser.UserName
    },

    process.env.REFRESH_TOKEN_SECRET_KEY,

    {expiresIn: '1d' }

 );


  findUser.refreshToken = refreshToken;

  await findUser.save();


  // use secure as false in development mode when using local host 

  res.cookie('jwt', refreshToken, {httpOnly: true,  sameSite: 'None', secure: true,   maxAge: 24 * 60 * 60 * 1000 } );


   res.json({accessToken, Role: findUser.Role});


  //res.status(201).json("Logged in successfully");


}



module.exports = handleLogin ;

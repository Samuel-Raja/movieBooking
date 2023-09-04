
const UserData = require('../model/UserData');

const bcrypt = require('bcrypt');

const signUpHandler = async(req, res) => {

   try{ 

      const UserName = req.body.UserName;
      const Password = req.body.Password ;

   
    if(!UserName || !Password) {

          return res.status(404).json({error: "UserName and Password is required"})

      }


     const findUser = await UserData.findOne({UserName: UserName});

     

     if(findUser){

        return res.status(409).json({error : "The entered UserName is already exist"});

     }

     const hashPassword = await bcrypt.hash(Password, 10);
     

     await UserData.create({UserName, Password: hashPassword });


     res.status(201).json({success:`${UserName} is registered Successfully` })

      


    } catch(err) {

        res.status(404).json(`error: ${err}`);

    }
     


}



module.exports = signUpHandler ;
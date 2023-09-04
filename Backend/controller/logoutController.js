const UserData = require('../model/UserData');

const logoutHandler = async(req, res) => {

    try {

    
   const cookies = req.cookies;


    if(!cookies?.jwt) {

        return res.status(404).json("User is not logged in")

    }

    const refreshToken = cookies.jwt;

    const findUser = await UserData.findOne({refreshToken}).exec();

    if(!findUser){

        res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: false } );

       return res.status(404).json("User is not logged in");

    }

    res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: false } );

    findUser.refreshToken = undefined ;

    await findUser.save();

    res.status(200).json("Logged off successfully")


} catch(err) {

    res.status(404).json(`error: ${err}`);
}


}


module.exports = logoutHandler ;

const verifyRole = (req, res, next) => {

    const Role = req.Role;

    if (Role !== "Admin" ){

        return res.status(401).json(`Only admin can ${req.method} in the database`)

    }

    next();


}


module.exports = verifyRole ;
const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {

  // Get the token from the request headers
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if(!authHeader?.startsWith("Bearer ")){

    return res.status(401).json({ message: 'Token is required' });

  }

  const token = authHeader.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ message: 'Token is required' });
  }

  

  // Verify the token
  jwt.verify(
    token,
     process.env.ACCESS_TOKEN_SECRET_KEY,
     (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    // Attach the decoded user information to the request object
    req.Role = decoded.UserInfo.Role;

    next(); // Continue to the next middleware or route handler
  });

}

module.exports = verifyJWT;




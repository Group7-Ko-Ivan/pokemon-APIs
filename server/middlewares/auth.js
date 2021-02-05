const { verifyToken } = require('../helpers/jwt');


const authenticate = (req, res, next) => {
  try {

    const access_token = req.headers.access_token;
    console.log(access_token);
    const decoded = verifyToken(access_token);
    console.log(decoded);

    req.decoded = decoded;
    
    next();
  } catch (err) {
    console.log(err);
    next(err)
  }
}

module.exports = authenticate;
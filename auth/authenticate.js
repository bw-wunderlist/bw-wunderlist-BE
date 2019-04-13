const jwt = require("jsonwebtoken");

const secret = require("./secrets").jwtSecret;

module.exports = {
  authenticate
};

function authenticate(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) return res.status(401).json(err);

      req.decoded = decoded;
      console.log(decoded)
      next();
    });
  } else {
    return res.status(401).json({
      error: `No token provided, must be set is the Authorization Header`
    });
  }
}

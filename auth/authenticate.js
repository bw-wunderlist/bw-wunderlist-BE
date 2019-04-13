const jwt = require("jsonwebtoken");

const jwtKey =
  process.env.JWT_SECRET ||
  `what up wunderlist v2.0 build week! There is no need to read this I am just making it long ; )`;

module.exports = {
  authenticate
};

function authenticate(req, res, next) {
  const token = req.get("Authorization");

  if (token) {
    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err) return res.status(401).json(err);

      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(401).json({
      error: `No token provided, must be set is the Authorization Header`
    });
  }
}

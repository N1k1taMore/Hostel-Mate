const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(user_id, type) {
  const payload = {
    user: {
      user_id,
      type
    }
  };
  
  return jwt.sign(payload, process.env.JWTSECRET, { expiresIn: "1h" });
}
function jwtDecoder(token) {
    try {
        return jwt.verify(token, process.env.JWTSECRET);
    } catch (err) {
        // Handle token verification error
        return null;
    }
}

module.exports = {
  jwtDecoder,
  jwtGenerator,
};

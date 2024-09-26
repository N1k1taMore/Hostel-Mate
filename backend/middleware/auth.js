const jwt = require("jsonwebtoken");

const authorizeWardenOrStudent = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ error: "No token provided" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWTSECRET); 
    const { type } = decodedToken.user;

    if (type === "warden" || type === "student") {
      req.user = decodedToken.user; 
      next();
    } else {
      res.status(403).json({ error: "Unauthorized" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const authorizeWarden = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log("here", req.headers,token);
    const decodedToken = jwt.verify(token, process.env.JWTSECRET);
    console.log(decodedToken)
    if (decodedToken.user.type === "warden") {
      return next();
    } else {
     return res.status(403).json({ error: "only warden can access" });
    }

  } catch (err) {
    console.error("here1",err.message);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

const authorizeStudent = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log("here", req.headers,token);
    const decodedToken = jwt.verify(token, process.env.JWTSECRET);
    console.log(decodedToken)
    if (decodedToken.user.type === "student") {
      return next();
    } else {
     return res.status(403).json({ error: "Unauthorized for Student" });
    }

  } catch (err) {
    console.error("here13",err.message);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

const authorizeComplaintRoute = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log("here", req.headers, token);
    const decodedToken = jwt.verify(token, process.env.JWTSECRET);
    console.log(decodedToken);

    return next();
  } catch (err) {
    console.error("here11", err.message);
    return res.status(401).json({ error: "Unauthorized" });
  }
};


module.exports = {
  authorizeWardenOrStudent,
  authorizeWarden,
  authorizeStudent,
  authorizeComplaintRoute
};

const jwt = require("jsonwebtoken");
const User = require("../model/User");

module.exports = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) throw { code: 401 };

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw { code: 400 };
    }

    const user = await User.findById(decoded.id);

    if (!user) throw { code: 404 };

    req.user = user;
    next();
  } catch (e) {
    console.error(e);
    if ([400, 401, 404].includes(e.code))
      return res.status(401).json({ msg: "Invalid Credentials" });
    res.status(500).json({ msg: "Something went wrong" });
  }
};

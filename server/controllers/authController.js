const User = require("../model/User");

exports.signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) throw { code: 400 };

    if (password.length < 6) throw { code: 400 };

    let user = await User.findOne({ email });

    if (user) throw { code: 401 };

    user = await User.create({ email, password });

    const token = user.generateJwtToken();
    res.status(201).json({ token });
  } catch (e) {
    console.error(e);
    if (e.code === 400)
      return res.status(400).json({
        msg:
          "Email and passowrd are required, password must be 6 characters long",
      });
    if (e.code === 401)
      return res.status(400).json({
        msg: "User already exists",
      });
    res.status(500).json({ msg: "Something went wrong" });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) throw { code: 400 };

    let user = await User.findOne({ email });

    if (!user) throw { code: 404 };

    if (!(await user.isCorrectPassword(password))) throw { code: 401 };

    const token = user.generateJwtToken();
    res.status(200).json({ token });
  } catch (e) {
    if (e.code === 400) return res.status(400).json({ msg: "Missing Fields" });

    if (e.code < 500)
      return res.status(401).json({ msg: "Invalid credentials" });

    res.status(500).json({ msg: "Something went wrong" });
  }
};

exports.loadUser = async (req, res, next) => {
  return res.status(200).json({ user: req.user });
};

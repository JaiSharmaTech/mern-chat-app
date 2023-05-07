const USER = require("../model/userModel");
const bcrypt = require("bcrypt");
module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await USER.findOne({ username });
    if (usernameCheck) {
      return res.json({ msg: "Username already exists", status: false });
    }
    const emailCheck = await USER.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "Email already exists", status: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await USER.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (err) {
    next(err);
    res.status(500).json({ status: false, msg:err });
  }
};

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
    res.status(500).json({ status: false, msg: err });
  }
};
module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const dbUser = await USER.findOne({ username });
    if (!dbUser) {
      return res.json({ msg: "Incorrect username or password", status: false })
    }
    const isPasswordValid = await bcrypt.compare(password, dbUser.password);
    if (!isPasswordValid) {
      return res.json({ msg: "Incorrect username or password", status: false })
    }
    delete dbUser.password;
    return res.json({ status: true, user: dbUser })
  } catch (err) {
    next(err);
    res.status(500).json({ status: false, msg: err });
  }
};
module.exports.setAvatar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { image } = req.body;
    const userData = await USER.findByIdAndUpdate({ _id: id }, {
      $set: {
        isAvatarImageSet: true,
        avatarImage: image
      }
    })
    return res.json({ isSet: true, image: userData.avatarImage })
  } catch (err) {
    next(err);
    res.status(500).json({ isSet: false, msg: err });
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await USER.find({ _id: { $ne: req.params.id } }).select([
      "email", "username", "avatarImage", "_id"
    ])
    return res.json(users)
  } catch (err) {
    next(err)
    return res.json({ err })
  }
}
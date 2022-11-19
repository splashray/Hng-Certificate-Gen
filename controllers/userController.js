const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const updateUserName = async (req, res) => {
  if (!req?.params.id)
    return res.status(400).json({ message: "user ID required" });

  const { name } = req.body;

  const user = await User.findOne({ _id: req.params.id }).exec();

  user.name = name;
  await user.save();

  return res.status(201).json({ user });
};

const updateAvatar = async (req, res) => {
  if (!req?.params.id)
    return res.status(400).json({ message: "user ID required" });

  const { avatar } = req.body;

  const user = await User.findOne({ _id: req.params.id }).exec();

  user.avatar = avatar;
  await user.save();

  return res.status(201).json({ user });
};

const updatePassword = async (req, res, next) => {
  const { email, oldPassword, newPassword } = req.body;
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newPassword, salt);
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).send({ message: "Could not find user" });
    } else {
      const isEqual = await bcrypt.compare(oldPassword, user.password);
      if (!isEqual) {
        res.status(404).send({ message: "Could not find password" });
      } else {
        user.password = hash || user.password;
        const updatedUser = await user.save();
        res
          .status(200)
          .send({ user: updatedUser, message: "Password updated" });
      }
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  updateUserName,
  updateAvatar,
  updatePassword,
};

const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { Conflict } = require("http-errors");
const { User } = require("../../models");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    // return res.status(409).json({ message: `Email in use` });
    throw new Conflict(`Email in use`);
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarUrl = gravatar.url(email, { s: 250 }, true);
  await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarUrl,
  });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        avatarUrl,
        subscription,
      },
    },
  });
};

module.exports = register;

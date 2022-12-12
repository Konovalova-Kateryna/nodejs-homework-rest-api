const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { Conflict } = require("http-errors");
const { nanoid } = require("nanoid");
const { User } = require("../../models");
const { sendRegisterEmail } = require("../../helpers");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    // return res.status(409).json({ message: `Email in use` });
    throw new Conflict("Email in use");
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarUrl = gravatar.url(email, { s: 250 }, true);
  const verificationToken = nanoid();
  const newUser = new User({
    email,
    password: hashPassword,
    subscription,
    avatarUrl,
    verificationToken,
  });
  try {
    await newUser.save();
    await sendRegisterEmail({ email, token: verificationToken });
  } catch (error) {
    console.log(error.messsage);
  }

  // try {
  //   await User.create({
  //     email,
  //     password: hashPassword,
  //     subscription,
  //     avatarUrl,
  //     verificationToken,
  //   });
  //   await sendRegisterEmail({ email, token: verificationToken });
  // } catch (err) {
  //   throw err;
  // }
  // throw err;

  return res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        avatarUrl,
        subscription,
        verificationToken,
      },
    },
  });
};

module.exports = register;

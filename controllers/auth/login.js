const { Unauthorized } = require("http-errors");
const bcrypt = require("bcrypt");
const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  const passCompare = bcrypt.compareSync(password, user.password);
  if (!user || !passCompare || !user.verify) {
    throw new Unauthorized("Email or password is wrong or email not verified");
  }
  // if (user || passCompare || !user.verify) {
  //   throw new Unauthorized("Email not verified");
  // }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  return res.json({
    status: "success",
    code: 200,
    data: { token },
  });
};

module.exports = login;

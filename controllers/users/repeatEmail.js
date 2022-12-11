const { BadRequest } = require("http-errors");
const { User } = require("../../models");
const { sendRegisterEmail } = require("../../helpers");

const repeatEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequest("Missing required field email");
  }
  const user = await User.findOne({ email });
  console.log(user.verificationToken);
  if (user && !user.verify) {
    await sendRegisterEmail({ email, token: user.verificationToken });
    return res.status(200).json({
      message: "Verification email sent",
    });
  }
  if (user && user.verify) {
    return res.status(400).json({
      message: "Verification has already been passed",
    });
  }
};

module.exports = repeatEmail;

// const { NotFound } = require("http-errors");
const { User } = require("../../models");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    return res.status(404).message("User not found");
    // throw new NotFound("No user found");
  }
  if (user && !user.verify) {
    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });

    return res.status(200).json({
      message: "Verification successful",
    });
  }
  if (user && user.verify) {
    return res.status(404).json({
      message: "Email already verified",
    });
  }
};

module.exports = verifyEmail;

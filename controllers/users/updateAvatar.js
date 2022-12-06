const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarDir = path.join(__dirname, "../../public/avatars");

const updateAvatar = async (req, res) => {
  const { file } = req;
  const { id } = req.user;

  const smallAvatar = await Jimp.read(file.path);
  await smallAvatar
    .autocrop()
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(file.path);

  const imageName = `${id}_${file.originalname}`;

  try {
    const resultUpload = path.join(avatarDir, imageName);

    await fs.rename(file.path, resultUpload);
    const avatarUrl = path.join("public", "avatars", imageName);
    await User.findByIdAndUpdate(req.user.id, { avatarUrl });

    res.json({ avatarUrl });
  } catch (err) {
    await fs.unlink(file.path.tempUpload);
    throw err;
  }
};

module.exports = updateAvatar;

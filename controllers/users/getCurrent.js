const getCurrent = async (req, res) => {
  const { email, avatarUrl, subscription } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: {
      user: {
        email,
        avatarUrl,
        subscription,
      },
    },
  });
};

module.exports = getCurrent;

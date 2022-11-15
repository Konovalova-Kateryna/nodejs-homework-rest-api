const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { favorite = null } = req.query;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  let contacts = [];
  if (favorite) {
    contacts = await Contact.find({ owner: _id, favorite }, "-_v", {
      skip,
      limit,
    }).populate("owner", "_id email");
  } else {
    contacts = await Contact.find({ owner: _id }, "-_v", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id email");
  }

  res.json({
    status: "success",
    code: 200,
    data: { contacts },
  });
};

module.exports = getAll;

const { Contact } = require("../../models");

const updateById = async (req, res) => {
  const { id } = req.params;

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }

  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }

  res.status(200).json({
    status: "success",
    code: 200,
    data: { result },
  });
};
module.exports = updateById;

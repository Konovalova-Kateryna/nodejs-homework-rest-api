const { Contact } = require("../../models");

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }
  const result = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
};
module.exports = updateStatus;

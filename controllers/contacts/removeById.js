const { Contact } = require("../../models");

const removeById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.remove({ _id: id });
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json({
    status: "success",
    code: 200,
    message: `Contact with id: ${id} was removed`,
  });
};

module.exports = removeById;

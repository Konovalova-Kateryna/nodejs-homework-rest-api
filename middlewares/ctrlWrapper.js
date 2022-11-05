function ctrlWrapper(ctrl) {
  return async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
}

module.exports = ctrlWrapper;

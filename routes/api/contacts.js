const express = require("express");
const { ctrlWrapper, validation } = require("../../middlewares");

const { contacts: ctrl } = require("../../controllers");
const { joiSchema } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));
router.get("/:id", ctrlWrapper(ctrl.getById));
router.post("/", validation(joiSchema), ctrlWrapper(ctrl.add));
router.delete("/:id", ctrlWrapper(ctrl.removeById));
router.put("/:id", ctrlWrapper(ctrl.updateById));
router.patch("/:id/favorite", ctrlWrapper(ctrl.updateStatus));

module.exports = router;

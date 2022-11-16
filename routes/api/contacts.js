const express = require("express");
const { auth, ctrlWrapper, validation } = require("../../middlewares");

const { contacts: ctrl } = require("../../controllers");
const { joiSchema } = require("../../models/contact");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getAll));
router.get("/:id", ctrlWrapper(ctrl.getById));
router.post("/", auth, validation(joiSchema), ctrlWrapper(ctrl.add));
router.delete("/:id", auth, ctrlWrapper(ctrl.removeById));
router.put("/:id", ctrlWrapper(ctrl.updateById));
router.patch("/:id/favorite", ctrlWrapper(ctrl.updateStatus));

module.exports = router;

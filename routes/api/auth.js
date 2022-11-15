const express = require("express");
const { auth, validation, ctrlWrapper } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const { joiLoginSchema, joiRegistrSchema } = require("../../models/user");

const router = express.Router();

router.post(
  "/singup",
  validation(joiRegistrSchema),
  ctrlWrapper(ctrl.register)
);

router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));
module.exports = router;

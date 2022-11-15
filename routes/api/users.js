const express = require("express");
const { auth, ctrlWrapper, validation } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const { joiSubscriptionSchema } = require("../../models/user");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.patch(
  "/",
  auth,
  validation(joiSubscriptionSchema),
  ctrlWrapper(ctrl.getSubscription)
);

module.exports = router;

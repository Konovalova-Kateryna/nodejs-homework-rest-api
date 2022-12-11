const express = require("express");
const { auth, ctrlWrapper, upload, validation } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const {
  joiSubscriptionSchema,
  joiVerificationSchema,
} = require("../../models/user");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.patch(
  "/",
  auth,
  validation(joiSubscriptionSchema),
  ctrlWrapper(ctrl.getSubscription)
);
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));
router.post(
  "/verify",
  validation(joiVerificationSchema),
  ctrlWrapper(ctrl.repeatEmail)
);

module.exports = router;

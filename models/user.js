const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      index: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
      required: true,
    },
    token: {
      type: String,
      default: null,
    },
    avatarUrl: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionkey: false, timestamps: true }
);

const joiRegistrSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
  token: Joi.string(),
});

const joiLoginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
});

const joiSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const joiVerificationSchema = Joi.object({
  email: Joi.string().email().required(),
});

const User = model("user", userSchema);
module.exports = {
  User,
  joiRegistrSchema,
  joiLoginSchema,
  joiSubscriptionSchema,
  joiVerificationSchema,
};

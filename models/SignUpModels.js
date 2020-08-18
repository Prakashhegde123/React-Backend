const mongoose = require("mongoose");
const schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");
const SignUpSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: false,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
      unique: false,
    },
  },
  { versionKey: false },
  {
    id: false,
    toObject: {
      virtuals: true,
      getters: true,
    },
    toJSON: {
      virtuals: true,
      getters: true,
      setters: false,
    },
  },
  { timestamps: true }
);

SignUpSchema.plugin(uniqueValidator, {
  type: "mongoose-unique-validator",
  message: "Error, expected {PATH} to be unique.",
});
const employee = mongoose.model("Employee", SignUpSchema);
module.exports = employee;

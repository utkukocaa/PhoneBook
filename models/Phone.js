const mongoose = require("mongoose");

const PhoneSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide  name"],
      maxLength: 50,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: [true, "Please provide phone number"],
      maxLength: 11,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Phone", PhoneSchema);

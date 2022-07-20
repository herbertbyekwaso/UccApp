const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const savingSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: Number,
    required: true,
  },
  receiver: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  saver: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = Saving = mongoose.model("Saving", savingSchema);
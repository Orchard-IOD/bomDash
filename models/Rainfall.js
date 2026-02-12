const mongoose = require("mongoose");

const rainfallSchema = new mongoose.Schema({
  stationId: String,
  stationName: String,
  rainfall: String,
  observationTime: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Rainfall", rainfallSchema);

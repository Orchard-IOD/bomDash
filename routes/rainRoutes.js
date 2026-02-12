const express = require("express");
const Rainfall = require("../models/Rainfall");

const router = express.Router();

// GET latest rain reading
router.get("/latest", async (req, res) => {
    const latest = await Rainfall.findOne().sort({observationTime: -1});
    res.json(latest);
});

// GET rainfall history (last 24 hours)
router.get("/history", async (req, res) => {
    const last24 = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const history = await Rainfall.find({
        observationTime: { $gte: last24}
    }).sort({observationTime: 1});
    res.json(history);
});

// Rain alert endpoint
router.get("/alert", async (req, res) => {
  const latest = await Rainfall.findOne().sort({ observationTime: -1 });
  
  if (latest && latest.rainfall > 5) {
    return res.json({ alert: true, message: "Heavy rain detected!" });
  }

  res.json({ alert: false });
});

module.exports = router;
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cron = require("node-cron");

const connectDB = require("./config/db");
const rainRoutes = require("./routes/rainRoutes");
const { fetchAndStoreRainData } = require("./services/bomService");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/rain", rainRoutes);

// Fetch rain data every 10 minutes
cron.schedule("*/10 * * * *", async () => {
  console.log("Fetching rain data...");
  await fetchAndStoreRainData();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

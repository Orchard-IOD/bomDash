const axios = require("axios");
const Rainfall = require("../models/Rainfall");

exports.fetchAndStoreRainData = async () => {
  try {
    const response = await axios.get(process.env.BOM_RAIN_URL);
    const data = response.data.observations.data[0]; // latest reading
    const station = response.data.observations.header[0];

    const rainRecord = new Rainfall({
      stationId: station.station_id,
      stationName: station.name,
      rainfall: data.rain_trace || 0,
      observationTime: new Date(Date.local_date_time_full),
    });

    await rainRecord.save();
    console.log("Rain data saved");
  } catch (error) {
    console.error("Error fetching BOM data:", error.message);
  }
};

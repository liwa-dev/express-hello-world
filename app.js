const express = require("express");
const ytdl = require("@distube/ytdl-core");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3001;

// Endpoint to fetch video details
app.get("/video/:id", async (req, res) => {
  const videoUrl = `https://www.youtube.com/watch?v=${req.params.id}`;
  
  try {
    const info = await ytdl.getInfo(videoUrl);
    res.json(info.videoDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch video details" });
  }
});

// Endpoint to download video
app.get("/download/:id", (req, res) => {
  const videoUrl = `https://www.youtube.com/watch?v=${req.params.id}`;
  
  try {
    const stream = ytdl(videoUrl, { filter: "audioonly" });
    res.header("Content-Disposition", `attachment; filename="video.mp4"`);
    stream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to download video" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

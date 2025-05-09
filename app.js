const express = require("express");
const ytdl = require("ytdl-core");
const app = express();
const port = process.env.PORT || 3001;

app.get("/video/:id", async (req, res) => {
  const videoUrl = `https://www.youtube.com/watch?v=${req.params.id}`;

  try {
    const info = await ytdl.getInfo(videoUrl);
    const audioUrl = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' }).url;
    const title = info.videoDetails.title;
    const duration = info.videoDetails.lengthSeconds;
    const thumbnail = info.videoDetails.thumbnails[0].url;

    res.json({
      title,
      duration,
      thumbnail,
      audioUrl,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch video details" });
  }
});

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

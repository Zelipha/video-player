const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { async } = require("rxjs");
const Video = require("../models/video");

const uri =
  "mongodb+srv://zeliq:her123@cluster0.qwuqrq3.mongodb.net/videoplayer?retryWrites=true&w=majority";
mongoose.set("strictQuery", true);
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to database"))
  .catch((error) => console.log(error));

router.get("/videos", async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (error) {
    console.log(error);
  }
});

router.get("/videos/:id", async (req, res) => {
  const videoId = req.params.id;

  try {
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).send("Video not found");
    }
    res.json(video);
  } catch (error) {
    console.log(error);
  }
});

router.post("/video", async (req, res) => {
  const { title, description, url } = req.body;

  try {
    const video = new Video({
      title,
      description,
      url,
    });

    const savedVideo = await video.save();
    res.json(savedVideo);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

router.put("/video/:id", async (req, res) => {
  const videoId = req.params.id;
  const { title, description, url } = req.body;

  try {
    const updatedVideo = await Video.findByIdAndUpdate(
      videoId,
      { $set: { title, description, url } },
      { new: true }
    );

    if (!updatedVideo) {
      return res.status(404).send("Video not found");
    }

    res.json(updatedVideo);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

router.delete("/video/:id", async (req, res) => {
  const videoId = req.params.id;
  try {
    const video = await Video.findByIdAndRemove(videoId);
    if (!video) {
      return res.status(404).send("Video not found");
    }
    res.send("Video deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;

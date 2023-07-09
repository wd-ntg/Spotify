const express = require("express");
const passport = require("passport");
const SongModel = require("../models/Songs.js");
const User = require("../models/User.js");
const UserModel = require("../models/User.js");

const router = express.Router();

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { name, thumbnail, track, genreArraySong } = req.body;
      console.log(req.body);
      if (!name || !thumbnail || !track) {
        return res
          .status(301)
          .json({ err: "Insufficient details to create song" });
      }
      const artist = req.user._id;
      const songDetails = {
        name,
        thumbnail,
        genre: genreArraySong,
        track,
        artist,
      };
      const createSong = await SongModel.create(songDetails);
      return res.status(200).json(createSong);
    } catch (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);
router.get(
  "/get/mysongs",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentUser = req.user;
    const songs = await SongModel.find({ artist: req.user._id }).populate(
      "artist"
    );
    return res.status(200).json({ data: songs });
  }
);

const authenticateUser = passport.authenticate("jwt", { session: false });

router.get("/get/artist/:artistId", authenticateUser, async (req, res) => {
  try {
    const { artistId } = req.params;
    const artist = await User.findOne({ _id: artistId });
    if (!artist) {
      return res.status(301).json({ err: "Artist does not exist" });
    }
    const songs = await SongModel.find({ artist: artistId });
    return res.status(200).json({ data: songs });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get(
  "/get/songname/:songName",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { songName } = req.params;

      const songs = await SongModel.find({ name: songName }).populate("artist");
      return res.status(200).json({ data: songs });
    } catch (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.post(
  `/update/likedSong`,
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const userId = req.user._id;

      const songId = req.body.songId;

      const user = await User.findOne({ _id: userId });
      if (user.likedSongs.includes(songId)) {
        return res
          .status(400)
          .json({ error: "Song already exists in liked songs list" });
      }

      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { likedSongs: songId } },
        { new: true }
      );

      return res.status(200).json(updatedUser);
    } catch (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.get(
  "/get/likedSongs",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const userId = req.user._id;

      const UserData = await User.findOne({ _id: userId });

      return res.status(200).json({ data: UserData });
    } catch (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.get(
  "/get/likedSongs/fromUser",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const userId = req.user._id;

      const UserData = await User.findOne({ _id: userId }).populate("likedSongs");

      return res.status(200).json({ data: UserData });
    } catch (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;

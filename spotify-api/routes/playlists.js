const express = require("express");
const passport = require("passport");
const PlaylistModel = require("../models/Playlists");
const User = require("../models/User");
const Song = require("../models/Songs");
const SongModel = require("../models/Songs");
const router = express.Router();

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const currentUser = req.user;
      const { name, thumbnail, songs } = req.body;
      if (!name || !thumbnail || !songs) {
        return res.status(301).json({ err: "Insufficient data" });
      }
      const playlistData = {
        name,
        thumbnail,
        songs,
        description: "",
        owner: currentUser._id,
        collaborators: [],
      };
      const playlist = await PlaylistModel.create(playlistData);
      return res.status(200).json(playlist);
    } catch (err) {
      return res.status(500).json({ err: "Internal server error" });
    }
  }
);

router.get(
  "/get/playlist/:playlistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const playlistId = req.params.playlistId;
      const playlist = await PlaylistModel.findOne({
        _id: playlistId,
      }).populate({
        path: "songs",
        populate: {
          path: "artist",
        },
      });
      if (!playlist) {
        return res.status(301).json({ err: "Invalid ID" });
      }
      return res.status(200).json(playlist);
    } catch (err) {
      return res.status(500).json({ err: "Internal server error" });
    }
  }
);

router.get(
  "/get/me",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const artistId = req.user._id;
      const playlists = await PlaylistModel.find({ owner: artistId }).populate(
        "owner"
      );
      return res.status(200).json({ data: playlists });
    } catch (err) {
      return res.status(500).json({ err: "Internal server error" });
    }
  }
);

// router.get(
//   "/get/allplaylists",
//   passport.authenticate("jwt", {
//     session: false,
//     failureRedirect: "/get/allplaylists",
//   }),
//   async (req, res) => {
//     try {
//       const playlists = await PlaylistModel.find({ owner: {$exists: false } });
//       return res.status(200).json({ data: playlists });
//     } catch (err) {
//       return res.status(500).json({ err: "Internal server error" });
//     }
//   }
// );
router.get(
  "/get/artist/:artistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const artistId = req.params.artistId;
      const artist = await User.findOne({ _id: artistId });
      if (!artist) {
        return res.status(301).json({ err: "Invalid Artist ID" });
      }
      const playlists = await PlaylistModel.find({ owner: artistId });
      return res.status(200).json({ data: playlists });
    } catch (err) {
      return res.status(500).json({ err: "Internal server error" });
    }
  }
);

router.post(
  "/add/song",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const currentUser = req.user;
      const { playlistId, songId } = req.body;
      const playlist = await PlaylistModel.findOne({ _id: playlistId });
      if (!playlist) {
        return res.status(304).json({ err: "Playlist does not exist" });
      }
      // if (
      //   playlist.owner != currentUser._id &&
      //   playlist.collaborators.includes(currentUser)
      // ) {
      //   return res.status(400).json({err: "Not allowed"})
      // }
      if (
        !playlist.owner.equals(currentUser._id) &&
        playlist.collaborators.includes(currentUser)
      ) {
        return res.status(400).json({ err: "Not allowed" });
      }
      const song = await Song.findOne({ _id: songId });
      if (!song) {
        return res.status(304).json({ err: "Song does not exist" });
      }
      playlist.songs.push(songId);
      await playlist.save();
      return res.status(200).json(playlist);
    } catch (err) {
      return res.status(500).json({ err: "Internal server error" });
    }
  }
);

router.get("/get/genrePlaylist", async (req, res) => {
  try {
    const playlistIds = ["64a6709dd17404151bb8d7d0", "64a6d7e9d8ccb362a52e2a94", "64a6de18a97c2ef44330c096"];
    const playlists = await PlaylistModel.find({ _id: { $in: playlistIds } }).populate(
      "collaborators"
    );

    for (const playlist of playlists) {
      const collaboratorIds = playlist.collaborators.map(
        (collaborator) => collaborator._id
      );

      const songsToAdd = [];

      for (const collaboratorId of collaboratorIds) {
        const collaboratorSongs = await SongModel.find({
          artist: collaboratorId,
        });
        songsToAdd.push(...collaboratorSongs);
      }

      const filteredSongs = songsToAdd.filter((song) => {
        return playlist.genre.includes("Pop") && song.genre.includes("Pop");
      });

      const songIds = filteredSongs.map((song) => song._id.toString());
      const existingSongIds = playlist.songs.map((song) => song.toString());

      const differentSongIds = songIds.filter((element) => !existingSongIds.includes(element));

      playlist.songs.push(...differentSongIds);
      await playlist.save();
    }

    return res.status(200).json({ data: playlists });
  } catch (err) {
    return res.status(500).json({ err: "Internal server error" });
  }
});


module.exports = router;

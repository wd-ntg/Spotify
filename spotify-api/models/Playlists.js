const mongoose = require("mongoose");

const Playlist = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  thumbnail: {
    type: String,
    require: true,
  },
  genre: [
    {
      type: String,
      default: "",
    },
  ],
  description: {  
    type: String,
    default: ""
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  songs: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Song",
    },
  ],
  collaborators: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ]
});

const PlaylistModel = mongoose.model("Playlist", Playlist);

module.exports = PlaylistModel;

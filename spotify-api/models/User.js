const mongoose = require("mongoose");

const User = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    private: true,
  },
  userName: {
    type: String,
    required: true,
  },
  likedSongs: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Song",
    },
  ],
  likedPlaylists: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Playlist",
    },
  ],
  subscribedArtists: {
    type: String,
    default: "",
  },
  avatar: {
    type: String
},
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const UserModel = mongoose.model("User", User);

module.exports = UserModel;

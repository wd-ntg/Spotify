const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  genre: [
    {
      type: String,
    default: "",
    }
  ],
  track: {
    type: String,
    required: true
  },
  artist: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
  createdAt: {
    type: String, // Đổi kiểu dữ liệu thành String để lưu trữ giá trị ngày tháng dưới dạng chuỗi
    default: function () {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Định dạng tháng thành chuỗi 2 chữ số
      const day = currentDate.getDate().toString().padStart(2, "0"); // Định dạng ngày thành chuỗi 2 chữ số
      return `${year}-${month}-${day}`;
    }
  }
});

const SongModel = mongoose.model("Song", SongSchema);

module.exports = SongModel;

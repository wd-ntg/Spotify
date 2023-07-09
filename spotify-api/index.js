const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv/config");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("./models/User.js");
const initAuth = require("./routes/auth.js");
const initSong = require("./routes/song.js");
const initPlaylists = require("./routes/playlists.js");

const express = require("express");
const app = express();
const PORT = process.env.port || 5000;

app.use(cors());

app.use(express.json());

const URI =
  "mongodb+srv://admin:" +
  process.env.MONGO_PASSWORD +
  "@cluster0.ecymxxd.mongodb.net/?retryWrites=true&w=majority";

// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log("Server is running");
    });
  })
  .catch((err) => {
    console.error(err);
  });

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "123";

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findOne({ _id: jwt_payload.sub });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

app.use("/auth", initAuth);
app.use("/song", initSong);
app.use("/playlists", initPlaylists);

app.get("/", (req, res) => {
  res.send("Server i running");
});

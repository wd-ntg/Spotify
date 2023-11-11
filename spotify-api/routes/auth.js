const express = require("express");
const UserModel = require("../models/User.js");
const { getToken } = require("../utils/helpers.js");
const bcrypt = require("bcrypt");
const passport = require("passport");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password, firstName, lastName, userName } = req.body;

    // Kiểm tra người dùng đã tồn tại trong cơ sở dữ liệu hay chưa
    const user = await UserModel.findOne({ email: email });

    if (user) {
      return res
        .status(403)
        .json({ error: "A user with this email already exists" });
    }

    // Băm mật khẩu sử dụng bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Tạo người dùng mới
    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      userName,
    });

    // Tạo token cho người dùng
    const token = await getToken(email, newUser);

    // Trả về thông tin người dùng và token
    const userToReturn = { ...newUser.toObject(), token };
    delete userToReturn.password;

    return res.status(200).json(userToReturn);
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error("Error in user registration:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email: email });
  if (!user) {
    return res.status(403).json({ err: "Invalid credentials" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(403).json({ err: "Invalid credentials" });
  }
  const token = await getToken(user.email, user);
  const userToReturn = { ...user.toJSON(), token };
  delete userToReturn.password;
  return res.status(200).json(userToReturn);
});

router.get("/getinfo", async (req, res) => {
  try {
    const user = await UserModel.find();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(403).json({ error: err });
  }
});

router.post("/user/google-login", async (req, res) => {
  try {
    // Lưu thông tin người dùng vào cơ sở dữ liệu
    const user = new UserModel({
      name: req.body.name,
      email: req.body.email,
      userName: req.body.userName,
      // ...Thêm các trường khác
    });
    await user.save();

    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Lỗi server" });
  }
});

// router.post(
//   "/logout",
//   passport.authenticate("jwt", { session: false }),
//   async (req, res) => {
//     try {
      // const token = req.headers.authorization.split(' ')[1];

      // return res.status(200).json({data: token});
//       return res.redirect("/login");
//     } catch (err) {
//       return res.status(500).json({ err: "Internal server error" });
//     }
//   }
// );

// Get Info User

router.get(
  "/info",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const currentUser = req.user;
      return res.status(200).json(currentUser);
    } catch (error) {
      return res.status(500).json({ err: "Internal server error" });
    }
  }
);

module.exports = router;

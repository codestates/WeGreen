require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = process.env.SALT || 10;

module.exports = {
  hashedpassword: (password) => {
    // salt 자동생성
    return bcrypt.hashSync(password, saltRounds); //해쉬된 password를 리턴
  },
  comparepassword: (inputPWD, encryptedPWD) => {
    return bcrypt.compareSync(inputPWD, encryptedPWD); //true 또는 false를 리턴
  },
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: "1d" });
  },
  sendAccessToken: (res, data, accessToken) => {
    res.cookie("accessToken", accessToken, {
      // domain: process.env.SERVER_DOMAIN,
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
      // sameSite: 'none',
      // secure: true,
      httpOnly: true,
    });
    res.json({ data, message: "ok" });
  },
  isAuthorized: (req) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return null;
    }
    try {
      return verify(accessToken, process.env.ACCESS_SECRET);
    } catch (err) {
      //return null if invalid token
      return null;
    }
  },
};

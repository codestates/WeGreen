require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  hashedpassword: (password) => {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
  },
  comparepassword: (inputPWD, hash) => {
    return bcrypt.compareSync(inputPWD, hash); //true 또는 false를 리턴
  },
  generateAccessToken: (data) => {
    return sign({ data: data }, process.env.ACCESS_SECRET, {
      expiresIn: 60 * 60,
    });
  },
  sendAccessToken: (res, data, accessToken) => {
    console.log("ACCESS TOKEN", accessToken);
    res.cookie("accessToken", accessToken, {
      // domain: process.env.SERVER_DOMAIN,
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
      // sameSite: 'none',
      // secure: true,
      httpOnly: true,
    });
    res.json({ data, message: "OK" });
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
  getUserInfo: (req) => {
    const authorization = req.headers["authorization"];
    const token = authorization.split(" ")[1];
    const data = JSON.parse(verify(token, process.env.ACCESS_SECRET).data); //객체 형식
    return data;
  },
};

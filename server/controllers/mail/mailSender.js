const nodemailer = require('nodemailer');
require('dotenv').config();
const { user: UserModel, challenge: ChallengeModel } = require('../../models');

const mailSender = {
  sendGmail: async (to, username, challenge) => {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });
    const subject = `[WeGreen] 지구를 지킨 ${username}님의 챌린지 목록`;
    const html = challenge;

    let info = await transporter.sendMail(
      {
        from: process.env.NODEMAILER_USER,
        to,
        subject,
        html,
      },
      (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      }
    );
  },
};

module.exports = mailSender;

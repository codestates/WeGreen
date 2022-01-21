const nodemailer = require('nodemailer');
require('dotenv').config();
const {
  challenge: ChallengeModel,
  users_challenge: UserChallengeModel,
  sequelize,
} = require('../../models');

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
    let popularSubject = `<h2 style="color:rgb(3,129,117)"> 🏆 WeGreen 인기 챌린지 🏆 </h2>`;

    const joinCountArray = await UserChallengeModel.findAll({
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('user_id')), 'join_count'],
        'challenge_id',
      ],
      group: ['challenge_id'],
      order: [[sequelize.col('join_count'), 'DESC']],
      raw: true,
      limit: 3,
    });
    let popular = [];
    let rank = 0;
    for (let idx of joinCountArray) {
      rank++;
      const eachChallenge = await ChallengeModel.findOne({
        attributes: ['name', 'content', 'started_at', 'requirement'],
        where: { id: idx.challenge_id },
        raw: true,
      });
      popular.push(`<div style="border:1px solid; width:20rem; border-color:rgb(3,129,117); padding:1rem;">
      <h3 style="color:rgb(3,129,117)"> 🏅 ${rank}위 챌린지: ${eachChallenge.name}</h3> 
      <div>챌린지 내용: ${eachChallenge.content}</div> 
      <div>챌린지 시작일: ${eachChallenge.started_at}</div> 
      <div>참여자수: ${idx.join_count} / 인증횟수: ${eachChallenge.requirement}</div>
      </div>`);
    }
    html = popularSubject + popular[0] + popular[1] + popular[2] + challenge;

    await transporter.sendMail(
      {
        from: process.env.NODEMAILER_USER,
        to,
        subject,
        html,
      },
      (error, info) => {
        if (error) {
        } else {
        }
      }
    );
  },
};

module.exports = mailSender;

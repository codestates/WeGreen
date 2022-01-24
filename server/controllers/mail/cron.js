const cron = require('node-cron');
const mailSender = require('./mailSender');
const {
  user: UserModel,
  challenge: ChallengeModel,
  users_challenge: UserChallengeModel,
  sequelize,
} = require('../../models');
const { Op } = require('sequelize');

const scheduler = () => {
  cron.schedule('0 8 1 * *', async function () {
    //매월 1일 오전 8시 메일 발송('0 8 1 * *')
    const oneMonthAgo = new Date(
      new Date().getFullYear(),
      new Date().getMonth() - 1,
      new Date().getDate()
    );
    const allUsers = await UserModel.findAll({
      attributes: ['id', 'email', 'username'],
      raw: true,
    });
    const userAndChallenge = [];
    for (let user of allUsers) {
      const challenges = await UserChallengeModel.findAll({
        attributes: ['challenge_id'],
        where: { user_id: user.id },
        group: ['challenge_id'],
        raw: true,
      });
      let challengeIdArray = [];
      for (let idx of challenges) {
        challengeIdArray.push(idx.challenge_id);
      }
      userAndChallenge.push(
        Object.assign(user, { challenge_id: challengeIdArray })
      );
    }
    for (let person of userAndChallenge) {
      let email = person.email;
      let username = person.username;
      let html = `<h2 style="color:rgb(3,129,117)"> 🎖 ${username}님이 지난달에 참여한 챌린지 🎖 </h2>`;
      let challengeArray = person.challenge_id;
      for (let idx of challengeArray) {
        const eachContent = await ChallengeModel.findAll({
          attributes: ['name', 'content', 'started_at', 'requirement'],
          where: { id: idx, started_at: { [Op.gt]: oneMonthAgo } },
          order: ['started_at'],
          raw: true,
        });
        for (let each of eachContent) {
          html += `<div style="border:1px solid; width:20rem; border-color:rgb(3,129,117); padding:1rem;"> 
        <h3 style="color:rgb(3,129,117)"> 🌳 챌린지: ${each.name}</h3> 
        <div>챌린지 내용: ${each.content}</div> 
        <div>챌린지 시작일: ${each.started_at}</div> 
        <div>인증횟수: ${each.requirement}</div> </div>`;
        }
      }
      mailSender.sendGmail(email, username, html);
    }
  });
};
module.exports = scheduler;

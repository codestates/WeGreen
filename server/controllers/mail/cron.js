const cron = require('node-cron');
const mailSender = require('./mailSender');
const {
  user: UserModel,
  challenge: ChallengeModel,
  users_challenge: UserChallengeModel,
  sequelize,
} = require('../../models');

const scheduler = () => {
  cron.schedule('0 0 * * * *', async function () {
    //매시 0분마다 메일 발송

    const allUsers = await UserModel.findAll({
      attributes: ['email', 'id', 'username'],
      raw: true,
    });

    const joinCountArray = await UserChallengeModel.findAll({
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('user_id')), 'join_count'],
        'challenge_id',
      ],
      group: ['challenge_id'],
      order: [[sequelize.col('join_count'), 'DESC']],
      raw: true,
    });

    const slicedJoinCount = joinCountArray.slice(0, 3);
    const popularResult = [];
    for (let i = 0; i < slicedJoinCount.length; i++) {
      await ChallengeModel.findOne({
        attributes: [
          'name',
          'content',
          'started_at',
          'requirement',
          'created_at',
        ],
        where: { id: slicedJoinCount[i].challenge_id },
        raw: true,
      }).then((result) =>
        popularResult.push(
          Object.assign(result, {
            join_count: slicedJoinCount[i]['join_count'],
          })
        )
      );
    }
    let popular = `<h2 style="color:rgb(3,129,117)"> 🏆 WeGreen 인기 챌린지 🏆 </h2>`;
    let rank = 0;
    for (let chall of popularResult) {
      rank++;
      popular += `<div style="border:1px solid; width:20rem; border-color:rgb(3,129,117); padding:1rem;">
      <h3 style="color:rgb(3,129,117)"> 🏅 ${rank}위 챌린지: ${chall.name}</h3> 
      <div>챌린지 내용: ${chall.content}</div> 
      <div>챌린지 시작일: ${chall.started_at}</div> 
      <div>참여자수: ${chall.join_count} / 인증횟수: ${chall.requirement}</div>
      </div>`;
    }

    for (let user of allUsers) {
      let html = `<h2 style="color:rgb(3,129,117)"> 🎖 내가 참여한 챌린지 🎖 </h2>`;
      const allChallenges = await UserChallengeModel.findAll({
        attributes: ['challenge_id'],
        where: { user_id: user.id },
        order: [['created_at', 'DESC']],
        raw: true,
      });

      for (let id of allChallenges) {
        const { name, content, started_at, requirement } =
          await ChallengeModel.findOne({
            attributes: ['name', 'content', 'started_at', 'requirement'],
            where: { id: id.challenge_id },
            raw: true,
          });
        html += `<div style="border:1px solid; width:20rem; border-color:rgb(3,129,117); padding:1rem;"> <h3 style="color:rgb(3,129,117)"> 🌳 챌린지: ${name}</h3> 
        <div>챌린지 내용: ${content}</div> 
        <div>챌린지 시작일: ${started_at}</div> 
        <div>인증횟수: ${requirement}</div> </div>`;
      }
      html =
        html +
        `<div style= height:1rem></div><hr><div style= height:1rem>` +
        popular;
      mailSender.sendGmail(user.email, user.username, html);
    }
  });
};

module.exports = scheduler;

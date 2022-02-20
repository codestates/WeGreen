const nodemailer = require('nodemailer');
require('dotenv').config();
const {code: CodeModel} = require('../../models');

function getRandomCode(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
}

module.exports = {
    send: async (req, res) => {
        try {
            const userEmail = req.body.email;
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                  user: process.env.NODEMAILER_USER,
                  pass: process.env.NODEMAILER_PASS,
                },
              })
            const subject = 'WeGreen 회원가입 인증메일';
            const confirmationCode = getRandomCode(100000,999999);
            const html = 
            `<center>
              <img src="https://wegreen.link/static/media/main_illust.51075c9ac685cbe51032.png" width="288" height="176" alt="wegreen">
              <h1><span style="color:#D6451D; font-size:2rem;">이메일 인증번호</span>가 발급되었습니다.</h1>
              <h3>인증번호 :  <span style="color:#D6451D; font-size:2rem;">${confirmationCode}</span><h3>
              <div >발급된 인증번호로 인증이 가능합니다.</div>
            </center>`;
            await transporter.sendMail({
                from: process.env.NODEMAILER_USER,
                to: userEmail,
                subject: subject,
                html :html
            },
            (error, info) => {
              if (error) {
                res.status(500).send({
                  message: 'Internal server error',
                });
              } else {
              }
            })
            const registeration = await CodeModel.create({
              email:userEmail,
              confirmation_code:confirmationCode
            })
            res.status(201).json({
              message: 'OK',
              data: {email:userEmail}
            });
        }
        catch (err){
          res.status(500).send({
            message: 'Internal server error',
          });
        }
    },
    check: async (req, res) => {
      try {
        const userEmail = req.body.email;
        const code = req.body.confirmation_code;
        const findCode = await CodeModel.findOne({
          attributes: ['id'],
          where: { email: userEmail, confirmation_code: code},
          raw:true
        });
        if(!findCode){
          res.status(401).json({
            message: 'Invalid code',
          });
        }
        else{
          res.status(201).json({
            message: 'OK',
            data:{
              confirmation_code:code
            }
          })
          const deleteOne = await CodeModel.destroy({
            where:{
              email: userEmail, confirmation_code: code
            }
          })
        }
      }
      catch (err){
        console.log(err)
        res.status(500).send({
          message: 'Internal server error',
        });
      }
    }
}
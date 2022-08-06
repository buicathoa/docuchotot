const authService = require('./../services/authService')
const User = require("./../models/User")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");
const { to } = require('await-to-js');

const authController = {
    registerUser:async (req, res) => {
        try{
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt)
            const checkUser = await User.findOne({email: req.body.email});
            if(!checkUser){
              const newUser = await new User({
                username: req.body.username,
                password: hashed,
                email: req.body.email,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
            })
            const user = await newUser.save()
            res.status(200).json(user)
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'haojoehart4@gmail.com',
                  pass: 'lcfntjzziqjqhtxy'
                }
              });
              
              var mailOptions = {
                from: 'haojoehart4@gmail.com',
                to: 'buicathoa@gmail.com',
                subject: `Verify account email from  BakeryBD`,
                amp: `<!doctype html>
                <html ⚡4email>
                  <body>
                    <p>Click this <a href="facebook.com">link</a>to verify your account!</p>
                  </body>
                </html>`
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log('error Mail', error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
            } else {
              return res.status(400).json('this mail was created by another one')
            }
        }
        catch(err){
            return res.status(500).json(err)
        }
    },
    loginUser: async(req,res) => {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt)
      const user = await User.findOne({username: req.body.username});
      
      if(user){
        if(!(bcrypt.compareSync(req.body.password, user.password))){
          return res.status(400).json('Invalid email or password')
        }else{
          if(user.activate){
            const accessToken = jwt.sign({
              id: user.id,
              admin: user.admin,
              username: user.username
            },
            process.env.MY_SECRET_ACCESS_KEY,{
              expiresIn: '24h'
            })
            return res.status(200).json({message: "Login success !", data: user, token: accessToken})
          }else{
            return res.status(400).json('This account have not active yet!')
          }
        }
      }
    },
    verifyUser: async(req,res) => {
      try{
        const updateActivate = await User.findByIdAndUpdate(req.body.id, {activate: true});
        console.log('updateActivate', updateActivate)
        await updateActivate.save()
        return res.status(200).json({status: 'Ok'})
        // return res.status(200).json(updateActivate)
      }catch(err){
        return res.status(500).json(err)
      }
    },
    forgotPassword: async(req, res) => {
      try{
        const user = await User.findOne({email: req.body.email});
        if(!user){
          return res.status(404).json('This email has not already exist !')
        }else {
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'haojoehart4@gmail.com',
            pass: 'lcfntjzziqjqhtxy'
          }
        });
        
        var mailOptions = {
          from: 'haojoehart4@gmail.com',
          to: user.email,
          subject: `Verify account email from BakeryBD`,
          amp: `<!doctype html>
          <html ⚡4email>
            <body>
              <p>Click this <a href="facebook.com">link</a>to verify your account!</p>
            </body>
          </html>`
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log('error Mail', error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        }
      }catch(err){
        return res.status(500).json(err)
      }
    },
    recoveryPassword: async(req, res) => {
      try{
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt)
        const user = await User.findByIdAndUpdate(req.body.id, {password: hashed});
        console.log('chay toi day k?', user)
        await user.save()
        return res.status(200).json('Update password success!')
      }catch(err){
        return res.status(500).json(err)
      }
    },
}

module.exports = authController
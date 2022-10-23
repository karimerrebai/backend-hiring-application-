const Admin = require("../model/admin");
const Candidate = require('../model/candidate');
const Company = require('../model/company')
const User = require("../model/user");
const Offre = require('../model/offre')
const Candadicy = require('../model/candidacy')
const bcrypt = require("bcrypt");
const { join } = require("path");
require('dotenv').config()
const { randomBytes } = require("crypto"); //module node js
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");
const { populate } = require("../model/speciality");

const SECRET = process.env.APP_SECRET;
const DOMAIN = process.env.DOMAIN




const tokenList = {}

var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "9ec22d03b8111d",
    pass: "7baa16f1c1b103"
  }
});



registerAdmin = async (req, res) => {
  try {

    req.body["picture"] = req.file.filename;
    const password = bcrypt.hashSync(req.body.password, 10);
    // we have got all the req.body except the password (new password)
    const newAdmin = new Admin({ ...req.body, password, verified: true, role: 'Admin' }); // ladmin maghir mayaaml verfication
    await newAdmin.save();
    res.status(200).json({
      message: "welcome ",
      data: newAdmin,
    });
  } catch (error) {
    res.status(404).json({
      msg: "failed to register" + error.message,
    });
  }
};

registerCandidate = async (req, res) => {
  try {
    req.body["picture"] = req.file.filename;
    const password = bcrypt.hashSync(req.body.password, 10);
    const newCandidate = new Candidate({
      ...req.body,
      password,
      role: 'Candidate',

      verificationCode: randomBytes(6).toString("hex"), //combinaison entre//randomBytes(6):en 6bits
    });
    await newCandidate.save();
    res.status(200).json({
      message: "Candidate created",
      data: newCandidate,
    });
    transport.sendMail(
      {
        to: newCandidate.email, //receivers
        subject: "welcome :" + newCandidate.fullname,
        text: "Hello and welcome to nodemailer",
        html: `
            <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head>
                <body>
                    <h2>hello ${newCandidate.fullname} </h2>
                    <p> xxxxxxxxxxxxxxxxxx ${newCandidate.email}  </p>
                    <a href="${DOMAIN}verifynow/${newCandidate.verificationCode}" >verify now </a>
                </body>
                </html>`,
      },
      (err, sent) => {
        if (err) {
          console.log(err.message + " not sent ");
        } else {
          console.log("email sent");
        }
      }
    );
  } catch (error) {
    res.status(404).json({
      msg: "failed to register company",
      error: error.message,
    });
  }
};



getcandidateByid = async (req, res) => {

  const candidate = await Candidate.findById({ _id: req.params.id }).populate('comments').populate('candidancies').populate({ path: "candidancies", populate: { path: "offre" } })
  res.status(200).json({ data: candidate, msg: 'Candidate By id' })
}

registerCompany = async (req, res) => {
  try {
    req.body["picture"] = req.file.filename;
    const password = bcrypt.hashSync(req.body.password, 10);
    const newCompany = new Company({
      ...req.body,
      password,
      role: 'Company',

      verificationCode: randomBytes(6).toString("hex"), //combinaison entre//randomBytes(6):en 6bits
    });

    await newCompany.save();
    res.status(200).json({
      message: "Company created",
      data: newCompany,
    });
    transport.sendMail(
      {
        to: newCompany.email, //receivers
        subject: "welcome :" + newCompany.fullname,
        text: "Hello and welcome to nodemailer",
        html: `
            <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head>
                <body>
                    <h2>hello ${newCompany.fullname} </h2>
                    <p> xxxxxxxxxxxxxxxxxx ${newCompany.email}  </p>
                    <a href="${DOMAIN}verifynow/${newCompany.verificationCode}" >verify now </a>
                </body>
                </html>`,
      },
      (err, sent) => {
        if (err) {
          console.log(err.message + " not sent ");
        } else {
          console.log("email sent");
        }
      }
    );
  } catch (error) {
    res.status(404).json({
      msg: "failed to register company",
      error: error.message,
    });
  }
};



getCompanyById = async (req, res) => {
  const company = await Company.findById({ _id: req.params.id }).populate('offres')
  res.status(200).json({ data: company, msg: 'company By id' })
}


verfiyEmail = async (req, res) => {
  try {
    const user = await User.findOne({
      verificationCode: req.params.code,
    });
    //  console.log(user.verification);
    user.verified = true;
    user.verificationCode = undefined;
    user.save();

    res.sendFile(join(__dirname, "../template/succes.html")); //we replaced the res.statuse(200)
  } catch (error) {
    res.sendFile(join(__dirname, "../template/error.html"));
  }
};


login = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      res.status(404).json({
        message: "email not found",
      });

    }
    if (user.verified == true) {
      const comparePassword =
        bcrypt.compareSync(req.body.password, user.password)


      if (!comparePassword) {
        res.status(404).json({
          msg: 'password not valid' + error.message
        })
      }

      // crating a token after login 
      const token = jwt.sign({ id: user._id, user: user }, SECRET, {
        expiresIn: '24h'
      })
      const refreshtoken = jwt.sign({ id: user._id, user: user }, SECRET, { expiresIn: '200h' })
      tokenList[refreshtoken] = token
      const result = { email: user.email, user: user, token: token, refreshtoken: refreshtoken }

      res.status(200).json({
        message: "logged",
        ...result,
      });
    } else {
      res.status(404).json({
        message: "user not verifiyed",
      });
    }

  }

  catch (error) {
    res.status(404).json({
      msg: 'failed to login' + error.message
    })

  }

}
profile = async (req, res) => {
  try {
    const user = req.user;
    //  console.log(user);
    res.status(200).json({
      message: "profile",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      message: "profile failed",
      error: error.message,
    });
  }
};
updateProfile = async (req, res) => {
  try {
    await User.updateOne({ _id: req.user._id }, req.body);
    res.status(200).json({
      msg: "profile updated",
    });
  } catch (error) {
    res.status(404).json({
      msg: "profile updated failed",
      error: error.message,
    });
  }
};


logout = async (req, res) => {
  console.log("tokenList", tokenList)
  var refreshtoken = req.body.refreshtoken
  if (refreshtoken in tokenList) {
    delete tokenList[refreshtoken]
  }

  console.log("tokenList", tokenList)
  res.status(401).json({ status: 401, message: "Logout Account", data: tokenList })
},


  forgetPassword = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      //console.log(user)
      if (!user) {
        res.status(404).json({
          msg: "email not found",
        });
      } else {
        if (user.verified === true) {
          const token = jwt.sign({ user: user, id: user._id }, SECRET, {
            expiresIn: "24h",
          }); //creation de token
          user.verificationpassword = token;
          user.save();
          res.status(200).json({
            msg: "check out your email please!",
            data: user,
          });
          transport.sendMail(
            {
              to: user.email,     //receivers
              subject: "welcome " + user.fullname,
              text: "bonjour monsieur !",
              html: `
                <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Document</title>
                    </head>
                    <body>
                        <h2>hello ${user.fullname} </h2>
                        <p>${user.email}  </p>
                        <a href="http://localhost:4200/resetnewpassword/${token}">click to reset your password </a>
                   
                    </body>
                    </html>`,
            },
            (err, sent) => {
              if (err) {
                console.log(err.message + " not sent ");
              } else {
                console.log("forgetPassword:email sent");
              }
            }
          );
        } else {
          res.status(404).json({
            msg: "email not verified",
          });
        }
      }
    } catch (error) {
      res.status(404).json({
        msg: "new password failed",
        error: error.message,
      });
      //console.log("forgot password failed :"+error.message)
    }
  };
/*resetPassword = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user._id });
    user.password = bcrypt.hashSync(req.body.password, 10);
    user.verificationpassword = undefined;

    user.save();
    res.status(200).json({
      msg: "new password is done",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      msg: "new password failed",
      error: error.message,
    });
  }
};*/


resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = req.params.token;
    if (resetPasswordToken) {
      jwt.verify(resetPasswordToken, SECRET, async (err) => {
        if (err) {
          return res.json({ error: "incorrect token or it is expired" });
        }
        const user = await User.findOne({
          verificationpassword: resetPasswordToken,
        });
        user.password = bcrypt.hashSync(req.body.password, 10);
        user.verificationpassword = undefined;
        user.save();
        return res.status(200).json({
          message: "password has been changed",
        });
      });
    }
    //console.log(user);
  } catch (error) {
    res.status(404).json({ message: "error is" + error.message });
  }
},





















  verifycompany = async (req, res) => {

    try {
      const company = await Company.findById({ _id: req.params.id })
      company.confirmed = true
      await company.save()
      res.status(200).json({
        msg: 'company confirmed', data: company
      })

    } catch (error) {
      res.status(404).json({ msg: 'cannot confirm' + error.message })

    }



  }
confirmCandidacy = async (req, res) => {
  const candidacy = await Candadicy.findById({ _id: req.params.id })
  candidacy.isconfirmed = true
  await candidacy.save()
  res.status(200).json({ msg: 'candidacy confirmed' })


}
rejectCandidacy = async (req, res) => {
  const candidacy = await Candadicy.findById({ _id: req.params.id })
  candidacy.isconfirmed = false
  await candidacy.save()
  res.status(200).json({ msg: 'candidacy rejected' })
}



verifyOffre = async (req, res) => {

  try {
    const offre = await Offre.findById({ _id: req.params.id })
    offre.isConfirmed = true
    await offre.save()
    res.status(200).json({
      msg: 'offre confirmed', data: offre
    })

  } catch (error) {
    res.status(404).json({ msg: 'cannot confirm' + error.message })

  }

}







getAllCompanies = async (req, res) => {
  res.status(200).json({
    data: await Company.find({}).populate('offres'),
    msg: 'list companies',
  })
}

deleteCompany = async (req, res) => {
  await Company.findOneAndDelete({ _id: req.params.id })
  res.status(200).json({
    msg: 'deleted'
  })

}





module.exports = {
  rejectCandidacy, confirmCandidacy, getcandidateByid, verifyOffre, getCompanyById, deleteCompany, verifycompany, resetPassword, forgetPassword, getAllCompanies, verfiyEmail, registerAdmin, login, logout, profile, updateProfile, registerCandidate, registerCompany
}
var express = require('express');
var router = express.Router();
var utils = require('./../util/utils');
var mysql=require('./mysql.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const multer = require('multer');
var app = express();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var salt = bcrypt.genSaltSync(10);
var kafka = require('./../kafka/client');
// var {mongoose} = require('./../db/mongoose');
// var {Traveler} = require('./../models/traveler');
var {Owner} = require('./../models/owner');


const storage=multer.diskStorage({
  destination :function(req,file, cb) {
    cb(null,'./public/uploads/');
  },
  filename: function(req,file,cb){
    console.log("Profile image file name: ",req.body);
    cb(null, req.body.email+".jpeg");
  }
});

const fileFilter =(req,file, cb) => {
  if(file.mimetype==='image/jpeg' || file.mimetype==='image/png' || file.mimetype==='image/jpg') {
    cb(null,true);
  }
  else {
    cb(null,false);
  }
}

const upload=multer({
    storage: storage,
    limits: {
      fileSize :1024*1024*5
    },
    fileFilter :fileFilter
  });


router.post('/uploadprofilepic' , upload.single('photos'), function(req , res , next) {
  console.log("Inside upload profile pic API");
  console.log(req.file);
  res.status(200).json({message : "profile photo uploaded successfully!"})
});

// passport.use('login',new LocalStrategy(
//     function(username, password, done) {
//       let userinfo = {};
//       userinfo.username = username;
//       userinfo.password = password;
//         console.log("LocalStrategy Username: ",username,"password: ",password);
//         let res_result = {message:'',
//             servertoken:'',
//             status:400
//         };
//         kafka.make_request('traveler_login',{"userinfo":userinfo}, function(err,result){
//             if(err){
//                 throw err;
//             }else{
//                 console.log("user login result:",result);
//                 if(result){
//                   if(result.code==200) {
//                     console.log("user login compareSync:",result);
//                       const server_token = jwt.sign({uid:result.result.email},utils.server_secret_key);
//                       res_result.loginUser = result.loginUser;
//                       res_result.servertoken = server_token;
//                       res_result.loginUser = result.loginUser;
//                       res_result.message = result.message;
//                       res_result.status = result.code;
//                       done(null,res_result);
//                   }
//                   else if(result.code==405){
//                     res_result.message = result.message;
//                     res_result.status = result.code;
//                     done(null,res_result);
//                 }
//                 else if(result.code==400){
//                   res_result.message = result.message;
//                   res_result.status = result.code;
//                   done(null,res_result);
//                 }
//               }
//             }
//         });
//     }));
//
// /* GET home page. */
// //==============================================================================================
// router.post('/travelerlogin', function(req, res, next) {
//   console.log("in login request");
//     passport.authenticate('login', function(err, result) {
//         if(!err && result.status == 200) {
//             return res.status(200).json(result);
//
//         }else if (result.status == 400){
//             return res.status(400).json(result);
//         }
//         else if (result.status == 405){
//             return res.status(405).json(result);
//         }
//
//     })(req, res);
//
// });

router.post('/travelerlogin', function(req, res, next) {
  console.log("inside login");
  let res_result = {};
  let userinfo = {};
  console.log("Request sent by user: ", req.body);
  userinfo.username = req.body.username;
  userinfo.password = req.body.password
  res_result.code = 400;
    kafka.make_request('traveler_login',{"userinfo":userinfo}, function(err,result){
        if(!err){
            console.log("user logged in ",result);
            if(result.code === 200){
              const server_token = jwt.sign({uid:userinfo.username},utils.server_secret_key);
              res_result.loginUser = result.loginUser;
              res_result.servertoken = server_token;
              res_result.code =200;
              res_result.message = "User logged in successfully ... ";
              res.status(200).json(res_result);
            }else{
              res_result.message = result.message;
              res.status(400).json(res_result);
            }

        }else{
          console.log("Error found is: ", err);
            res.status(405).json({message:"Server error failed to signup new user try again later"});
        }
    });
});
//==============================================================================================
router.post('/signup', function(req, res, next) {
  console.log("inside signup");
  let res_result = {};
  let userinfo = {};
  console.log("Request sent by user: ", req.body);
  userinfo.username = req.body.username;
  userinfo.password = req.body.password;
  userinfo.firstName = req.body.firstName;
  userinfo.lastName = req.body.lastName;
  res_result.code = 400;
    kafka.make_request('signup',{"userinfo":userinfo}, function(err,result){
        if(!err){
            console.log("user signed up ",result);
            if(result.code === 200){
              const server_token = jwt.sign({uid:userinfo.username},utils.server_secret_key);
              res_result.createdUser = result.createdUser;
              res_result.servertoken = server_token;
              res_result.code =200;
              res_result.message = "User signed up successfully ... ";
              res.status(200).json(res_result);
            }else{
              res_result.message = result.message;
              res.status(400).json(res_result);
            }

        }else{
          console.log("Error found is: ", err);
            res.status(405).json({message:"Server error failed to signup new user try again later"});
        }
    });
});
//=======================================================================
router.post('/updateProfile', function (req,res,next) {
	console.log("inside update profile");
  let res_result = {};
  let userinfo = {};
  console.log("Request sent by user: ", req.body);
  userinfo.email = req.body.email;
  userinfo.firstName = req.body.firstName;
  userinfo.lastName = req.body.lastName;
  userinfo.aboutMe = req.body.aboutMe;
  userinfo.city = req.body.city;
  userinfo.company = req.body.company;
  userinfo.school = req.body.school;
  userinfo.hometown = req.body.hometown;
  userinfo.language = req.body.language;
  userinfo.gender = req.body.gender;
  userinfo.contactNumber = req.body.contactNumber;
  userinfo.profileImage = req.body.profileImage;
  userinfo.country = "USA";
  res_result.code = 400;
    kafka.make_request('update_profile',{"userinfo":userinfo}, function(err,result){
        if(!err){
            console.log("user profile updated ",result);
            if(result.code === 200){
              res_result.code =200;
              res_result.message = "User profile updated successfully...!!!";
              res.status(200).json(res_result);
            }
        }else{
          console.log("Error found is: ", err);
            res.status(400).json({message:"User profile could not be updated"});
        }
    });
});

//==============================================================================================
router.post('/getProfile',function (req,res,next) {
  console.log("inside get profile post");
  let res_result = {};
  res_result.code = 400;
  let email=req.body.email;
  kafka.make_request('fetch_profile',{"email":email}, function(err,result){
      if(!err){
          console.log("user profile fetched ",result);
          if(result.code === 200){
            res_result.code =200;
            res_result.message = "User profile fetched successfully";
            res_result.userDetails=result.result;
            res.status(200).json(res_result);
          }
      }else{
        console.log("Error found is: ", err);
          res.status(400).json({message:"User profile can not be fetched successfully"});
      }
  });
});
//==============================================================================================
router.post('/ownerlogin', function(req, res, next) {
  console.log("inside owner login");
  let res_result = {};
  let userinfo = {};
  console.log("Request sent by user: ", req.body);
  userinfo.username = req.body.username;
  userinfo.password = req.body.password
  res_result.code = 400;
    kafka.make_request('owner_login',{"userinfo":userinfo}, function(err,result){
        if(!err){
            console.log("owner logged in ",result);
            if(result.code === 200){
              const server_token = jwt.sign({uid:userinfo.username},utils.server_secret_key);
              res_result.loginUser = result.loginUser;
              res_result.servertoken = server_token;
              res_result.code =200;
              res_result.message = "Owner logged in successfully ... ";
              res.status(200).json(res_result);
            }else{
              res_result.message = result.message;
              res.status(400).json(res_result);
            }

        }else{
          console.log("Error found is: ", err);
            res.status(405).json({message:"Server error failed to signup new user try again later"});
        }
    })
});
//==============================================================================================
router.post('/ownersignup', function(req, res, next) {
  console.log("inside owner signup");
  let res_result = {};
  let userinfo = {};
  console.log("Request sent by user: ", req.body);
  userinfo.username = req.body.username;
  userinfo.password = req.body.password;
  userinfo.firstName = req.body.firstName;
  userinfo.lastName = req.body.lastName;
  res_result.code = 400;
    kafka.make_request('owner_signup',{"userinfo":userinfo}, function(err,result){
        if(!err){
            console.log("user signed up ",result);
            if(result.code === 200){
              const server_token = jwt.sign({uid:userinfo.username},utils.server_secret_key);
              res_result.createdUser = result.createdUser;
              res_result.servertoken = server_token;
              res_result.code =200;
              res_result.message = "Owner signed up successfully ... ";
              res.status(200).json(res_result);
            }else{
              res_result.message = result.message;
              res.status(400).json(res_result);
            }

        }else{
          console.log("Error found is: ", err);
            res.status(405).json({message:"Server error failed to signup new user try again later"});
        }
    });
  let firstName=req.body.firstName;
  let lastName=req.body.lastName;
  let email=req.body.username;
  let password=req.body.password;
  var passwordToSave = bcrypt.hashSync(req.body.password, salt);

});
//==============================================================================================
module.exports = router;

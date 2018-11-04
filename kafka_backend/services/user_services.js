// var Users = require('./../models/users')
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var {mongoose} = require('./../db/mongoose');
var {Traveler} = require('./../models/traveler');
var {Owner} = require('./../models/owner');
var salt = bcrypt.genSaltSync(10);


exports.addUser = function(data, callback){
    let passwordToSave = bcrypt.hashSync(data.userinfo.password, salt);
    const userDetail=new Traveler({
          first_name: data.userinfo.firstName,
          last_name: data.userinfo.lastName,
          email: data.userinfo.username,
          pwd: passwordToSave
    });
        console.log("Data passed to kafaka server: ", data.userinfo.username);
        Traveler.find({"email":data.userinfo.username})
          .exec()
          .then(doc=>{
              if(doc==undefined || doc.length==0) {
                  userDetail.save().then(result=> {
                      console.log("response obtained is : ", result);
                      console.log("UID from JWT: ", result.email);
                      var response= {code:200,message:'User successfully signed up.!!!', result:result, createdUser:result.email };
                      callback(null,response);
                  })
                  .catch(err => {
                    console.log("error obtained is : ", err);
                    var response= {code:401,message:'error obtained while saving user data to db..!!!'};
                    callback(err,results);
                  })
              }
              else {
                  var response= {code:400,message:'User already exists, please login'};
                  callback(null,response);
              }
          })
          .catch(err=> {
            var response= {code:405,message:'Error while checking if user is already signed in or not'};
            callback(err,response);
          })
}
//===============================================================================================================================================================
exports.loginUser = function(data, callback){
    // let passwordToSave = bcrypt.hashSync(data.userinfo.password, salt);
    const userDetail=new Traveler({
          email: data.userinfo.username,
          pwd: data.userinfo.password
    });
        console.log("Data passed to kafaka server: ", data.userinfo);
        Traveler.find({"email":data.userinfo.username})
          .exec()
          .then(doc=>{
            if(doc!=undefined && doc.length>0) {
              console.log("response from db: ", doc[0]);
              console.log("Password entered: ", data.userinfo.password);
                  if(bcrypt.compareSync(data.userinfo.password, doc[0].pwd)){

                      console.log("UID from JWT: ", doc[0].email);
                      var response= {code:200,message:'User successfully logged in.!!!', result:doc[0], loginUser:doc[0].email };
                      callback(null,response);
                    }
                    else {
                        console.log("Error.!!!!!!!")
                        var response= {code:400,message:'User entered wrong password'};
                        callback(null,response);
                      }
            }
            else {
              var response= {code:405,message:'User is not registered to login'};
              callback(null,response);
            }
          })
          .catch(err => {
            console.log("Error : ", err);
            var response= {code:405,message:'Error while checking if user is registered or not'};
            callback(err,response);
          })
      }
//===============================================================================================================================================================
exports.loginOwner = function(data, callback){
    // let passwordToSave = bcrypt.hashSync(data.userinfo.password, salt);
    const userDetail=new Owner({
          email: data.userinfo.username,
          pwd: data.userinfo.password
    });
        console.log("Data passed to kafaka server: ", data.userinfo);
        Owner.find({"email":data.userinfo.username})
          .exec()
          .then(doc=>{
            if(doc!=undefined && doc.length>0) {
              console.log("response from db: ", doc[0]);
              console.log("Password entered: ", data.userinfo.password);
                  if(bcrypt.compareSync(data.userinfo.password, doc[0].pwd)){

                      console.log("UID from JWT: ", doc[0].email);
                      var response= {code:200,message:'Owner successfully logged in.!!!', result:doc[0], loginUser:doc[0].email };
                      callback(null,response);
                    }
                    else {
                        console.log("Error.!!!!!!!")
                        var response= {code:400,message:'Owner entered wrong password'};
                        callback(null,response);
                      }
            }
            else {
              var response= {code:405,message:'Owner is not registered to login'};
              callback(null,response);
            }
          })
          .catch(err => {
            console.log("Error : ", err);
            var response= {code:405,message:'Error while checking if owner is registered or not'};
            callback(err,response);
          })
      }
//===============================================================================================================================================================
exports.addOwner= function(data, callback){
    let passwordToSave = bcrypt.hashSync(data.userinfo.password, salt);
    const userDetail=new Owner({
          first_name: data.userinfo.firstName,
          last_name: data.userinfo.lastName,
          email: data.userinfo.username,
          pwd: passwordToSave
    });
        console.log("Data passed to kafaka server: ", data.userinfo.username);
        Owner.find({"email":data.userinfo.username})
          .exec()
          .then(doc=>{
              if(doc==undefined || doc.length==0) {
                  userDetail.save().then(result=> {
                      console.log("response obtained is : ", result);
                      console.log("UID from JWT: ", result.email);
                      var response= {code:200,message:'Owner successfully signed up.!!!', result:result, createdUser:result.email };
                      callback(null,response);
                  })
                  .catch(err => {
                    console.log("error obtained is : ", err);
                    var response= {code:401,message:'error obtained while saving owner data to db..!!!'};
                    callback(err,results);
                  })
              }
              else {
                  var response= {code:400,message:'Owner already exists, please login'};
                  callback(null,response);
              }
          })
          .catch(err=> {
            var response= {code:405,message:'Error while checking if owner is already signed in or not'};
            callback(err,response);
          })
}
//===============================================================================================================================================================

exports.updateUser = function(data, callback){
        var travelerDetails = {
                  firstName : data.userinfo.firstName,
                  lastName : data.userinfo.lastName,
                  aboutMe : data.userinfo.aboutMe,
                  city : data.userinfo.city,
                  company : data.userinfo.company,
                  school : data.userinfo.school,
                  hometown : data.userinfo.hometown,
                  language : data.userinfo.language,
                  gender : data.userinfo.gender,
                  contactNumber : data.userinfo.contactNumber,
                  profileImage : data.userinfo.profileImage,
                  email : data.userinfo.email,
                  country : data.userinfo.country
          };
              console.log("Data passed to kafaka server: ", data.userinfo);
              Traveler.updateOne({email : data.userinfo.email},{$set:{
                first_name : travelerDetails.firstName,
                last_name :travelerDetails.lastName,
                contact_number :travelerDetails.contactNumber,
                about_me :travelerDetails.aboutMe,
                city :travelerDetails.city,
                country :travelerDetails.country,
                company :travelerDetails.company,
                school :travelerDetails.school,
                hometown :travelerDetails.hometown,
                lang :travelerDetails.language,
                gender :travelerDetails.gender
              }})
                .exec()
                .then(doc=> {
                  console.log("Data Obtained after updation is : ", doc);
                  var response= {code:200,message:'User profile updated successfully...!!!'};
                  callback(null,response);
                })
                .catch(err => {
                  console.log("error while updating user", err);
                  var response= {code:405,message:'User profile could not be updated'};
                  callback(null,response);
                })
          }
//===============================================================================================================================================================
exports.getUser = function(data, callback){
  console.log("inside get profile post");
  let email=data.email;
  console.log("Data passed to kafaka server: ", data.email);
  Traveler.find({"email": email})
    .exec()
    .then(doc => {
        console.log("response got : ", doc);
        console.log("Data Obtained after fetching is : ", doc[0]);
        var response= {code:200,message:'User profile fetched successfully',result: doc};
        callback(null,response);
      })
    .catch(err => {
      console.log("Error : ", err);
      var response= {code:400,message:'User profile can not be fetched successfully'};
      callback(null,response);
    })
  }
//===============================================================================================================================================================

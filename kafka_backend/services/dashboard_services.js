var {mongoose} = require('./../db/mongoose');
var {Owner} = require('./../models/owner');
var {Traveler} = require('./../models/traveler');
var {Property} = require('./../models/property');
var {Booking} = require('./../models/booking');



exports.travelerDashboard = function(data, callback){
  let currentUser=data.userinfo.currentUser;
  console.log("UID token from UI: ",currentUser);
  Booking.find({"user_email":currentUser})
  .exec()
  .then(doc=> {
    console.log("Response from booking table: ", doc);
    var response= {code:200,message:'User Dashboard fetched',dashboardDetails: doc};
    callback(null,response);
  })
  .catch(err=> {
    console.log("Error : ", err);
    var response= {code:400,message:'User dashboard can not be fetched.!!'};
    callback(null,response);
  })
}

exports.ownerDashboard = function(data, callback){
  let currentUser=data.userinfo.currentUser;
  console.log("UID token from UI: ",currentUser);
  Booking.find({"owner_email":currentUser})
  .exec()
  .then(doc=> {
    console.log("Response from booking table: ", doc);
    var response= {code:200,message:'Owner Dashboard fetched',dashboardDetails: doc};
    callback(null,response);
  })
  .catch(err=> {
    console.log("Error : ", err);
    var response= {code:400,message:'Owner dashboard can not be fetched.!!'};
    callback(null,response);
  })
}
exports.updatedownerDashboard = function(data, callback){
  let property_headline=data.propertyinfo.property_headline;
  console.log("UID token from UI: ",property_headline);
  Booking.find({"property_headline":data.propertyinfo.property_headline})
  .exec()
  .then(doc=> {
    console.log("Response from booking table: ", doc);
    var response= {code:200,message:'Owner Dashboard fetched',dashboardDetails: doc};
    callback(null,response);
  })
  .catch(err=> {
    console.log("Error : ", err);
    var response= {code:400,message:'Owner dashboard can not be fetched.!!'};
    callback(null,response);
  })
}

exports.filterTravelerDashboard = function(data, callback){
  let currentUser= data.userinfo.currentUser;
  let startDate = data.userinfo.startDate;
  let endDate = data.userinfo.endDate;
  Booking.find({
    "user_email":currentUser,
    "start_date": {
                        $gte: new Date(startDate)
                   },
     "end_date": {
                        $lte: new Date(endDate)
                   }
  })
  .exec()
  .then(doc=> {
    console.log("Response from booking table: ", doc);
    var response= {code:200,message:'Filtered User Dashboard fetched',dashboardDetails: doc};
    callback(null,response);
  })
  .catch(err=> {
    console.log("Error : ", err);
    var response= {code:400,message:'User dashboard can not be filtered.!!'};
    callback(null,response);
  })
}

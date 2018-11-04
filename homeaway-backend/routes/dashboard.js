var express = require('express');
var router = express.Router();
var mysql=require('./mysql.js');
var utils = require('./../util/utils');
var {mongoose} = require('./../db/mongoose');
var kafka = require('./../kafka/client');

router.post('/userdashboard',function(req , res , next) {
  console.log("Inside User Dashboard");
  let res_result = {};
  let userinfo = {};
  userinfo.currentUser = req.body.currentuser;
  console.log("UID token from UI: ",req.body.currentUser);
  kafka.make_request('traveler_dashboard',{"userinfo":userinfo}, function(err,result){
      if(!err){
          console.log("user dashboard fetched ",result);
          if(result.code === 200){
            res_result.code =200;
            res_result.message = "User Dashboard fetched";
            res_result.dashboardDetails=result.dashboardDetails;
            res.status(200).json(res_result);
          }
      }else{
        console.log("Error found is: ", err);
          res.status(400).json({message:"User Dashboard can not be fetched successfully"});
      }
  });
});

router.post('/ownerdashboard',function(req , res , next) {
  console.log("Inside Owner Dashboard");
  let res_result = {};
  let userinfo = {};
  userinfo.currentUser = req.body.currentuser;
  console.log("UID token from UI: ",req.body.currentUser);
  kafka.make_request('owner_dashboard',{"userinfo":userinfo}, function(err,result){
      if(!err){
          console.log("Owner dashboard fetched ",result);
          if(result.code === 200){
            res_result.code =200;
            res_result.message = "Owner Dashboard fetched";
            res_result.dashboardDetails=result.dashboardDetails;
            res.status(200).json(res_result);
          }
      }else{
        console.log("Error found is: ", err);
          res.status(400).json({message:"Owner Dashboard can not be fetched successfully"});
      }
  });
});

router.post('/fetchedownerdashboard',function(req , res , next) {
  console.log("Inside fetch updated Owner Dashboard", req.body);
  let res_result = {};
  let propertyinfo = {};
  propertyinfo.property_headline = req.body.property_headline;
  console.log("UID token from UI: ",req.body.property_headline);
  kafka.make_request('updatedowner_dashboard',{"propertyinfo":propertyinfo}, function(err,result){
      if(!err){
          console.log("Owner dashboard fetched ",result);
          if(result.code === 200){
            res_result.code =200;
            res_result.message = "Owner Dashboard fetched";
            res_result.dashboardDetails=result.dashboardDetails;
            res.status(200).json(res_result);
          }
      }else{
        console.log("Error found is: ", err);
          res.status(400).json({message:"Owner Dashboard can not be fetched successfully"});
      }
  });
});



router.post('/filtereduserdashboard',function(req , res , next) {
  console.log("Inside Filter User Dashboard");
  let res_result = {};
  let userinfo = {};
  userinfo.currentUser = req.body.currentuser;
  userinfo.startDate =  req.body.startDate;
  userinfo.endDate = req.body.endDate;
  kafka.make_request('filter_traveler_dashboard',{"userinfo":userinfo}, function(err,result){
      if(!err){
          console.log("filtered user dashboard fetched ",result);
          if(result.code === 200){
            res_result.code =200;
            res_result.message = "Filtered User Dashboard fetched";
            res_result.dashboardDetails=result.dashboardDetails;
            res.status(200).json(res_result);
          }
      }else{
        console.log("Error found is: ", err);
          res.status(400).json({message:"User dashboard can not be filtered.!!"});
      }
  });
});


module.exports = router;

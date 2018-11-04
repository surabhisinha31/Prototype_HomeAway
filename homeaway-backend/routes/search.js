var express = require('express');
var router = express.Router();
var mysql= require('./mysql.js');
var kafka = require('./../kafka/client');
var utils = require('./../util/utils');
// var {mongoose} = require('./../db/mongoose');
// var {Traveler} = require('./../models/traveler');
// var {Owner} = require('./../models/owner');
// var {Booking} = require('./../models/booking');
// var {Property} = require('./../models/property');

/* GET search page. */
router.post('/search', function(req, res, next) {
  console.log("inside search");
	let res_result = {};
  let propertySearch = {};
	propertySearch.email=req.body.email;
	propertySearch.propertyLocation=req.body.propertyLocation.toLowerCase();
	propertySearch.availabilityStartDate=req.body.availabilityStartDate;
	propertySearch.availabilityEndDate=req.body.availabilityEndDate;
	propertySearch.accomodation=req.body.accomodation;
  console.log("Date sent: ", req.body);
  console.log("property search data: ", propertySearch);
	 kafka.make_request('property_search',{"propertySearch":propertySearch}, function(err,result){
			 if(!err){
					 console.log("Property has been searched: ",result);
					 if(result.code === 200){
						 res_result.code =200;
						 res_result.message = "Searched Property Posted Fetched successfully";
						 res_result.result=result.result;
						 res.status(200).json(res_result);
					 }else{
						 res_result.message = result.message;
						 res.status(400).json(res_result);
					 }

			 }else{
				 console.log("Error found is: ", err);
					 res.status(405).json({message:"First Login, then search for property"});
			 }
	 });
});
//============================================================================================
router.post('/propertypost' , function(req, res, next){
	console.log("inside property post");
	let res_result = {};
  let propertyListing = {};
	propertyListing.propertyLocation=req.body.propertyLocation.toLowerCase();
	propertyListing.propertyHeadline=req.body.propertyDetails.propertyHeadline;
	propertyListing.propertyDescription=req.body.propertyDetails.propertyDescription;
	propertyListing.propertyArea=req.body.propertyDetails.propertyArea;
	propertyListing.propertyType=req.body.propertyDetails.propertyType;
	propertyListing.bedroomNumber=req.body.propertyDetails.bedroomNumber;
	propertyListing.bathroomNumber=req.body.propertyDetails.bathroomNumber;
	propertyListing.accomodation=req.body.propertyDetails.accomodation;
	propertyListing.bookingType=req.body.bookingType;
	propertyListing.availabilityStartDate=req.body.availabilityStartDate;
	propertyListing.availabilityEndDate=req.body.availabilityEndDate;
	propertyListing.propertyPricing=req.body.propertyPricing;
	propertyListing.nightStay=req.body.nightStay;
	propertyListing.email=req.body.email;
	kafka.make_request('property_post',{"propertyListing":propertyListing}, function(err,result){
			if(!err){
					console.log("property posted successfully",result.result);
					if(result.code === 200){
						res_result.code = 200;
						res_result.message = "Property Posted successfully";
            console.log("value return after posting: ", result.result._id);
						res_result.result=result.result._id;
						res.status(200).json(res_result);
					}
					else{
						res.status(400).json({message:"error while updating property id"});
					}
			}else{
				console.log("Error found is: ", err);
					res.status(405).json({message:"error while checking if owner can post property or not"});
			}
	})
});
//=================================================================================================================================
router.post('/ownerpost', function(req, res, next) {
  console.log("inside owner property posting API");
	let res_result = {};
  res_result.code = 400;
  let email=req.body.currentuser;
	console.log("Email entered", email);
	kafka.make_request('owner_authentication',{"email":email}, function(err,result){
      if(!err){
          console.log("owner profile fetched ",result);
          if(result.code === 200){
            res_result.code = 200;
            res_result.message = "Owner can post property";
            res_result.loginUser=result.loginUser;
            res.status(200).json(res_result);
          }
					else{
						res.status(400).json({message:"User is not an owner,so can not post property"});
					}
      }else{
        console.log("Error found is: ", err);
          res.status(405).json({message:"Error while searching for owner"});
      }
  })
});

module.exports = router;

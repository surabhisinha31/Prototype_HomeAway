var express = require('express');
var router = express.Router();
var mysql= require('./mysql.js');
var {mongoose} = require('./../db/mongoose');
var kafka = require('./../kafka/client');

router.post('/booking', function(req,res,next) {
	console.log("Inside Booking post.!!");
	let res_result = {};
  let bookinginfo = {};
	let duration = (new Date(req.body.endDate).getDate()-new Date(req.body.startDate).getDate())+1;
	bookinginfo.propertyId=req.body.propertyId;
	bookinginfo.endDate=req.body.endDate;
	bookinginfo.startDate=req.body.startDate;
	bookinginfo.total_pricing=req.body.total_pricing;
	bookinginfo.duration=duration;
	bookinginfo.sDate=req.body.availability_start_date;
	bookinginfo.eDate=req.body.availability_end_date;
	bookinginfo.owner_email=req.body.ownerEmail;
	bookinginfo.user_email=req.body.userEmail;
	bookinginfo.property_headline=req.body.property_headline;
	console.log("Booking info: ", bookinginfo);
	kafka.make_request('property_booking',{"bookinginfo":bookinginfo}, function(err,result){
        if(!err){
            console.log("Property booking info: ",result);
            if(result.code === 200){
              // res_result.code =200;
							console.log("Booking Successfull.!!!");
              //res_result.message = "Booking Successfull.!!!";
							//res_result.result = result;
              res.status(200).json(result);
            }
        }else{
          console.log("Error found is: ", err);
            res.status(400).json({message:"Booking unsuccessfull.!!!"});
        }
    });
});

module.exports = router;

var {mongoose} = require('./../db/mongoose');
var {Owner} = require('./../models/owner');
var {Traveler} = require('./../models/traveler');
var {Property} = require('./../models/property');
var {Booking} = require('./../models/booking');

exports.propertyBooking= function(data, callback){
        console.log("Data passed to kafaka server: ", data.bookinginfo);
        var startDateObj = new Date(data.bookinginfo.startDate);
        console.log("I am here: ",data.bookinginfo);
        var date2=startDateObj+1;
        var date4=startDateObj-1;
        var newStartDate=new Date(date2).toISOString().split('T')[0];
        console.log("new start date: ", newStartDate);
        var newEndDate1=new Date(date4).toISOString().split('T')[0];
        console.log("new end date: ", newEndDate1);
        var dateString1 = new Date(data.bookinginfo.endDate);
        console.log("date string obtained : ", dateString1);
        var date3=dateString1+1;
        console.log("DATE3" , date3);
        var newEndDate=new Date(date3).toISOString().split('T')[0];
        console.log("new end obtained : ", newEndDate);
        let sDate=data.bookinginfo.sDate;
        let eDate=data.bookinginfo.eDate;
        console.log("TP START DATE: ", sDate);
        console.log("TP END DATE: ", eDate);
        let propertyActualStartDate=new Date(sDate).toISOString().split('T')[0];
        let propertyActualEndDate=new Date(eDate).toISOString().split('T')[0];
        console.log("actual property start date: ", propertyActualStartDate);
        console.log("actual property end date: ", propertyActualEndDate);
        var bookingDetails= new Booking({
            property_id : data.bookinginfo.propertyId,
            start_date : data.bookinginfo.startDate,
            end_date : data.bookinginfo.endDate,
            owner_email : data.bookinginfo.owner_email,
            user_email : data.bookinginfo.user_email,
            total_pricing : data.bookinginfo.total_pricing,
            property_headline: data.bookinginfo.property_headline
        });
        bookingDetails.save().then( result => {
          console.log("booking added response : ", result);
          Booking.updateOne({_id : result._id},{$set:{
                          booking_id : result._id
                        }})
                        .then( res => {
                            console.log("Booking ID: " , res);
                   Property.updateOne({property_id : data.bookinginfo.propertyId},{$set:{
                          booking_flag : 0
                       }})
                       .then( res => {
                          Property.find({"property_id":data.bookinginfo.propertyId})
                          .exec()
                          .then(doc=> {
                            console.log("Property details fetched: ", doc);
                            const propertyDetails = new Property({
                                  property_location : doc[0].property_location,
                                  property_headline : doc[0].property_headline,
                                  property_description : doc[0].property_description,
                                  property_area : doc[0].property_area,
                                  property_type : doc[0].property_type,
                                  bedrooms : doc[0].bedrooms,
                                  bathrooms : doc[0].bathrooms,
                                  accommodation : doc[0].accommodation,
                                  booking_type : doc[0].booking_type,
                                  property_pricing : doc[0].property_pricing,
                                  nightly_stay : doc[0].nightly_stay,
                                  owner_email : doc[0].owner_email,
                                  property_id : doc[0].property_id,
                                  booking_flag : 1
                          });
                              console.log("here here.......",propertyActualStartDate);
                              console.log("there there.......",data.bookinginfo.startDate);
                              console.log("check if: ", (propertyActualStartDate== data.bookinginfo.startDate));
                              console.log("second if: ", (propertyActualStartDate > data.bookinginfo.endDate));
                            if(propertyActualStartDate== data.bookinginfo.startDate && propertyActualEndDate > data.bookinginfo.endDate) {
                              propertyDetails.availability_start_date= newEndDate ;
                              propertyDetails.availability_end_date = propertyActualEndDate;
                              propertyDetails.save().then(res=>{
                                console.log("Data inserted by 1st query: ", res);
                              })
                              .catch(error=> {
                                console.log("Error while inserting record to property collection", error);
                              })
                            }
                            else if(propertyActualStartDate < data.bookinginfo.startDate && propertyActualEndDate == data.bookinginfo.endDate) {
                              propertyDetails.availability_start_date= propertyActualStartDate;
                              propertyDetails.availability_end_date = newEndDate1;
                              propertyDetails.save().then(res=>{
                                console.log("Data inserted by 2nd query: ", res);
                              })
                              .catch(error=> {
                                console.log("Error while inserting record to property collection", error);
                              })
                            }
                            else if(propertyActualStartDate < data.bookinginfo.startDate && propertyActualEndDate > data.bookinginfo.endDate) {
                              propertyDetails.availability_start_date= propertyActualStartDate;
                              propertyDetails.availability_end_date = newEndDate1;
                              propertyDetails.save().then(res=>{
                                console.log("Data inserted by 3rd query: ", res);
                                    const propertyDetails1 = new Property({
                                          property_location : doc[0].property_location,
                                          property_headline : doc[0].property_headline,
                                          property_description : doc[0].property_description,
                                          property_area : doc[0].property_area,
                                          property_type : doc[0].property_type,
                                          bedrooms : doc[0].bedrooms,
                                          bathrooms : doc[0].bathrooms,
                                          accommodation : doc[0].accommodation,
                                          availability_start_date: newEndDate,
                                          availability_end_date : propertyActualEndDate,
                                          booking_type : doc[0].booking_type,
                                          property_pricing : doc[0].property_pricing,
                                          nightly_stay : doc[0].nightly_stay,
                                          owner_email : doc[0].owner_email,
                                          property_id : doc[0].property_id,
                                          booking_flag : 1
                                        });

                                    propertyDetails1.save().then(response=>{
                                      console.log("Data inserted by 4th query: ", response);
                                    })
                                    .catch(error=> {
                                      console.log("Error while inserting record to property collection", error);
                                    })
                                })
                              .catch(error=> {
                                console.log("Error while inserting record to property collection", error);
                              })

                            }
                          })
                          .catch(err=> {
                            console.log("Error while fetching data from property table after updating booking flag");
                          });
                        })
                        .catch(errors => {
                            console.log("error while updating property id", errors);
                         })
                        })
                        .catch(errors => {
                           console.log("error while updating property id in booking table", errors);
                        })
                    var response= {code:200,message:'Booking added successfully', result};
                    callback(null,response);
        })
        .catch(err=> {
          console.log("Error while adding booking details : ", err);
          var response= {code:400,message:'Error while adding booking details'};
          callback(null,response);
        })
      }

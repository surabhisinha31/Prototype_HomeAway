var {mongoose} = require('./../db/mongoose');
var {Owner} = require('./../models/owner');
var {Traveler} = require('./../models/traveler');
var {Property} = require('./../models/property');

exports.searchProperty = function(data, callback){
        console.log("Data passed to kafaka server: ", data.propertySearch);
          Traveler.find({"email" : data.propertySearch.email})
            .exec()
             .then(doc => {
                console.log("User is registered and allowed to search for property", doc);
                console.log("Date user entered", new Date(data.propertySearch.availabilityStartDate));
                Property.find({
                              "property_location": data.propertySearch.propertyLocation,
                              "availability_start_date": {
                                                  $lte: new Date(data.propertySearch.availabilityStartDate)
                                             },
                               "availability_end_date": {
                                                  $gte: new Date(data.propertySearch.availabilityEndDate)
                                             },
                               "accommodation": {
                                                  $gte: data.propertySearch.accomodation
                                             },
                              "booking_flag" : 1
                       })
                  .then(result=> {
                    console.log("Printing the result after fetching the property", result);
                    var response= {code:200,message:'Searched Property Posted Fetched successfully', result:result};
                    callback(null,response);
                  })
                  .catch(error=> {
                    console.log("No property found as per user requirement : ", err);
                    var response= {code:400,message:'No property fount as per user requirement'};
                    callback(err,response);
                  })
             })
             .catch(err=> {
                    console.log("Login to search : ", err);
                    var response= {code:405,message:'First Login, then search for property'};
                    callback(err,response);
             })
        }
//===============================================================================================================================================================
exports.postProperty = function(data, callback){

    const propertyDetails=new Property({
            property_location : data.propertyListing.propertyLocation,
            property_headline : data.propertyListing.propertyHeadline,
            property_description : data.propertyListing.propertyDescription,
            property_area : data.propertyListing.propertyArea,
            property_type : data.propertyListing.propertyType,
            bedrooms : data.propertyListing.bedroomNumber,
            bathrooms : data.propertyListing.bathroomNumber,
            accommodation : data.propertyListing.accomodation,
            booking_type : data.propertyListing.bookingType,
            availability_start_date : data.propertyListing.availabilityStartDate,
            availability_end_date : data.propertyListing.availabilityEndDate,
            property_pricing : data.propertyListing.propertyPricing,
            nightly_stay : data.propertyListing.nightStay,
            owner_email : data.propertyListing.email,
            booking_flag : 1
    });
        console.log("Data passed to kafaka server: ", data.propertyListing);
        Owner.find({"email":data.propertyListing.email})
        .exec()
          .then(doc=>{
              console.log("response obtained is : ", doc);
              propertyDetails.save().then(result => {
                  console.log("property posted response : ", result);
                  Property.updateOne({_id : result._id},{$set:{
                        property_id : result._id
                      }})
                      .then( res => {
                          console.log("Property ID: " , res);
                          var response= {code:200,message:'Property Posted successfully', result: result};
                          callback(null,response);
                      })
                      .catch(errors => {
                         console.log("error while updating property id", errors);
                         var response= {code:401,message:'error while updating property id'};
                         callback(null,response);
                      })

                })
          .catch(error => {
            console.log("error while posting property", error);
            var response= {code:400,message:'error while posting property'};
            callback(null,response);
          })
        })
        .catch(err=> {
          console.log("error while checking if owner can post property or not: ", err);
          var response= {code:405,message:'error while checking if owner can post property or not'};
          callback(null,response);
        });
      }
//===============================================================================================================================================================
exports.ownerAuthentication = function(data, callback){
  console.log("inside owner authentication post");
  let email=data.email;
  console.log("Data passed to kafaka server: ", data.email);
  Owner.find({"email": email})
    .exec()
    .then(doc => {
        console.log("response got : ", doc);
        if(doc!=undefined && doc.length>0) {
            console.log("Owner details fetched: ", doc);
            var response= {code:200,message:'Owner can post property',loginUser: doc[0].email};
            callback(null,response);
        }
        else {
          console.log("User is not an owner,so can not post property");
          var response= {code:400,message:'User is not an owner,so can not post property'};
          callback(null,response);
        }
      })
    .catch(err => {
      console.log("Error : ", err);
      var response= {code:405,message:'Error while searching for owner'};
      callback(null,response);
    })
  }
//===============================================================================================================================================================

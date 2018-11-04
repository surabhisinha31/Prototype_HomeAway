var mongoose =require('mongoose');

var propertySchema= mongoose.Schema({
    id : {
        type : Number
    },
    property_id : {
        type : String
    },
    owner_email :{
        type : String
    },
    booking_flag : {
        type : Number
    },
    property_location : {
        type : String
    },
    property_headline : {
        type : String
    },
    property_description : {
        type : String
    },
    property_area : {
        type : String
    },
    property_type : {
        type : String
    },
    bedrooms : {
        type : Number
    },
    bathrooms : {
        type : Number
    },
    accommodation : {
        type : Number
    },
    booking_type : {
        type : String
    },
    availability_start_date : {
        type : Date
    },
    availability_end_date : {
        type : Date
    },
    property_pricing : {
        type : Number
    },
    nightly_stay : {
        type : Number
    }
})
const Property = mongoose.model('Property',propertySchema);
module.exports.Property = Property;
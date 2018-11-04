var mongoose =require('mongoose');

var bookingSchema= mongoose.Schema({
    booking_id : {
        type : String
    },
    property_id : {
        type : String
    },
    owner_email :{
        type : String
    },
    user_email : {
        type : String
    },
    total_pricing : {
        type : Number
    },
    start_date : {
        type : Date
    },
    end_date : {
        type : Date
    },
    property_headline : {
        type : String
    }
})
const Booking = mongoose.model('Booking',bookingSchema);
module.exports.Booking = Booking;

var mongoose =require('mongoose');

var travelerSchema = mongoose.Schema({
    first_name : {
        type : String
    },
    last_name : {
        type : String
    },
    pwd :{
        type : String
    },
    email : {
        type : String
    },
    owner_flag : {
        type : Number
    },
    contact_number : {
        type : String
    },
    about_me : {
        type : String
    },
    city : {
        type : String
    },
    country : {
        type : String
    },
    company : {
        type : String
    },
    school : {
        type : String
    },
    hometown : {
        type : String
    },
    lang : {
        type : String
    },
    gender : {
        type : String
    },
    profile_img : {
        type : String
    }
});

const Traveler = mongoose.model('Traveler',travelerSchema);

module.exports.Traveler = Traveler;


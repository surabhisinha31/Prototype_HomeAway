var mongoose =require('mongoose');

var ownerSchema= mongoose.Schema({
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
    }
})
const Owner = mongoose.model('Owner',ownerSchema);
module.exports.Owner = Owner;
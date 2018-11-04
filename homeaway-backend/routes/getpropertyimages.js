var express = require('express');
var router = express.Router();
var mysql=require('./mysql.js');
const multer = require('multer');
var localStorage=require('localStorage');
var fs=require('file-system');
var glob=require('glob');


router.post('/getpropertyimages', function (req, res, next) {
    var propertyId = req.body._id;
    console.log("Property ID is :" +propertyId);
    var resArr = [];
    glob("public/uploads/property/"+propertyId+"/*.jpg", function (err, files) {
      console.log(files);
        var resArr = files.map(function (file) {
            var imgJSON = {};
            imgJSON.img = 'uploads/property/'+propertyId+'/'+file.split('/')[4];
            return imgJSON;
        });
        res.status(200).send({result : resArr});
    });
});

 

module.exports = router; 

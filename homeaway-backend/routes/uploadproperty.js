var express = require('express');
var router = express.Router();
var mysql=require('./mysql.js');
const multer = require('multer');
var localStorage=require('localStorage');
var fs=require('file-system');
userSession={
  email : 'saurabhsinha5988@gmail.com',
  loggedIn : 'true'
};

const storage=multer.diskStorage({
  destination :function(req,file, cb) {
    console.log("Property id passed is: ",req.body)
    var currentFolder = 'public/uploads/property/' + req.body.propertyId +'/';
    fs.mkdir(currentFolder, function(err){
      if(!err) {
        console.log("no error");
        cb(null , currentFolder);
      } else {
         console.log("error");
        cb(null , currentFolder);
      }
    });
  },
  filename: function(req,file,cb){
    console.log(file.originalname);
    cb(null, file.originalname);
  }
});

const fileFilter =(req,file, cb) => {
  if(file.mimetype==='image/jpeg' || file.mimetype==='image/png'|| file.mimetype==='image/jpg') {
    cb(null,true);
  }
  else {
    cb(null,false);
  }
}

const upload=multer({
    storage: storage,
    limits: {
      fileSize :1024*1024*5
    },
    fileFilter :fileFilter
  });


router.post('/uploadpropertypic' , upload.array('photos',10), function(req , res , next) {
  console.log("Inside upload property pic API");

  console.log(req.files);
  res.status(200).json({message : "Pictures uploaded successfully!"})

});

module.exports = router;

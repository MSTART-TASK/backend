const multer = require('multer');
const cloudinary = require("cloudinary");
const path = require('path');


cloudinary.config({
     cloud_name: "dtifuw6hd",
     api_key: "465678975526394",
     api_secret: "sY3-x3b5tAHIpfuqwdKjbBjkXoU",
});

const storageProfile = multer.diskStorage({
     filename: function (req, file, cb) {
          cb(null, file.originalname);
     },
});

const uploadToMulter = multer({
     storage: storageProfile,
     limits: { fileSize: 100000000 },
     fileFilter: function (req, file, cb) {
       checkFileType(file, cb);
     }
});
   

function checkFileType(file, cb) {
     const filetypes = /jpeg|jpg|png|gif/;
     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
     const mimetype = filetypes.test(file.mimetype);
   
     if (mimetype && extname) {
       return cb(null, true);
     } else {
       cb("Error: Images Only!");
     }
}

async function uploadToCloudinary(req, res, next) {
     try {
          const result = await cloudinary.uploader.upload(req.file.path);
          req.image = result.secure_url;
          next();
     } catch (err) {
          console.log(err);
       next(err);
     }
}

console.log(new Date());

module.exports = {
     uploadToMulter,
     uploadToCloudinary
}
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dvq2kdv1z",
  api_key: "898752729744491",
  //   api_secret: process.env.CLOUDINARY_API_SECRET,
  api_secret: "ClEdHIp7JFvSCjLfSUtx9-kcrMQ",
});

module.exports = cloudinary;

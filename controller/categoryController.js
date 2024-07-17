const multer = require("multer");
const sharp = require("sharp");
const Category = require("../model/categoryModel");
const cloudinary = require("../utils/cloudinary");

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     console.log("✉️✉️😢😢", file);
//     // cb(null, `public/data/projectImages`);
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];
//     console.log(file);
//     // cb(null, `project-${Date.now()}.${ext}`);
//   },
// });

exports.getImageByCategory = async (req, res, next) => {
  const data = await Category.aggregate([
    {
      $match: { imgType: req.params.imgType },
    },
  ]);

  res.status(200).json({
    status: "success",
    data,
  });
};

exports.getAllCategories = async (req, res, next) => {
  const data = await Category.aggregate([
    {
      $group: {
        _id: "$imgCategory",
        subCategories: { $push: "$imgType" },
        images: { $push: "$$ROOT" },
      },
    },
  ]);

  data.forEach((d, i) => {
    d.subCategories = [...new Set(d.subCategories)];
  });

  res.status(200).json({
    status: "scuccess",
    data,
  });
};

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please uplaod only images.", 400), false);
  }
};

const upload = multer({
  // storage: multerStorage,
  storage: multer.diskStorage({}),
  fileFilter: multerFilter,
});

exports.uploadImages = upload.fields([
  {
    name: "photos",
    maxCount: 100,
  },
]);

exports.optimizeImages = async (req, res, next) => {
  try {
    // console.log(req.files);
    req.body.photos = await Promise.all(
      req.files.photos.map(async (photo) => {
        const img = (await cloudinary.uploader.upload(photo.path)).url;
        return img;
      })
    );
    next();
  } catch (error) {
    next(error);
  }
};

exports.insertImage = async (req, res, next) => {
  // 1. Get req.file into req.body
  console.log(req.body);
  await Promise.all(
    req.body.photos.map(async (img, i) => {
      await Category.create({
        imgCategory: req.body.imgCategory,
        imgType: req.body.imgType,
        imagePath: img,
      });
    })
  );
  res.status(200).json({
    status: "success",
    message: "Data uploaded successfully",
  });
  // 2. Insert the images in DB
};

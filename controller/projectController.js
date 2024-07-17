const multer = require("multer");
const sharp = require("sharp");
const Project = require("../model/projectModel");
const handlerFactory = require("./handlerFactory");
const cloudinary = require("../utils/cloudinary");

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     console.log(file);
//     cb(null, `public/data/projectImages`);
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `project-${Date.now()}.${ext}`);
//   },
// });

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
    name: "imageCover",
    maxCount: 1,
  },
  {
    name: "photos",
    maxCount: 50,
  },
]);

exports.optimizeImages = async (req, res, next) => {
  if (!req.files) return next();
  const { imageCover: ic, photos: ph } = req.files;
  req.body.imageCover = (
   ( await cloudinary.uploader.upload(ic[0].path, (err, res) => {
      if (err) {
        return next(
          new AppError("Issue in uploading photo, please try again later", 500)
        );
      }
    })
  )).url;
  console.log(req.body.imageCover);

  req.body.photos = await Promise.all(
    ph.map(
      async (photo) =>
        (
          await cloudinary.uploader.upload(photo.path, (err, res) => {
            if (err) {
              return next(
                new AppError(
                  "Issue in uploading photo, please try again later",
                  500
                )
              );
            }
          })
        ).url
    )
  );

  next();
};

exports.insertProject = handlerFactory.insertOne(Project);
exports.getAllProjects = handlerFactory.getAll(Project);
exports.getProject = handlerFactory.getOne(Project);

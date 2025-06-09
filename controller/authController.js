const bcrypt = require("bcryptjs");

const Admin = require("../model/adminModel");

exports.authAdmin = async (req, res, next) => {
  try {
    const admin = (await Admin.find())[0];

    if (
      !(
        req.body.username === admin.adminName &&
        bcrypt.compareSync(req.body.password, admin.adminPassword)
      )
    ) {
      throw new Error("Invalid username or password!");
    }
    res.status(200).json({
      status: "success",
      message: "Authenticated",
      isAuthenticated: true,
    });
  } catch (error) {
    res.status(401).json({
      status: "Unauthorized",
      message: error.message,
    });
  }
};

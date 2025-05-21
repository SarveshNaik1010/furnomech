const jwt = require("jsonwebtoken");
const sec =
  "3p4j03i5ngi3n50ign30ingm035ng035ng03ing0n50gn034jf03n4f0i3n50gn30inf034jf03j09j";
exports.getToken = function (req, res, next) {
  const token = jwt.sign({ email: req.body.email }, sec);

  res.status(200).json({
    status: "success",
    token,
  });
};

exports.validateToken = function (req, res, next) {
  const email = req.body.email;
  const isValid = jwt.verify(req.body.sec);
  console.log(isValid);
};

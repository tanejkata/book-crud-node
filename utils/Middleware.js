const jwt = require("jsonwebtoken");
const Customer = require("../model/CustomerModel");

const ValidateUser = async (
  req,
  res,
  next,
  adminCheck,
  sendResponse = false
) => {
  try {
    const authHeader = req.headers["authorization"];
    if (authHeader) {
      const token = authHeader && authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET);
      const _id = decoded._id;
      const customer = await Customer.find({ _id });
      req.customer = customer[0];
      if (adminCheck && customer[0].role !== "admin") {
        throw new Error("Not authorized");
      }
      if (!sendResponse) {
        next();
      } else {
        res.status(200).send(customer);
      }
    } else {
      throw new Error("No authorization header");
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const Authorize = async (req, res, next) => {
  ValidateUser(req, res, next, false);
};

const AdminAuthorize = async (req, res, next) => {
  ValidateUser(req, res, next, true);
};

const AuthRoute = async (req, res) => {
  ValidateUser(req, res, null, false, true);
};

module.exports = { Authorize, AdminAuthorize, AuthRoute };

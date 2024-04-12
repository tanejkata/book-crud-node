const express = require("express");
const { Authorize } = require("../utils/Middleware");

const {
  CreateCustomer,
  LoginCustomer,
  DeleteCustomer,
} = require("../controller/CustomerController");

const router = express.Router();

router.post("/login", LoginCustomer);
router.post("/register", CreateCustomer);
router.post("/destroy", Authorize, DeleteCustomer);

module.exports = router;

const express = require("express");
const { Authorize, AdminAuthorize } = require("../utils/Middleware");
const {
  CreateOrder,
  UpdateOrder,
  ListOrder,
  GetOrder,
} = require("../controller/OrderController");

const router = express.Router();

router.post("/create", Authorize, CreateOrder);
router.put("/:id", AdminAuthorize, UpdateOrder);
router.get("/:id", Authorize, GetOrder);
router.get("/", Authorize, ListOrder);

module.exports = router;

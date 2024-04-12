const express = require("express");
const { Authorize, AdminAuthorize } = require("../utils/Middleware");
const {
  CreateBook,
  UpdateBook,
  GetBook,
  ListBook,
  DeleteBook,
  SearchBook,
} = require("../controller/BookController");

const router = express.Router();

router.post("/create", AdminAuthorize, CreateBook);
router.put("/update/:id", AdminAuthorize, UpdateBook);
router.get("/", Authorize, ListBook);
router.get("/search", SearchBook);
router.get("/:id", Authorize, GetBook);
router.delete("/:id", AdminAuthorize, DeleteBook);

module.exports = router;

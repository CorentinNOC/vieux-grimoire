const express = require("express");
const router = express.Router();

const bookCtrl = require("../controllers/book");

router.get("/", bookCtrl.getBooks);
router.post("/", bookCtrl.createBook);

module.exports = router;

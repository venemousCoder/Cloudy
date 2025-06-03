const router = require("express").Router();
const errorcontroller = require("../controllers/error.controller");

router.use(errorcontroller.error);

module.exports = router;
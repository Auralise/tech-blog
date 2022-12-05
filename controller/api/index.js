const router = require("express").Router();

//Route source files
const userApi  = require("./user-api");
const postApi = require("./post-api");


router.use("/user", userApi);
router.use("/post", postApi);



module.exports = router;
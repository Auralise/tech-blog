const router = require("express").Router();

//Route source files
const userApi  = require("./user-api");


router.use("/user", userApi);



module.exports = router;
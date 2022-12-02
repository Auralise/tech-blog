const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./page-routes");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);

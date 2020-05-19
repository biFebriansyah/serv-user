const express = require("express");
const Users = require("./Routes/Users");
let secureEnv = require("secure-env");
global.process.env = secureEnv({ secret: "bukalapak" });
const MainRouters = express.Router();

MainRouters.use("/users", Users);
MainRouters.get("*", function (req, res) {
    res.status(404).send("where you wana go?");
});

module.exports = MainRouters;

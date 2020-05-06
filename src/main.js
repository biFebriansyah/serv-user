const express = require("express");
const Users = require("./Routes/Users");

const MainRouters = express.Router();

MainRouters.use("/users", Users);
MainRouters.get("*", function (req, res) {
    res.status(404).send("what???");
});

module.exports = MainRouters;

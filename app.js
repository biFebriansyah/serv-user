require("dotenv/config");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const db = require("./src/Configs/conn");
const router = require("./src/main");
const fs = require("fs");
const path = require("path");
const server = express();
const jsyml = require("js-yaml");
const swaggerUi = require("swagger-ui-express");

const servicePort = process.env.SERVICEPORT;
const swgFile = fs.readFileSync(path.join(__dirname, "./swagger.yaml"), "utf8");
const swgDocs = jsyml.safeLoad(swgFile);

server.use("/docs", swaggerUi.serve, swaggerUi.setup(swgDocs));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(morgan("dev"));


// Wait connection from DB,
// run on Docker case
let retries = 10;
(async () => {
    while (retries) {
        try {
            const dborm = await db.sequelizeTest();
            const dbcon = await db.dbConnect();
            console.log(dbcon);
            console.log(dborm);
            break;
        } catch (err) {
            console.log(err);
            retries -= 1;
            console.log(`retries left ${retries}`);
            await new Promise((res) => setTimeout(res, 7000));
        }
    }
})();

server.use(router);

server.listen(servicePort, () => {
    console.log(`Service running in port ${servicePort}`);
});

module.exports = server;

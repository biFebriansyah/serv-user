const { Pool } = require("pg");
const { Sequelize } = require("sequelize");

class dbConnect {
    constructor() {
        this.con = new Pool({
            user: global.process.env.PGUSER,
            host: global.process.env.PGHOST,
            database: global.process.env.PGDATABASE,
            password: global.process.env.PGPASSWORD,
            port: global.process.env.PGPORT,
        });

        this.sequelize = new Sequelize(
            global.process.env.PGDATABASE,
            global.process.env.PGUSER,
            global.process.env.PGPASSWORD,
            {
                host: global.process.env.PGHOST,
                port: global.process.env.PGPORT,
                dialect: "postgres",
            }
        );
    }

    dbConnect() {
        return new Promise((reslove, reject) => {
            this.con
                .connect()
                .then(() => {
                    reslove("Connection to Database successfully.");
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    sequelizeTest() {
        return new Promise((reslove, reject) => {
            this.sequelize
                .authenticate()
                .then(() => {
                    reslove("Connection has been established successfully.");
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}

module.exports = new dbConnect();

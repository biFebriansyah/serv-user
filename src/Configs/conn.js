const { Pool } = require("pg");
const { Sequelize } = require("sequelize");

class dbConnect {
    constructor() {
        this.con = new Pool({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT,
        });

        this.sequelize = new Sequelize(
            process.env.PGDATABASE,
            process.env.PGUSER,
            process.env.PGPASSWORD,
            {
                host: process.env.PGHOST,
                port: process.env.PGPORT,
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

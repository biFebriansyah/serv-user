const sequelize = require("../Configs/conn").sequelize;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const db = require("../Configs/conn");

class Users {
    constructor() {
        this.Users = sequelize.define("users_data", {
            email: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            fullName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            Address: {
                type: Sequelize.STRING,
            },
            Username: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            Password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        });
    }

    commit() {
        return new Promise((reslove, reject) => {
            if (process.env.MODE == "Dev") {
                this.Users.sync()
                    .then(() => {
                        reslove("Commit succsess");
                    })
                    .catch((err) => {
                        reject("Something hapen while commiting \n", err);
                    });
            }
            if (process.env.MODE == "Prod") {
                reject("Youre on mode Production");
            }
        });
    }

    add(data) {
        return new Promise((reslove, reject) => {
            this.Users.create({
                email: data.email,
                fullName: data.fullName,
                Address: data.Address,
                Username: data.Username,
                Password: data.Password,
            })
                .then((res) => {
                    reslove(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    findByWhat(email = "", fullName = "", Address = "") {
        return new Promise((reslove, reject) => {
            let query = "";
            if (email != "" && fullName != "" && Address != "") {
                query = `SELECT * FROM users_data WHERE email = '${fullName}' AND fullName = ${fullName} AND Address = ${Address}`;
            }
            if (email != "") {
                query = `SELECT * FROM users_data WHERE email = '${email}'`;
            }
            if (fullName != "") {
                query = `SELECT * FROM users_data WHERE fullName = '${fullName}'`;
            }
            if (Address != "") {
                query = `SELECT * FROM users_data WHERE Address = ${Address}`;
            }
            console.log(query);
            db.con.query(query, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    reslove(res.rows);
                }
            });
        });
    }

    findAll() {
        return new Promise((reslove, reject) => {
            this.Users.findAll({
                order: [["createdAt", "DESC"]],
            })
                .then((res) => {
                    reslove(res);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    }
}

module.exports = new Users();

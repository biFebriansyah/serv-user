const model = require("../Models/Users")
const response = require("../Helpers/Response")

console.log('hello');

class Users {
    async setUsers(req, res) {
        try {
            const data = {
                email: req.body.email,
                fullName: req.body.fullName,
                Address: req.body.Address,
                Username: req.body.Username,
                Password: req.body.Password,
                RePassword: req.body.RePassword,
            }

            if (data.Password != data.RePassword) {
                return response(res, 400, "Check youre password")
            }

            const result = await model.add(data)
            return response(res, 200, result)
        } catch (error) {
            return response(res, 500, error)
        }
    }

    async commit(req, res) {
        try {
            const result = await model.commit()
            return response(res, 200, result)
        } catch (error) {
            return response(res, 500, error)
        }
    }

    async findAll(req, res) {
        try {
            const { email, fullName, Address } = req.query
            let result = ""
            if (email || fullName || Address) {
                result = await model.findByWhat(email, fullName, Address)
            } else {
                result = await model.findAll()
            }
            return response(res, 200, result)
        } catch (error) {
            return response(res, 500, error)
        }
    }
}

module.exports = new Users()

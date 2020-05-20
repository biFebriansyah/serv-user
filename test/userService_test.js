const sinon = require("sinon");
const chai = require("chai");
const app = require("../app");
const { expect, should } = chai;
const userService = require("../src/Controllers/Users");
const userMoch = require("./data/userMoch.json");
const dataDumy = require("./data/dumy");
const request = require("supertest")(app);

describe("Testing UserService", () => {
    it("Should return all data", async () => {
        sinon.stub(userService, "findAll").returns(userMoch);
        const respone = await userService.findAll();
        expect(respone).to.deep.equal(userMoch);
    });
});

describe("test endpoint /users", () => {
    describe("Get data", () => {
        it("Should return all data users", (done) => {
            request.get("/users").end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an("Object");
                expect(res.body.result).to.be.an("Array");
                done();
            });
        }).timeout(100000);
    });

    describe("Post data", () => {
        it("Should add new data user", (done) => {
            request
                .post("/users")
                .set("Accept", "application/json")
                .send(dataDumy.userData)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an("Object");
                    expect(res.body.result).to.be.an("Object");
                    done();
                });
        }).timeout(100000);
    });
});

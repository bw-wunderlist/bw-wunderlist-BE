const request = require("supertest");
const db = require("../../data/dbConfig.js");
const Users = require("./userModel.js");
const server = require("../../api/server.js");

describe("usersModel", () => {
  afterEach(async () => {
    await db("users").truncate();
  });

  describe("findById()", () => {
    it("should return text/html", async () => {
      const response = await request(server).get("/api/users");
      expect(response.type).toEqual("text/html");
    });
    it.skip("should return user by id", async () => {
      let uid = "DnuzdSXCtMgmRWDCRRE1iQ";
      const user = await Users.findById(uid);
      console.log(user);
      expect(user).toBeDefined();
    });
  });

  //describe("updateById()", async => {
  //it.skip("should update the user info", async () => {});
  //});

  //describe("removeUser()", async => {
  //it.skip("should remove a user", async () => {});
  //});
});

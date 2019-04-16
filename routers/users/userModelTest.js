const request = require("supertest");
const db = require("../../data/dbConfig.js");
const Users = require("./userModel.js");

describe("usersModel", () => {
  afterEach(async () => {
    await db("users").truncate();
  });

  describe("findById()", () => {
    it.skip("should retrieve username, email, imageUrl ", async () => {
      const response = await request(server).get("/api/users");
      expect(response.type).toEqual("application/json");
    });
  });

  describe("updateById()", async => {
    it.skip("should update the user info", async () => {});
  });

  describe("removeUser()", async => {
    it.skip("should remove a user", async () => {});
  });
});

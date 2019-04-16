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
    it("should return user by id", async () => {
      let uid = "DnuzdSXCtMgmRWDCRRE1iQ";
      await db("users").insert({
        uid,
        username: "jenny",
        password: "jenny",
        email: "jenny@test.com"
      });
      const user = await Users.findById(uid);
      console.log(user);
      expect(user).toBeDefined();
    });
  });

  describe("updateById()", () => {
    it("should update the user info", async () => {
      let uid = "DnuzdSXCtMgmRWDCRRE1iQ";
      const sam = await db("users").insert({
        uid,
        username: "sam",
        password: "sam",
        email: "sam@amazon.com"
      });
      console.log(sam);
      const user = await Users.updateById(
        { email: "philip@microsoft.com" },
        uid
      );
      console.log(user);
      expect(user).toEqual(1);
    });
  });

  describe("removeUser()", () => {
    it("should remove a user", async () => {
      let uid = "DnuzdSXCtMgmRWDCRRE1iQ";
      const userGoneTest = await db("users").insert({
        uid,
        username: "jenny",
        password: "jenny",
        email: "jenny@test.com"
      });
      const user = await Users.findById(uid);
      console.log(user);
      const gone = await Users.removeUser(uid);
      console.log(gone);
      expect(gone).toBe(undefined);
    });
  });
});

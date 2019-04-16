const request = require("supertest");
const server = require("../../api/server");

describe("authRouter", () => {
  describe("register", () => {
    it.skip("register a user", async () => {
      const req = await request(server)
        .post("/api/auth/register")
        .send({
          username: "user8",
          password: "password",
          email: "user8@wunderlist.com"
        })
        .set("Accept", "application/json")
        .expect(201);
      console.log(req.status);
    });
  });
});

//TODO; this test past on first attempt and then fails. I believe that is to
//be expected. will check with Maks

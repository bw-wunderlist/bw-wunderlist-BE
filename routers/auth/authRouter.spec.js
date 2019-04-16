const request = require("supertest");
const db = require("../../data/dbConfig.js");
const server = require("../../api/server.js");

describe("authRouter", () => {
  afterEach(async () => {
    await db("users").truncate();
  });

  it(`should return status 404`, async () => {
    const res = await request(server).post("/api/test/register");
    expect(res.status).toBe(404);
  });

  describe("POST to /login if ", () => {
    it(`should return status 404`, async () => {
      const res = await request(server).post("/api/users");
      expect(res.status).toBe(404);
    });

    it(`should return 200 OK`, async () => {});
  });
});

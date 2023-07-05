require("dotenv").config({ path: ".env.local" });

if (!process.env.APP_SECRET) {
  throw new Error("APP_SECRET environment variable is required");
}

process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../server");
const { createToken, hashPassword } = require("../middleware");

const { User } = require("../models");
const { Test } = require("../models");

describe("Test controller test", () => {
  let testUser;
  let testTestExample;
  let testToken;
  let userId;

  beforeAll(async () => {
    testUser = await User.create({
      username: "testuser",
      passwordDigest: await hashPassword("testpassword"),
      DOB: "1999-05-01",
      state: "userstate",
      ZIP: "userZIP",
      firstName: "userfirstname",
      gender: "usergender",
      ethnicity: "userethnicity",
      race: "userrace",
    });

    userId = testUser.id;

    testTestExample = await Test.create({
      userId: userId,
      result: true,
      ZIP: "07302",
      gender: "F",
      ethnicity: "userethnicity",
      race: "userrace",
    });

    testToken = createToken({
      id: testUser.id,
      username: testUser.username,
      DOB: testUser.DOB,
      state: testUser.state,
      ZIP: testUser.ZIP,
      firstName: testUser.firstName,
      gender: testUser.gender,
      ethnicity: testUser.ethnicity,
      race: testUser.race,
    });
  });

  test("Create test", async () => {
    const response = await request(app)
      .post("/api/test")
      .set("Authorization", `Bearer ${testToken}`)
      .send({
        result: false,
        ZIP: "16302",
        gender: "M",
        ethnicity: "userethnicity",
        race: "userrace",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.test.result).toBe(false);
    expect(response.body.test.ZIP).toBe("16302");
    expect(response.body.test.gender).toBe("M");
    expect(response.body.test.ethnicity).toBe("userethnicity");
    expect(response.body.test.race).toBe("userrace");
  });

  test("Get all tests", async () => {
    const response = await request(app)
      .get("/api/test")
      .set("Authorization", `Bearer ${testToken}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.tests)).toBeTruthy();
    expect(response.body.tests.length).toBeGreaterThan(0);
  });

  test("get test by id", async () => {
    const response = await request(app)
      .get(`/api/test/${testTestExample.id}`)
      .set("Authorization", `Bearer ${testToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.test.result).toBe(true);
    expect(response.body.test.ZIP).toBe("07302");
    expect(response.body.test.gender).toBe("F");
    expect(response.body.test.ethnicity).toBe("userethnicity");
    expect(response.body.test.race).toBe("userrace");
  });

  test("update test", async () => {
    const response = await request(app)
      .put(`/api/test/${testTestExample.id}`)
      .set("Authorization", `Bearer ${testToken}`)
      .send({
        result: false,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.test.result).toBe(false);
  });

  test("delete test", async () => {
    const response = await request(app)
      .delete(`/api/test/${testTestExample.id}`)
      .set("Authorization", `Bearer ${testToken}`);

    expect(response.statusCode).toBe(204);
  });

  afterAll(async () => {
    try {
      await User.destroy({ truncate: { cascade: true } });
      await Test.destroy({ truncate: { cascade: true } });
    } catch (error) {
      console.error("Error cleaning up test data", error);
    }
  });
});

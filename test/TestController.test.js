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

    testTestExample = await User.create({
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
  test("get test by id", async () => {
    const response = await request(app)
      .get(`/api/test/${testUser.id}`)
      .set("Authorization", `Bearer ${testToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.user.username).toBe("testuser");
    expect(response.body.user.DOB).toBe("1999-05-01");
    expect(response.body.user.state).toBe("userstate");
    expect(response.body.user.ZIP).toBe("userZIP");
    expect(response.body.user.firstName).toBe("userfirstname");
    expect(response.body.user.gender).toBe("usergender");
    expect(response.body.user.ethnicity).toBe("userethnicity");
    expect(response.body.user.race).toBe("userrace");
  });
});

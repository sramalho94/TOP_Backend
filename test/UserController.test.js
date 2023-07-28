require("dotenv").config({ path: ".env.local" });

if (!process.env.APP_SECRET) {
  throw new Error("APP_SECRET environment variable is required");
}

process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../server");
const { createToken, hashPassword } = require("../middleware");
const { User } = require("../models");

describe("User controller test", () => {
  let testUser;
  let testToken;

  beforeAll(async () => {
    testUser = await User.create({
      username: "testuser",
      passwordDigest: await hashPassword("testpassword"),
      DOB: "1999-05-01",
      email: "test@rcbd.org",
      state: "userstate",
      ZIP: "userZIP",
      firstName: "userfirstname",
      gender: "usergender",
      ethnicity: "userethnicity",
      race: "userrace",
    });

    testToken = createToken({
      id: testUser.id,
      username: testUser.username,
      DOB: testUser.DOB,
      email: testUser.email,
      state: testUser.state,
      ZIP: testUser.ZIP,
      firstName: testUser.firstName,
      gender: testUser.gender,
      ethnicity: testUser.ethnicity,
      race: testUser.race,
    });
  });

  test("get user by id", async () => {
    const response = await request(app)
      .get(`/api/users/${testUser.id}`)
      .set("Authorization", `Bearer ${testToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.user.username).toBe("testuser");
    expect(response.body.user.DOB).toBe("1999-05-01");
    expect(response.body.user.email).toBe("test@rcbd.org");
    expect(response.body.user.state).toBe("userstate");
    expect(response.body.user.ZIP).toBe("userZIP");
    expect(response.body.user.firstName).toBe("userfirstname");
    expect(response.body.user.gender).toBe("usergender");
    expect(response.body.user.ethnicity).toBe("userethnicity");
    expect(response.body.user.race).toBe("userrace");
  });

  test("update user", async () => {
    const response = await request(app)
      .put(`/api/users/${testUser.id}`)
      .set("Authorization", `Bearer ${testToken}`)
      .send({
        username: "update username",
        firstName: "update firstname",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.user.username).toBe("update username");
    expect(response.body.user.firstName).toBe("update firstname");
  });

  test("delete user", async () => {
    const response = await request(app)
      .delete(`/api/users/${testUser.id}`)
      .set("Authorization", `Bearer ${testToken}`);

    expect(response.statusCode).toBe(204);
  });

  afterAll(async () => {
    try {
      await User.destroy({ truncate: { cascade: true } });
    } catch (error) {
      console.error("Error cleaning up test data", error);
    }
  });
});

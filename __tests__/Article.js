const supertest = require("supertest");
const app = require("../app.js");
const FixtureLoader = require("../features/utils/FixtureLoader.js");
const { sequelize } = require("../models");
const request = supertest(app);
const fs = require("fs/promises");

beforeAll(async () => {
  sequelize.constructor._cls = new Map();
});

beforeEach(async () => {
  const trx = await sequelize.transaction();
  sequelize.constructor._cls.set("transaction", trx);
});
afterEach(async () => {
  await sequelize.constructor._cls.get("transaction").rollback();
});

afterAll(() => {
  sequelize.close();
});

describe("Article routes", () => {
  it("should return all articles with empty array", async () => {
    const response = await request.get("/articles").send();
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(0);
  });
  it("should create a product", async () => {
    const response = await request
      .post("/articles")
      .set("Content-Type", "application/json")
      .send({
        name: "Article 1",
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name", "Article 1");
  });
  it("should return all articles with data", async () => {
    await FixtureLoader(
      await fs.realpath(__dirname + "/../features/fixtures/article.json")
    );
    const response = await request.get("/articles").send();
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(3);
  });
});

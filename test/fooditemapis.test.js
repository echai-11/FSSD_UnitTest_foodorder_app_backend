const chai = require("chai");
const request = require("supertest");

const expect = chai.expect;
const { app } = require("../server");
const FooditemModel = require("../app/models/fooditemModel");

const originalConsoleLog = console.log;
const originalConsoleError = console.error;

context("Fooditem APIs Test", () => {
  var sessionToken;
  before(async () => {
    console.log = function () {};
    console.error = function () {};

    await FooditemModel.deleteMany();
    let credentials = {
      username: "testuser",
      password: "testpassword",
    };
    const res = await request(app)
      .post("/api/v1/users/login")
      .send(credentials);

    sessionToken = res.body.data.sessionToken;
  });

  after(async () => {
    console.log = originalConsoleLog;
    console.error = originalConsoleError;
  });

  const testFooditem = {
    name: "testFooditem",
    description: "Test Fooditem description",
    image: "Test Fooditem Image URL",
    categoryId: "66fe9f36e0761fcd18685196",
    cuisineId: "66fe9fd54edd67cf25d2bf6c",
    isVeg: false,
  };

  describe("POST /api/v1/fooditems", async () => {
    it("should add a new cuisine with session token", async () => {
      const res = await request(app)
        .post("/api/v1/fooditems/")
        .set("Authorization", `Bearer ${sessionToken}`)
        .send(testFooditem);

      expect(res.status).to.equal(201);
      expect(res.body.message).to.equal("Fooditem created successfully");
    });

    it("should return 401 incase token is not provided in request", async () => {
      const res = await request(app)
        .post("/api/v1/fooditems/")
        .send(testFooditem);

      expect(res.status).to.equal(401);
      expect(res.body.message).to.equal("Not authorized");
    });
  });

  describe("GET /api/v1/fooditems", async () => {
    it("should get all fooditems using GET request", async () => {
      const res = await request(app)
        .get("/api/v1/fooditems/")
        .set("Authorization", `Bearer ${sessionToken}`);

      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal("Successfully fetched all fooditems.");
    });
  });
});

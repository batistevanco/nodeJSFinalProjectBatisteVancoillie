const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");

describe("Auth API", () => {

    it("should register a new user", async () => {
        const res = await request(app).post("/api/auth/register").send({
            name: "Test User",
            email: "testuser123@email.com",
            password: "123456"
        });

        expect(res.statusCode).toBe(201);
    });

    it("should login a user", async () => {
        const res = await request(app).post("/api/auth/login").send({
            email: "testuser123@email.com",
            password: "123456"
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();
    });

});

afterAll(async () => {
    await mongoose.connection.close();
});
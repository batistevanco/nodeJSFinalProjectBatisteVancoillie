const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const app = require("../app");
const User = require("../models/user");

let mongoServer;

beforeAll(async () => {
    process.env.JWT_SECRET = "testsecret";

    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri);
});

beforeEach(async () => {
    await User.deleteMany({});
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
});

describe("Auth API", () => {

    it("should register a new user", async () => {
        const res = await request(app).post("/api/auth/register").send({
            name: "Test User",
            email: "testuser123@email.com",
            password: "123456"
        });

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe("User created successfully");
    });

    it("should not register a user with invalid data", async () => {
        const res = await request(app).post("/api/auth/register").send({
            name: "A",
            email: "not-an-email",
            password: "123"
        });

        expect(res.statusCode).toBe(400);
    });

    it("should login a user", async () => {
        await request(app).post("/api/auth/register").send({
            name: "Test User",
            email: "testuser123@email.com",
            password: "123456"
        });

        const res = await request(app).post("/api/auth/login").send({
            email: "testuser123@email.com",
            password: "123456"
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();
    });

    it("should not login with wrong password", async () => {
        await request(app).post("/api/auth/register").send({
            name: "Test User",
            email: "testuser123@email.com",
            password: "123456"
        });

        const res = await request(app).post("/api/auth/login").send({
            email: "testuser123@email.com",
            password: "wrongpassword"
        });

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("Invalid credentials");
    });

    it("should return current user on /me with valid token", async () => {
        await request(app).post("/api/auth/register").send({
            name: "Test User",
            email: "testuser123@email.com",
            password: "123456"
        });

        const loginRes = await request(app).post("/api/auth/login").send({
            email: "testuser123@email.com",
            password: "123456"
        });

        const token = loginRes.body.token;

        const res = await request(app)
            .get("/api/auth/me")
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.user).toBeDefined();
        expect(res.body.user.email).toBe("testuser123@email.com");
    });

    it("should deny access to /me without token", async () => {
        const res = await request(app).get("/api/auth/me");

        expect(res.statusCode).toBe(401);
    });

});

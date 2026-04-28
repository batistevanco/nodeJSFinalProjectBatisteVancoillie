const request = require("supertest");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { MongoMemoryServer } = require("mongodb-memory-server");

const app = require("../app");
const User = require("../models/user");
const Team = require("../models/team");
const Race = require("../models/race");
const Registration = require("../models/registration");

let mongoServer;
let adminToken;
let userToken;
let otherUserToken;
let adminUser;
let normalUser;
let otherUser;
let team;
let race;
let registration;

const login = async (email) => {
    const res = await request(app).post("/api/auth/login").send({
        email,
        password: "123456"
    });

    return res.body.token;
};

beforeAll(async () => {
    process.env.JWT_SECRET = "testsecret";

    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
});

beforeEach(async () => {
    await Registration.deleteMany({});
    await Race.deleteMany({});
    await Team.deleteMany({});
    await User.deleteMany({});

    const hashedPassword = await bcrypt.hash("123456", 10);

    adminUser = await User.create({
        name: "Admin User",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin"
    });

    normalUser = await User.create({
        name: "Normal User",
        email: "user@example.com",
        password: hashedPassword
    });

    otherUser = await User.create({
        name: "Other User",
        email: "other@example.com",
        password: hashedPassword
    });

    team = await Team.create({
        name: "Ferrari",
        country: "Italy"
    });

    race = await Race.create({
        name: "Spa GP",
        track: "Spa-Francorchamps",
        date: new Date("2026-09-01"),
        team: team._id
    });

    registration = await Registration.create({
        user: normalUser._id,
        race: race._id,
        position: 1
    });

    adminToken = await login("admin@example.com");
    userToken = await login("user@example.com");
    otherUserToken = await login("other@example.com");
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
});

describe("Authorization and linked data integration", () => {
    it("denies admin-only user routes to regular users", async () => {
        const res = await request(app)
            .get("/api/users")
            .set("Authorization", `Bearer ${userToken}`);

        expect(res.statusCode).toBe(403);
    });

    it("prevents a regular user from elevating their own role", async () => {
        const res = await request(app)
            .put(`/api/users/${normalUser._id}`)
            .set("Authorization", `Bearer ${userToken}`)
            .send({ role: "admin" });

        expect(res.statusCode).toBe(200);
        expect(res.body.role).toBe("user");

        const userInDb = await User.findById(normalUser._id);
        expect(userInDb.role).toBe("user");
    });

    it("returns 400 for invalid ObjectIds before database reads", async () => {
        const res = await request(app)
            .get("/api/users/not-a-valid-id")
            .set("Authorization", `Bearer ${adminToken}`);

        expect(res.statusCode).toBe(400);
    });

    it("rejects races that reference a non-existing team", async () => {
        const missingTeamId = new mongoose.Types.ObjectId();

        const res = await request(app)
            .post("/api/races")
            .set("Authorization", `Bearer ${adminToken}`)
            .send({
                name: "Monaco GP",
                track: "Monaco",
                date: "2026-05-24",
                team: missingTeamId.toString()
            });

        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe("Team not found");
    });

    it("prevents regular users from creating registrations for another user", async () => {
        const res = await request(app)
            .post("/api/registrations")
            .set("Authorization", `Bearer ${userToken}`)
            .send({
                user: otherUser._id.toString(),
                race: race._id.toString(),
                position: 2
            });

        expect(res.statusCode).toBe(403);
    });

    it("allows admins to create registrations for any user", async () => {
        const res = await request(app)
            .post("/api/registrations")
            .set("Authorization", `Bearer ${adminToken}`)
            .send({
                user: otherUser._id.toString(),
                race: race._id.toString(),
                position: 2
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.user.email).toBe("other@example.com");
    });

    it("prevents regular users from reading another user's registration", async () => {
        const res = await request(app)
            .get(`/api/registrations/${registration._id}`)
            .set("Authorization", `Bearer ${otherUserToken}`);

        expect(res.statusCode).toBe(403);
    });

    it("filters registration lists for regular users", async () => {
        await Registration.create({
            user: otherUser._id,
            race: race._id,
            position: 4
        });

        const res = await request(app)
            .get("/api/registrations")
            .set("Authorization", `Bearer ${userToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveLength(1);
        expect(res.body[0].user.email).toBe("user@example.com");
    });
});

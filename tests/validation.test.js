const {
    userValidation,
    userUpdateValidation,
    raceValidation,
    registrationValidation
} = require("../validation/generalValidation");

const { registerValidation, loginValidation } = require("../validation/authValidation");

describe("Joi validation", () => {
    it("accepts valid register input", () => {
        const { error } = registerValidation({
            name: "Test User",
            email: "test@example.com",
            password: "123456"
        });

        expect(error).toBeUndefined();
    });

    it("rejects invalid login input", () => {
        const { error } = loginValidation({
            email: "not-an-email",
            password: ""
        });

        expect(error).toBeDefined();
    });

    it("rejects users with invalid roles", () => {
        const { error } = userValidation({
            name: "Test User",
            email: "test@example.com",
            password: "123456",
            role: "superadmin"
        });

        expect(error).toBeDefined();
    });

    it("rejects empty user updates", () => {
        const { error } = userUpdateValidation({});

        expect(error).toBeDefined();
    });

    it("requires a team reference when creating a race", () => {
        const { error } = raceValidation({
            name: "Spa GP",
            track: "Spa-Francorchamps",
            date: "2026-09-01"
        });

        expect(error).toBeDefined();
    });

    it("requires linked user and race ids for registrations", () => {
        const { error } = registrationValidation({
            position: 1
        });

        expect(error).toBeDefined();
    });
});

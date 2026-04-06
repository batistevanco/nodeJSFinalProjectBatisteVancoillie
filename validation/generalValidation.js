const Joi = require("joi");

const userValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        role: Joi.string().valid("user", "admin").optional()
    });

    return schema.validate(data);
};

const userUpdateValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).optional(),
        email: Joi.string().email().optional(),
        password: Joi.string().min(6).optional(),
        role: Joi.string().valid("user", "admin").optional()
    }).min(1);

    return schema.validate(data);
};

const teamValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        country: Joi.string().required()
    });

    return schema.validate(data);
};

const teamUpdateValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().optional(),
        country: Joi.string().optional()
    }).min(1);

    return schema.validate(data);
};

const raceValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        track: Joi.string().required(),
        date: Joi.date().required(),
        team: Joi.string().required()
    });

    return schema.validate(data);
};

const raceUpdateValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().optional(),
        track: Joi.string().optional(),
        date: Joi.date().optional(),
        team: Joi.string().optional()
    }).min(1);

    return schema.validate(data);
};

const registrationValidation = (data) => {
    const schema = Joi.object({
        user: Joi.string().required(),
        race: Joi.string().required(),
        position: Joi.number().optional()
    });

    return schema.validate(data);
};

const registrationUpdateValidation = (data) => {
    const schema = Joi.object({
        user: Joi.string().optional(),
        race: Joi.string().optional(),
        position: Joi.number().optional()
    }).min(1);

    return schema.validate(data);
};

module.exports = {
    userValidation,
    userUpdateValidation,
    teamValidation,
    teamUpdateValidation,
    raceValidation,
    raceUpdateValidation,
    registrationValidation,
    registrationUpdateValidation
};

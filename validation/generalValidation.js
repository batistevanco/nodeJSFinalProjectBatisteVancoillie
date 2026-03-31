const Joi = require("joi");

const userValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });

    return schema.validate(data);
};

const teamValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        country: Joi.string().required()
    });

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

const registrationValidation = (data) => {
    const schema = Joi.object({
        user: Joi.string().required(),
        race: Joi.string().required(),
        position: Joi.number().optional()
    });

    return schema.validate(data);
};

module.exports = {
    userValidation,
    teamValidation,
    raceValidation,
    registrationValidation
};
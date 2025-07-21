import Joi from "joi";

export const Register_Validation = Joi.object({
    name: Joi.string().alphanum().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/[0-9a-zA-Z]*\d[0-9a-zA-Z]*/).min(4).required(),
});

export const Login_validation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
});

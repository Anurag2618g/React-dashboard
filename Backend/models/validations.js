import Joi from "joi";

export const Register_Validation = Joi.object({
    name: Joi.string().alphanum().min(4).required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/[0-9a-zA-Z]*\d[0-9a-zA-Z]*/).min(6).required(),
});

export const Login_validation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(6).required(),
});

// const { error } = Login_validation.validate({ email: "invalid", password: "123" });

// console.dir(error);

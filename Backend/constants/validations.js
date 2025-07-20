import Joi from "joi";

export const User_validation = Joi.object({
    name: Joi.string().min(4),
    email: Joi.string().email(),
})
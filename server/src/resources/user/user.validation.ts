import Joi from "joi";

const register = Joi.object({
  username: Joi.string().min(4).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(80).required(),
});

const login = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export default { register, login };

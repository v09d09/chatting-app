"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const register = joi_1.default.object({
    username: joi_1.default.string().min(4).max(30).required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(8).max(80).required(),
});
const login = joi_1.default.object({
    username: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
});
exports.default = { register, login };

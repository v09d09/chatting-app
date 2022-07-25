"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("./user.model"));
const token_1 = __importDefault(require("../../utils/token"));
class UserService {
    constructor() {
        this.user = user_model_1.default;
    }
    register(username, email, password, role) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(username, email, password, role);
                const user = yield this.user.create({
                    username,
                    email,
                    password,
                    role,
                });
                const accessToken = token_1.default.createToken(user);
                return accessToken;
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errMessage = "Wrong username or password";
                const user = yield this.user.findOne({ username });
                if (!user) {
                    throw new Error(errMessage);
                }
                if (yield user.isValidPassword(password)) {
                    return token_1.default.createToken(user);
                }
                else {
                    throw new Error(errMessage);
                }
            }
            catch (e) {
                throw new Error("Unable to authenticate");
            }
        });
    }
}
exports.default = UserService;

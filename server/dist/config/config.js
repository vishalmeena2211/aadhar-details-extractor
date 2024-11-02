"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    PORT: process.env.PORT,
    CORS_URL_1: process.env.CORS_URL_1,
    MONGO_URL: process.env.MONGO_URL,
    CORS_URL_2: process.env.CORS_URL_2,
    NODE_ENV: process.env.NODE_ENV
};
//# sourceMappingURL=config.js.map
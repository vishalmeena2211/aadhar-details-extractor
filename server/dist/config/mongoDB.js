"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
dotenv_1.default.config();
const connectDB = async () => {
    try {
        const MONGO_URL = config_1.config.MONGO_URL;
        if (!MONGO_URL) {
            throw new Error("MONGO_URL is not defined in environment variables.");
        }
        await mongoose_1.default.connect(MONGO_URL, {
            dbName: "aadhar-data"
        });
        console.log("database Connected");
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};
exports.default = connectDB;
//# sourceMappingURL=mongoDB.js.map
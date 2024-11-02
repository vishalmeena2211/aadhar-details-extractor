"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTextFromImage = void 0;
const tesseract_js_1 = __importDefault(require("tesseract.js"));
const extractTextFromImage = async (buffer) => {
    try {
        const { data: { text } } = await tesseract_js_1.default.recognize(buffer, 'eng');
        return text;
    }
    catch (error) {
        console.error('Error during OCR:', error);
        throw error;
    }
};
exports.extractTextFromImage = extractTextFromImage;
//# sourceMappingURL=tesseract.js.map
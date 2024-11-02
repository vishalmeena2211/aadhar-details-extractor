"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const extractAdharInfo_1 = require("../utils/extractAdharInfo");
const tesseract_1 = require("../utils/tesseract");
const aadharRepository_1 = __importDefault(require("../repository/aadharRepository"));
const aadahrRepo = new aadharRepository_1.default();
class Controller {
    constructor() {
        this.postAadhaar = async (req, res) => {
            try {
                const files = req.files;
                if (!files) {
                    res.status(400).json({ status: false, message: "No files were uploaded." });
                    return;
                }
                const frontImage = files['frontImage']?.[0];
                const backImage = files['backImage']?.[0];
                if (!frontImage || !backImage) {
                    res.status(400).json({ status: false, message: "Both front side and backside images are required." });
                    return;
                }
                const frontImageText = await (0, tesseract_1.extractTextFromImage)(frontImage.buffer);
                const backImageText = await (0, tesseract_1.extractTextFromImage)(backImage.buffer);
                const extractedInfo = (0, extractAdharInfo_1.extractAadhaarInfo)(frontImageText, backImageText);
                if (extractedInfo) {
                    await aadahrRepo.createAadharDoc(extractedInfo);
                    res.status(200).json({ status: true, data: extractedInfo, message: "Parsing successful" });
                }
                else {
                    res.status(400).json({ status: false, message: "Failed to extract information" });
                }
            }
            catch (error) {
                console.error('Error parsing Aadhaar:', error);
                res.status(500).json({ status: false, message: 'Error parsing Aadhaar' });
            }
        };
    }
}
exports.default = Controller;
//# sourceMappingURL=ocrController.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aadharModel_1 = __importDefault(require("../models/aadharModel"));
class aadharRepository {
    constructor() {
        this.createAadharDoc = async (data) => {
            try {
                const existingAadharDoc = await aadharModel_1.default.findOne({
                    aadharNumber: data.aadhaarNumber,
                });
                // If a document is found, return the existing document
                if (existingAadharDoc) {
                    console.log(`Aadhar document already exists for aadharNumber: ${data.aadhaarNumber}`);
                    return existingAadharDoc.toObject();
                }
                // If no document is found, create a new instance and save it
                const newAadharDoc = new aadharModel_1.default(data);
                const savedAadharDoc = await newAadharDoc.save();
                // Return the newly created document
                return savedAadharDoc.toObject();
            }
            catch (err) {
                console.error(`Error in db op: ${err}`);
                return null;
            }
        };
    }
}
exports.default = aadharRepository;
//# sourceMappingURL=aadharRepository.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ocrController_1 = __importDefault(require("../controllers/ocrController"));
const multer_1 = __importDefault(require("../utils/multer"));
const controller = new ocrController_1.default();
const router = express_1.default.Router();
router.post('/parse-aadhar', multer_1.default.fields([{ name: 'frontImage' }, { name: "backImage" }]), controller.postAadhaar);
exports.default = router;
//# sourceMappingURL=routes.js.map
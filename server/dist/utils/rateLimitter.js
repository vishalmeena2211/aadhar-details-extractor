"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.limiter = void 0;
const express_rate_limit_1 = require("express-rate-limit");
exports.limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000,
    limit: 1000,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
});
//# sourceMappingURL=rateLimitter.js.map
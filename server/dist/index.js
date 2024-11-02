"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const config_1 = require("./config/config");
const mongoDB_1 = __importDefault(require("./config/mongoDB"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const rateLimitter_1 = require("./utils/rateLimitter");
const port = Number(config_1.config.PORT);
// const app=new App()
// app.startServer(port)
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const corsOptions = {
    origin: config_1.config.NODE_ENV === 'PROD' ? config_1.config.CORS_URL_1 : config_1.config.CORS_URL_2,
    credentials: true
};
app.use(express_1.default.json({ limit: "50mb" }));
app.use((0, cors_1.default)(corsOptions));
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use((0, cookie_parser_1.default)());
app.use('/api/v1/', routes_1.default);
app.use(rateLimitter_1.limiter);
app.use((req, res, next) => {
    res.status(500).send('Something broke!');
});
(0, mongoDB_1.default)();
server.listen(port, () => {
    console.log(`server is running  http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map
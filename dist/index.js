"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const sql = require('mysql');
const server = server_1.default.instance;
// Para las rutas
const router_1 = __importDefault(require("./consultas/router"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
//////// Utilidades ////////
server.app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
server.app.use(body_parser_1.default.json({ limit: '50mb' }));
server.app.use((0, cors_1.default)({ origin: true, credentials: true }));
//// Rutas de servicios ////
server.app.use('/', router_1.default);
server.start(() => {
    console.log(`Servidor corriendo en el puerto ${server.port}`);
});
//# sourceMappingURL=index.js.map
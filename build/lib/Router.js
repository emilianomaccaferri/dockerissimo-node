"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Router_app;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet = require('helmet');
const fileUpload = require('express-fileupload');
const cookiep = require('cookie-parser');
const body = require("body-parser");
const cors = require("cors");
const HTTPError_1 = __importDefault(require("./HTTPError"));
class Router {
    constructor() {
        _Router_app.set(this, void 0);
        __classPrivateFieldSet(this, _Router_app, (0, express_1.default)(), "f");
    }
    init() {
        __classPrivateFieldGet(this, _Router_app, "f").use(helmet());
        /*this.#app.use(cors({
            credentials: true,
            withCredentials: true,
            origin: [''],
            allowedHeaders: ['Authorization', 'authorization', 'Content-type', 'content-type'],
            methods: ['GET', 'POST', 'DELETE', 'PUT']
        }))*/
        __classPrivateFieldGet(this, _Router_app, "f").use(fileUpload({ createParentPath: true, abortOnLimit: '20m', useTempFiles: true, tempFileDir: './tmp' }));
        __classPrivateFieldGet(this, _Router_app, "f").enable("trust proxy");
        __classPrivateFieldGet(this, _Router_app, "f").disable("x-powered-by");
        __classPrivateFieldGet(this, _Router_app, "f").use(cookiep());
        __classPrivateFieldGet(this, _Router_app, "f").use(body.json({ limit: "20mb" }));
        __classPrivateFieldGet(this, _Router_app, "f").use(body.urlencoded({ limit: "20mb", extended: true, parameterLimit: 100 }));
        __classPrivateFieldGet(this, _Router_app, "f").use('/public', express_1.default.static('./public'));
        __classPrivateFieldGet(this, _Router_app, "f").use('/', require("./routes/main")); // possiamo fare sta cosa del require perché tanto quando viene chiamato il file è già in .js
        __classPrivateFieldGet(this, _Router_app, "f").listen(process.env.PORT);
        __classPrivateFieldGet(this, _Router_app, "f").all('*', (req, res) => {
            return HTTPError_1.default.NOT_FOUND.toResponse(res);
        });
        console.log(`listening on ${process.env.PORT}`);
        console.log(`live on ${process.env.URI}`);
    }
}
exports.default = Router;
_Router_app = new WeakMap();

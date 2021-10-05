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
var _RClient_port, _RClient_client, _RClient_host;
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = __importDefault(require("redis"));
class RClient {
    constructor(port, host = 'redis') {
        _RClient_port.set(this, 6379);
        _RClient_client.set(this, void 0);
        _RClient_host.set(this, void 0);
        __classPrivateFieldSet(this, _RClient_port, port, "f");
        __classPrivateFieldSet(this, _RClient_host, host, "f");
        __classPrivateFieldSet(this, _RClient_client, redis_1.default.createClient({
            host: __classPrivateFieldGet(this, _RClient_host, "f"),
            port: __classPrivateFieldGet(this, _RClient_port, "f")
        }), "f");
    }
    get redis() {
        return __classPrivateFieldGet(this, _RClient_client, "f");
    }
    get(key_type, key) {
        return new Promise((resolve, reject) => {
            __classPrivateFieldGet(this, _RClient_client, "f").get(`${key_type}-${key}`, (err, res) => {
                if (err)
                    return reject(err);
                return resolve(res);
            });
        });
    }
    set(key_type, key, value) {
        return new Promise((resolve, reject) => {
            __classPrivateFieldGet(this, _RClient_client, "f").set(`${key_type}-${key}`, value, 'EX', parseInt(process.env.REDIS_KEY_EXPIRE_TIME_SECONDS || "180"), (err, res) => {
                if (err)
                    return reject(err);
                return resolve(res);
            });
        });
    }
}
_RClient_port = new WeakMap(), _RClient_client = new WeakMap(), _RClient_host = new WeakMap();
const client = new RClient(parseInt(process.env.REDIS_PORT || "6379"));
exports.default = client;

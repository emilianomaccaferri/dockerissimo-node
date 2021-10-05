"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.debufferize = exports.core = void 0;
const mysql2_1 = __importStar(require("mysql2"));
class Db {
    constructor() {
        this.pool = undefined;
    }
    init() {
        if (this.pool !== undefined)
            return;
        this.pool = (0, mysql2_1.createPool)({
            host: process.env.MYSQL_HOST,
            database: process.env.MYSQL_DATABASE,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            multipleStatements: true
        });
    }
    query(query, options = {}, buffered_results = false) {
        return new Promise((resolve, reject) => {
            this.pool.query(query, options, function (err, results, fields) {
                if (err)
                    return reject(err);
                if (buffered_results)
                    results = (0, exports.debufferize)(results);
                return resolve({
                    results,
                    fields
                });
            });
        });
    }
}
exports.default = new Db();
exports.core = mysql2_1.default;
const debufferize = (rows) => {
    let new_rows = rows.map(result => {
        let keys = Object.keys(result);
        keys.forEach(key => {
            if (result[key] instanceof Buffer)
                result[key] = result[key].toString();
        });
        return result;
    });
    return new_rows;
};
exports.debufferize = debufferize;

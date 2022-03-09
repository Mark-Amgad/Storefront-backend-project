"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1.default.config();
var host = process.env.POSTGRES_HOST;
var user = process.env.POSTGRES_USER;
var pass = process.env.POSTGRES_PASSWORD;
var database = process.env.POSTGRES_DB;
var database_test = process.env.POSTGRES_DB_TEST;
var target_db = process.env.ENV;
var db;
if (target_db === "dev") {
    db = new pg_1.Pool({ host: host, user: user, password: pass, database: database });
}
else if (target_db === "test") {
    db = new pg_1.Pool({ host: host, user: user, password: pass, database: database_test });
}
exports.default = db;

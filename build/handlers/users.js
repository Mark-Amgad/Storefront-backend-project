"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationMiddleWare = void 0;
var user_1 = require("../models/user");
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var indexHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_store, result, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user_store = new user_1.UserStore();
                return [4 /*yield*/, user_store.index()];
            case 1:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.log("handler - users - error");
                res.json(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var createHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_store, u, salt, saltRound, pepper, hashed_password, result, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user_store = new user_1.UserStore();
                u = {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    password: req.body.password
                };
                salt = process.env.PASS_SALT;
                saltRound = parseInt(salt);
                pepper = process.env.PASS_PEPPER;
                hashed_password = bcrypt_1.default.hashSync(u.password + pepper, saltRound);
                u.password = hashed_password;
                return [4 /*yield*/, user_store.create(u)];
            case 1:
                result = _a.sent();
                res.json(result).status(200);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                console.log("handlers - users-create - error");
                console.log(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var showHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_store, id, result, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user_store = new user_1.UserStore();
                id = parseInt(req.params.id);
                return [4 /*yield*/, user_store.show(id)];
            case 1:
                result = _a.sent();
                res.json(result).status(200);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                console.log("handlers - users - error");
                res.json(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var logInHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, password, pepper, user_store, userRealData, userRealPassword, validLogIn, key, token, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = parseInt(req.body.id);
                password = req.body.password;
                pepper = process.env.PASS_PEPPER;
                password += pepper;
                user_store = new user_1.UserStore();
                return [4 /*yield*/, user_store.show(id)];
            case 1:
                userRealData = _a.sent();
                userRealPassword = userRealData["password"];
                validLogIn = bcrypt_1.default.compareSync(password, userRealPassword);
                if (validLogIn) // valid login with the correct password
                 {
                    key = process.env.JWT_KEY;
                    token = jsonwebtoken_1.default.sign({
                        user_id: userRealData.id,
                        user_first_name: userRealData.first_name,
                        user_last_name: userRealData.last_name
                    }, key);
                    // how to save token in user data
                    return [2 /*return*/, res.cookie("token", token).send("logged in").status(200)];
                }
                else {
                    res.send("Wrong password").status(200);
                }
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.json(err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var authenticationMiddleWare = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token, key, verify;
    return __generator(this, function (_a) {
        try {
            token = req.cookies.token;
            key = process.env.JWT_KEY;
            verify = jsonwebtoken_1.default.verify(token, key);
            next();
        }
        catch (err) {
            res.send("You don't have the authority to come here");
        }
        return [2 /*return*/];
    });
}); };
exports.authenticationMiddleWare = authenticationMiddleWare;
var logOutHandler = function (req, res) {
    res.clearCookie("token").send("Logged out !");
};
var usersHandler = function (app) {
    app.get("/users/mytoken", function (req, res) { res.send(req.cookies.token); });
    app.get("/users/index", exports.authenticationMiddleWare, indexHandler);
    app.get("/users/show/:id", showHandler);
    app.post("/users/create", createHandler);
    app.post("/users/login", logInHandler);
    app.get("/users/logout", logOutHandler);
};
exports.default = usersHandler;

"use strict";
// this service will allow user to add a product into his order
// (the user_id of the order must be his id)
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
var database_1 = __importDefault(require("../database"));
var users_1 = require("../handlers/users");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var addProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order_id, product_id, quantity, token, decoded, user_id, connection, query, result, logged_user_id, query_1, result_1, err_1, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 9, , 10]);
                order_id = parseInt(req.body.order_id);
                product_id = parseInt(req.body.product_id);
                quantity = parseInt(req.body.quantity);
                token = req.cookies.token;
                decoded = jsonwebtoken_1.default.verify(token, (process.env.JWT_KEY));
                user_id = decoded.user_id;
                return [4 /*yield*/, database_1.default.connect()];
            case 1:
                connection = _a.sent();
                query = "SELECT * FROM orders WHERE id=($1)";
                return [4 /*yield*/, connection.query(query, [order_id])];
            case 2:
                result = _a.sent();
                if (result.rows.length == 0) {
                    return [2 /*return*/, res.json("wrong order id")];
                }
                logged_user_id = result.rows[0].user_id;
                if (!(logged_user_id === user_id)) return [3 /*break*/, 7];
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                query_1 = "INSERT INTO order_products (order_id,product_id,quantity) VALUES ($1,$2,$3) RETURNING *";
                return [4 /*yield*/, database_1.default.query(query_1, [order_id, product_id, quantity])];
            case 4:
                result_1 = _a.sent();
                res.json(result_1.rows[0]).status(200);
                return [3 /*break*/, 6];
            case 5:
                err_1 = _a.sent();
                res.json("wrong order data");
                return [3 /*break*/, 6];
            case 6: return [3 /*break*/, 8];
            case 7:
                res.json("You don't have access to add to this order because you are not the user that made this order").status(200);
                _a.label = 8;
            case 8:
                connection.release();
                return [3 /*break*/, 10];
            case 9:
                err_2 = _a.sent();
                console.log(err_2);
                res.send(err_2).json("error in addProduct service");
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
var addPrdouctService = function (app) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        app.post("/service/add", users_1.authenticationMiddleWare, addProduct);
        return [2 /*return*/];
    });
}); };
exports.default = addPrdouctService;

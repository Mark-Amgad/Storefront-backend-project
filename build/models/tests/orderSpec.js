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
var order_1 = require("../order");
var user_1 = require("../user");
var product_1 = require("../product");
var database_1 = __importDefault(require("../../database"));
describe("order model test cases :", function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var connection, query;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    connection = _a.sent();
                    query = "DELETE FROM orders";
                    connection.query(query);
                    connection.release();
                    return [2 /*return*/];
            }
        });
    }); });
    afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var connection, query;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    connection = _a.sent();
                    query = "DELETE FROM orders";
                    connection.query(query);
                    connection.release();
                    return [2 /*return*/];
            }
        });
    }); });
    var order_store = new order_1.OrderStore();
    it("order-index test case: must return empty array", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, order_store.index()];
                case 1:
                    result = _a.sent();
                    expect(result).toEqual([]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("order-show test case: must be undefined", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, order_store.show(2)];
                case 1:
                    result = _a.sent();
                    expect(result).toBeUndefined();
                    return [2 /*return*/];
            }
        });
    }); });
    it("order-create test case : quantity must be 4", function () { return __awaiter(void 0, void 0, void 0, function () {
        var order, user, product, user_store, product_store, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    order = { user_id: 1, product_id: 1, quantity: 4, status: 1 };
                    user = { first_name: "any", last_name: "any", password: "any" };
                    product = { name: "any", price: 50 };
                    user_store = new user_1.UserStore();
                    product_store = new product_1.ProductStore();
                    return [4 /*yield*/, user_store.create(user)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, product_store.create(product)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, order_store.create(order)];
                case 3:
                    result = _a.sent();
                    expect(result.quantity).toEqual(4);
                    return [2 /*return*/];
            }
        });
    }); });
});

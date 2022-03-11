"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var products_1 = __importDefault(require("./handlers/products"));
var users_1 = __importDefault(require("./handlers/users"));
var orders_1 = __importDefault(require("./handlers/orders"));
// the next 
// authentication middleware for jwt tokens
var app = (0, express_1.default)();
var port = 3000;
app.listen(port, function () {
    console.log("my server is alive!");
});
app.get("/", function (req, res) { res.json("I am here don't worry"); });
(0, products_1.default)(app);
(0, users_1.default)(app);
(0, orders_1.default)(app);

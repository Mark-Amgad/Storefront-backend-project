"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var products_1 = __importDefault(require("./handlers/products"));
// make test to all methods in product model
// the next is to complete models and handlers
var app = (0, express_1.default)();
var port = 3000;
app.listen(port, function () {
    console.log("my server is alive!");
});
(0, products_1.default)(app);

import db from "./database";
import express from "express";
import productsHandler from "./handlers/products";


// make test to all methods in product model
// the next is to complete models and handlers

const app = express();
const port = 3000;
app.listen(port , ()=>{
    console.log("my server is alive!");
});

productsHandler(app);
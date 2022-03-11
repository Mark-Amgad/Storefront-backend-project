import db from "./database";
import express from "express";
import productsHandler from "./handlers/products";
import userHandle from "./handlers/users";
import userHandler from "./handlers/users";

// user handler
// the next is to complete order model,tests and handler
// authentication middleware for jwt tokens


const app = express();
const port = 3000;
app.listen(port , ()=>{
    console.log("my server is alive!");
});
app.get("/",(req,res)=>{res.json("I am here don't worry")});

productsHandler(app);
userHandler(app);
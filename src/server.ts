import db from "./database";
import express from "express";
import productsHandler from "./handlers/products";
import usersHandler from "./handlers/users";
import ordersHandler from "./handlers/orders";
import userOrdersService from "./services/userOrders";
import cookieParser from "cookie-parser";
import addPrdouctService from "./services/addProduct";
import cors from "cors";
//import {Sequelize} from "sequelize";

// authentication middleware for jwt tokens

/*
const sequelize = new Sequelize(
    "postgres://postgres:mark1234@database-1.cjgo5oahfx0s.us-east-1.rds.amazonaws.com:5432/postgres"
);
*/
const app = express();
const port = 3000;

app.listen(port , ()=>{
    console.log("my server is alive!");
});
app.use(cookieParser());
app.use(express.json()); // to handle body json files
app.use(cors());

app.get("/",(req,res)=>{res.json("I am here don't worry")});

productsHandler(app);
usersHandler(app);
ordersHandler(app);
userOrdersService(app);
addPrdouctService(app);

// the 

export default app;
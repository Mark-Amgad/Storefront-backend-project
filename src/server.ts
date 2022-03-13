import db from "./database";
import express from "express";
import productsHandler from "./handlers/products";
import usersHandler from "./handlers/users";
import ordersHandler from "./handlers/orders";
import userOrdersService from "./services/userOrders";
import cookieParser from "cookie-parser";

// authentication middleware for jwt tokens


const app = express();
const port = 3000;
app.listen(port , ()=>{
    console.log("my server is alive!");
});
app.use(cookieParser());
app.use(express.json()); // to handle body json files
app.get("/",(req,res)=>{res.json("I am here don't worry")});

productsHandler(app);
usersHandler(app);
ordersHandler(app);
userOrdersService(app);

export default app;
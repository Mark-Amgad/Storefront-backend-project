// this service will allow user to add a product into his order
// (the user_id of the order must be his id)

import express,{ Request,Response } from "express";
import db from "../database";
import { authenticationMiddleWare } from "../handlers/users";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const addProduct = async (req:Request,res:Response)=>{

    try
    {
        const order_id = parseInt(req.body.order_id);
        const product_id = parseInt(req.body.product_id);
        const quantity = parseInt(req.body.quantity);
        const token = req.cookies.token;
        const decoded = jwt.verify(token,(process.env.JWT_KEY) as Secret);
        const user_id = (decoded as jwt.JwtPayload).user_id;
        
        // until this point I have the needed data about the user, product and order
        // now I will check if user wants to add a products to an order belongs to him or not
        const connection = await db.connect();
        const query = "SELECT * FROM orders WHERE id=($1)";
        const result = await connection.query(query,[order_id]);
        if(result.rows.length == 0)
        {
            return res.json("wrong order id");
        }
        const logged_user_id = result.rows[0].user_id;
        if(logged_user_id === user_id)
        {
            try
            {
                const query =
                "INSERT INTO order_products (order_id,product_id,quantity) VALUES ($1,$2,$3) RETURNING *";
                const result = await db.query(query,[order_id,product_id,quantity]);
                res.json(result.rows[0]).status(200);
            }
            catch(err)
            {
                res.json("wrong order data");
            }
            
        }
        else
        {
            res.json("You don't have access to add to this order because you are not the user that made this order").status(200);
        }
        connection.release();
    }
    catch(err)
    {
        console.log(err);
        res.send(err).json("error in addProduct service");
    }
    
};

const addPrdouctService =async (app:express.Application) => {
    app.post("/service/add",authenticationMiddleWare,addProduct);
};

export default addPrdouctService;
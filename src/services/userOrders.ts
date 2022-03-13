import {Request,Response} from "express";
import express from "express";
import {authenticationMiddleWare} from "../handlers/users";
import db from "../database";

const allOrderForUser = async(req:Request,res:Response)=>{
    try
    {
        const user_id = parseInt(req.params.user_id);
        const connection = await db.connect();
        const query = "SELECT * FROM orders WHERE user_id=($1)";
        const result = await connection.query(query,[user_id]);
        connection.release();
        res.json(result.rows);
        
    }
    catch(err)
    {
        res.json(err);
    }
    

};

const userOrdersService = async(app:express.Application)=>{
    app.get("/service/getorders/:user_id",authenticationMiddleWare,allOrderForUser);
};

export default userOrdersService;
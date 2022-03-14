import {Order , OrderStore} from "../models/order";
//import {Product , ProductStore} from "../models/product";
//import {User , UserStore} from "../models/user";
import express,{Request,Response} from "express";
import { authenticationMiddleWare } from "./users";



const indexHandler = async(req:Request,res:Response)=>{
    try
    {
        const order_store:OrderStore = new OrderStore();
        const result = await order_store.index();
        res.json(result).status(200);
    }
    catch(err)
    {
        res.json(err);
    }
};

const createHandler = async(req:Request,res:Response)=>{
    try
    {
        const order_store = new OrderStore();
        const user_id:number = parseInt(req.body.user_id);
        const status:number = parseInt(req.body.status);
        const order:Order = {
            user_id:user_id,
            status:status
        };

        const result = await order_store.create(order);
        res.json(result).status(200);      
    }
    catch(err)
    {
        res.json(err);
    }
};

const showHandler = async(req:Request,res:Response)=>{
    try
    {
        const order_store = new OrderStore();
        const result = await order_store.show(parseInt(req.params.id));
        res.json(result).status(200);
    }
    catch(err)
    {
        res.json(err);
    }
};

const ordersHandler = (app:express.Application)=>{
    app.get("/orders/index" ,authenticationMiddleWare, indexHandler);
    app.get("/orders/show/:id" ,authenticationMiddleWare, showHandler);
    app.post("/orders/create" ,
    authenticationMiddleWare,
     createHandler);
};

export default ordersHandler;
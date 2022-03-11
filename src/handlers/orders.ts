import {Order , OrderStore} from "../models/order";
//import {Product , ProductStore} from "../models/product";
//import {User , UserStore} from "../models/user";
import express,{Request,Response} from "express";



const indexHandler = async(req:Request,res:Response)=>{
    try
    {
        const order_store:OrderStore = new OrderStore();
        const result = await order_store.index();
        res.json(result);
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
        const user_id:number = parseInt(req.params.user_id);
        const product_id:number = parseInt(req.params.product_id);
        const quantity:number = parseInt(req.params.quantity);
        const status:number = parseInt(req.params.status);
        const order:Order = {
            user_id:user_id,
            product_id:product_id,
            quantity:quantity,
            status:status
        };

        const result = await order_store.create(order);
        res.json(result);      
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
        res.json(result);
    }
    catch(err)
    {
        res.json(err);
    }
};

const ordersHandler = (app:express.Application)=>{
    app.get("/orders/index" , indexHandler);
    app.get("/orders/show/:id" , showHandler);
    app.post("/orders/create/:user_id/:product_id/:quantity/:status" , createHandler);
};

export default ordersHandler;
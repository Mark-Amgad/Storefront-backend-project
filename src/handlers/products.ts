import { Product , ProductStore } from "../models/product";
import express, { Request, Response } from "express";
import { authenticationMiddleWare } from "./users";


// this function will be exported
const productsHandler = async(app:express.Application)=>{
    app.get("/products/index",indexHandler);
    app.get("/products/show/:id",showHandler);
    app.post("/products/create",authenticationMiddleWare , createHandler);
};


const indexHandler = async(req:Request,res:Response)=>{
    try
    {
        const product_store = new ProductStore();
        const result = await product_store.index();
        res.json(result).status(200);
    }
    catch(err)
    {
        console.log("handlers - products - index error");
        throw new Error(`${err}`);
    }
};

const showHandler = async(req:Request,res:Response)=>{
    try
    {
        const product_store = new ProductStore();
        const result = await product_store.show(parseInt(req.params.id));
        res.json(result).status(200);
    }
    catch(err)
    {
        console.log("handlers - products - show error");
        throw new Error(`${err}`);
    }
};

const createHandler = async(req:Request,res:Response)=>{
    try
    {
        const product:Product = {
            name:req.body.name,
            price:parseInt(req.body.price)
        };
        const product_store = new ProductStore();
        const result = await product_store.create(product);
        res.json(result).status(200);
    }
    catch(err)
    {
        console.log("handlers - products - create error");
        throw new Error(`${err}`);
    }
};

export default productsHandler;
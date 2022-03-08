import { Product , ProductStore } from "../models/product";
import express, { Request, Response } from "express";


// this function will be exported
const productsHandler = async(app:express.Application)=>{
    app.get("/products/index",indexHandler);
    app.get("/products/show/:id",showHandler);
    app.post("/products/create/:name/:price" , createHandler);
};


const indexHandler = async(req:Request,res:Response)=>{
    try
    {
        const product_store = new ProductStore();
        const result = await product_store.index();
        res.json(result);
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
        res.json(result);
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
            name:req.params.name,
            price:parseInt(req.params.price)
        };
        const product_store = new ProductStore();
        const result = await product_store.create(product);
        res.json(result);
    }
    catch(err)
    {
        console.log("handlers - products - create error");
        throw new Error(`${err}`);
    }
};

export default productsHandler;
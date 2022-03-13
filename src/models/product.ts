import db from "../database";

export type Product = {
    id?:number,
    name:string,
    price:number
};

export class ProductStore
{
    async index():Promise<[Product]>
    {
        try
        {
            const connection = await db.connect();
            const query = "SELECT * FROM products";
            const result:any = await connection.query(query);
            connection.release();
            return result.rows;
        }
        catch(err)
        {
            //console.log("model - product - index error");
            throw new Error(`${err}`);
        }
    }

    async show(id:number):Promise<Product>
    {
        try
        {
            const connection = await db.connect();
            const query = "SELECT * FROM products WHERE id = ($1)";
            const result = await connection.query(query,[id]);
            connection.release();
            return result.rows[0];
        }
        catch(err)
        {
            //console.log("model - product - show error");
            throw new Error(`${err}`);
        }
    }

    async create(product:Product):Promise<Product>
    {
        try
        {
            const connection = await db.connect();
            const query =
            "INSERT INTO products (name , price) VALUES($1 , $2)RETURNING *";
            const result = await connection.query(query,[product.name,product.price]);
            connection.release();
            return result.rows[0];
        }
        catch(err)
        {
            //console.log("model - product - create error");
            throw new Error(`${err}`);
        }
    }
}
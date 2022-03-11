import db from "../database";

export type Order = {
    id?:number,
    product_id:number,
    user_id:number,
    quantity:number,
    status:number
};

export class OrderStore
{
    async index():Promise<[Order]>
    {
        try
        {
            const connection = await db.connect();
            const query = "SELECT * FROM orders";
            const result = await connection.query(query);
            connection.release();
            return result.rows;
        }
        catch(err)
        {
            console.log("model- order - index - error");
            throw new Error(`${err}`);
        }
    }

    async show(id:number):Promise<Order>
    {
        try
        {
            const connection = await db.connect();
            const query = "SELECT * FROM orders WHERE id=($1)";
            const result = await connection.query(query,[id]);
            connection.release();
            return result.rows[0];
        }
        catch(err)
        {
            console.log("model - order - show - error");
            throw new Error(`${err}`);
        }
    }

    async create(order:Order):Promise<Order>
    {
        try
        {
            const connection = await db.connect();
            const query = 
            "INSERT INTO orders (product_id,user_id,quantity,status) VALUES ($1,$2,$3,$4) RETURNING *";
            const result = await connection.query(query,
                [order.product_id,order.user_id,order.quantity,order.status]
            );
            connection.release();
            return result.rows[0];
        }
        catch(err)
        {
            console.log("model - order - create - error");
            throw new Error(`${err}`);
        }
    }
}
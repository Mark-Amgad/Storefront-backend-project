import db from "../database";

export type Order = {
    id?:number,
    user_id:number,
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
            //console.log("model- order - index - error");
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
            //console.log("model - order - show - error");
            throw new Error(`${err}`);
        }
    }

    async create(order:Order):Promise<Order>
    {
        try
        {
            const connection = await db.connect();
            const query = 
            "INSERT INTO orders (user_id,status) VALUES ($1,$2) RETURNING *";
            const result = await connection.query(query,
                [order.user_id,order.status]
            );
            connection.release();
            return result.rows[0];
        }
        catch(err)
        {
            //console.log("model - order - create - error");
            throw new Error(`${err}`);
        }
    }
}
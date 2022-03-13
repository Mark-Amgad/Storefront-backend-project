import db from "../database";


export type User = {
    id?:number,
    first_name:string,
    last_name:string,
    password:string
};

export class UserStore
{
    async index():Promise<[User]>
    {
        try
        {
            const connection = await db.connect();
            const query = "SELECT * FROM users";
            const result = await connection.query(query);
            connection.release();
            return result.rows;
        }
        catch(err)
        {
            //console.log("user - index - error");
            throw new Error(`${err}`);
        }
    }

    async show(id:number):Promise<User>
    {
        try
        {
            const connection = await db.connect();
            const query = "SELECT * FROM users WHERE id =($1)";
            const result = await connection.query(query,[id]);
            connection.release();
            return result.rows[0];
        }
        catch(err)
        {
            //console.log("user - show - error");
            throw new Error(`${err}`);
        }
    }

    async create(user:User):Promise<User>
    {
        try
        {
            const connection = await db.connect();
            const query =
            "INSERT INTO users (first_name , last_name , password)VALUES($1,$2,$3) RETURNING *";
            const result = await connection.query(query,
                [user.first_name,user.last_name,user.password]
                );
            connection.release();
            return result.rows[0];
        }
        catch(err)
        {
            //console.log("user - create - error");
            throw new Error(`${err}`);
        }
    }
}
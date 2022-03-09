import dotenv from "dotenv";
import { Pool } from "pg";
dotenv.config();

const host = process.env.POSTGRES_HOST;
const user = process.env.POSTGRES_USER;
const pass = process.env.POSTGRES_PASSWORD;
const database = process.env.POSTGRES_DB;
const database_test = process.env.POSTGRES_DB_TEST;

const target_db = process.env.ENV;

let db:any;
if(target_db === "dev")
{
    db = new Pool({host:host , user:user , password:pass , database:database});
}
else if(target_db === "test")
{
    db = new Pool({host:host , user:user , password:pass , database:database_test});
}

export default db;
import dotenv from "dotenv";
import { Pool } from "pg";
dotenv.config();

const host = process.env.POSTGRES_HOST;
const user = process.env.POSTGRES_USER;
const pass = process.env.POSTGRES_PASSWORD;
const database = process.env.POSTGRES_DB;

const db = new Pool({host:host , user:user , password:pass , database:database});

export default db;
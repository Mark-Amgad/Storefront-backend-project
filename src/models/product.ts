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

        }
        catch(err)
        {
            
        }
    }
}
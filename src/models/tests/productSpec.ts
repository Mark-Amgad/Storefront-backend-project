import db from "../../database";
import { Product,ProductStore } from "../product";

const produc_store = new ProductStore();

describe("product test cases : ",()=>{

    beforeAll(async()=>{
        const connection = await db.connect();
        const query = "DELETE FROM products";
        connection.query(query);
        connection.release();

    });
    
    afterEach(async()=>{
        const connection = await db.connect();
        const query = "DELETE FROM products";
        connection.query(query);
        connection.release();

    });

    it("product - index - test case" , async()=>{
        const result  = await produc_store.index();
        expect(result).toEqual([]);
    });

    it("product - create - test case",async()=>{
        const p:Product = {name:"iphone",price:400};
        const result = await produc_store.create(p);
        expect(result.name).toEqual("iphone");
    });

    it("product - show - test case",async()=>{
        const result = await produc_store.show(2);
        expect(result).toBeUndefined();

    });
});
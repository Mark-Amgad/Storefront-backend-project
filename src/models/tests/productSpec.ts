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

    it("product - index - test case:must equal to an empty array" , async()=>{
        const result  = await produc_store.index();
        expect(result).toEqual([]);
    });

    it("product - create - test case: product name must be 'iphone'",async()=>{
        const p:Product = {name:"iphone",price:400};
        const result = await produc_store.create(p);
        expect(result.name).toEqual("iphone");
    });

    it("product - show - test case : the return value must be undefined",async()=>{
        const result = await produc_store.show(2);
        expect(result).toBeUndefined();

    });
});
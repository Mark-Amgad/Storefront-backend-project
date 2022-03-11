import { Order,OrderStore } from "../order";
import { User,UserStore } from "../user";
import { Product,ProductStore } from "../product";
import db from "../../database";




describe("order model test cases :",()=>{

    beforeAll(async()=>{
        const connection = await db.connect();
        const query = "DELETE FROM orders";
        connection.query(query);
        connection.release();

    });


    afterEach(async()=>{
        const connection = await db.connect();
        const query = "DELETE FROM orders";
        connection.query(query);
        connection.release();

    });
    const order_store = new OrderStore();

    it("order-index test case: must return empty array",async()=>{
        const result = await order_store.index();
        expect(result).toEqual([]);
    });

    it("order-show test case: must return NaN",async()=>{
        const result = await order_store.show(2);
        expect(result).toBeUndefined();
    });

    it("order-create test case : quantity must be 4",async ()=>{
        const order:Order = {user_id:1 , product_id:1 , quantity : 4 , status : 1};
        const user:User = {first_name:"any",last_name:"any",password:"any"};
        const product:Product = {name:"any",price:50};
        const user_store = new UserStore();
        const product_store = new ProductStore();
        await user_store.create(user);
        await product_store.create(product);
        const result = await order_store.create(order);
        expect(result.quantity).toEqual(4);
    });

});
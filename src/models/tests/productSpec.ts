import { Product,ProductStore } from "../product";

const produc_store = new ProductStore();

describe("product test cases : ",()=>{
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
        expect(result).toBeNaN;

    });
});
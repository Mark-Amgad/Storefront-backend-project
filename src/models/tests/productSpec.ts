import { Product,ProductStore } from "../product";

const produc_store = new ProductStore();

describe("product test cases : ",()=>{
    it("product - index - test case :" , async()=>{
        const result  = await produc_store.index();
        expect(result).toEqual([]);
    });
});
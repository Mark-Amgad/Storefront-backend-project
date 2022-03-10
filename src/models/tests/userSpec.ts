import { UserStore , User } from "../user";



describe("User model test cases :",()=>{
    
    const user_store = new UserStore();

    it("user - index - test case : must return an empty array",async()=>{
        const result = await user_store.index();
        expect(result).toEqual([]);
    });

    it("user - show - test case : must return NaN",async()=>{
        const result = await user_store.show(5);
        expect(result).toBeNaN;
    });

    it("user - create - test case: user's first_name must be Mark",async()=>{
        const u:User = {first_name:"Mark",last_name:"Amgad",password:"1234"};
        const result = await user_store.create(u);
        expect(result.first_name).toEqual("Mark");
    });
});
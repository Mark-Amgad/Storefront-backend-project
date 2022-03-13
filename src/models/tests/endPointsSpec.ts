import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

describe("products end point test cases : ",()=>{
    it("products/index endpoint test case : status must be 200",async()=>{
        const response = await request.get("/products/index");
        expect(response.status).toBe(200);
    });

    it("products/index endpoint test case : status must not be 200",async()=>{
        const response = await request.get("/products/ind");
        expect(response.status).not.toBe(200);
    });

    it("products/show endpoint test case : status must be 200",async()=>{
        const response = await request.get("/products/show/2");
        expect(response.status).toBe(200);
    });

    it("products/create endpoint test case : status must be 200",async()=>{
        const response = await request.post("/products/create");
        expect(response.status).toBe(200);
    });
});



describe("users end points test cases :",()=>{

    it("users/index endpoint test case : status must be 200",async ()=>{
        const response = await request.get("/users/index");
        expect(response.status).toBe(200);
    });

    it("users/show endpoint test case : status must be 200",async()=>{
        const response = await request.get("/users/show/2");
        expect(response.status).toBe(200);
    });
    
    it("users/create endpoint test case : status must be 200",async()=>{
        const response = await request.post("/users/create");
        expect(response.status).toBe(200);
    });

    it("users/login endpoint test case : status must be 200",async()=>{
        const response = await request.post("/users/login");
        expect(response.status).toBe(200);
    });

    it("users/logout endpoint test case : status must be 200",async()=>{
        const response = await request.get("/users/logout");
        expect(response.status).toBe(200);
    });
});

describe("orders end point test cases : ",()=>{
    it("orders/index endpoint test case : status must be 200",async()=>{
        const response = await request.get("/orders/index");
        expect(response.status).toBe(200);
    });

    it("orders/index endpoint test case : status must not be 200",async()=>{
        const response = await request.get("/orders/ind");
        expect(response.status).not.toBe(200);
    });

    it("orders/show endpoint test case : status must be 200",async()=>{
        const response = await request.get("/orders/show/2");
        expect(response.status).toBe(200);
    });

    it("orders/create endpoint test case : status must be 200",async()=>{
        const response = await request.post("/orders/create");
        expect(response.status).toBe(200);
    });
});



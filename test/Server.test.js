const request = require("supertest");

describe("Server API tests", () => {
  /**
   * I did not have time to implement the products
   * So I just made the endpoint and wrote this test.
   */
  it("POST new product success" , async () => {
    const newProduct = {
      name: "Product 1",
      price: 19.99,
      quantity: 1,
      image: "Image 1",
    };

    // Make a POST request to your products endpoint
    const response = await request("http://localhost:3001")
      .post("/products")
      .send(newProduct);

    // Make sure response is good.
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(newProduct.name);
    expect(response.body.price).toBe(newProduct.price);
    expect(response.body.quantity).toBe(newProduct.quantity);
    expect(response.body.image).toBe(newProduct.image);
  });
});


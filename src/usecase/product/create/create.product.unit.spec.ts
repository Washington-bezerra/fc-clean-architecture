import CreateProductUseCase from "./create.product.usecase";

const makeInput = () => ({
    name: "Product 1",
    price: 100,
});

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test create product use case", () => {
    it("should create a product", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);
        const input = makeInput();

        const output = await productCreateUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        })
    })

    it("should thrown an error when name is missing", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);
        const input = makeInput();
        input.name = "";

        await expect(productCreateUseCase.execute(input)).rejects.toThrow(
            "Name is required");
    })

    it("should thrown an error when price is less than zero", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);
        const input = makeInput();
        input.price = -1;

        await expect(productCreateUseCase.execute(input)).rejects.toThrow(
            "product: Price must be greater or equal 0");
    })
})

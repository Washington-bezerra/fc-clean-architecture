import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

const product = new Product("123", "Product 1", 100);
const input = {
    id: "123",
    name: "Product 1",
    price: 100,
};

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        update: jest.fn(),
        findAll: jest.fn(),
    }
}

describe("Unit test for product update use case", () => {
    it("should update a product", async () => {
        const productRepository = MockRepository();
        const usecase = new UpdateProductUseCase(productRepository);

        const output = await usecase.execute(input);

        expect(output).toEqual(input);
    })
})
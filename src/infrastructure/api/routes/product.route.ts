import express, { Request, Response } from "express";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import FindProductUseCase from "../../../usecase/product/find/find.product.usecase";
import ProductPresenter from "../presenters/product.presenter";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";
import UpdateProductUseCase from "../../../usecase/product/update/update.product.usecase";
export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
    const usecase = new CreateProductUseCase(new ProductRepository());
    try {
        const productDto = {
            name: req.body.name,
            price: req.body.price,
        };
        const output = await usecase.execute(productDto);
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});

productRoute.get("/:id", async (req: Request, res: Response) => {
    const usecase = new FindProductUseCase(new ProductRepository());
    try {
        const output = await usecase.execute({ id: req.params.id });
        res.format({
            json: async () => res.send(output),
            xml: async () => res.send(ProductPresenter.singleXML(output)),
          });
    } catch (err) {
        res.status(500).send(err);
    }
});

productRoute.get("/", async (req: Request, res: Response) => {
    try {
        const usecase = new ListProductUseCase(new ProductRepository());
        const output = await usecase.execute({});
        res.format({
            json: async () => res.send(output),
            xml: async () => res.send(ProductPresenter.listXML(output)),
        });
    } catch (err) {
        res.status(500).send(err);
    }
});

productRoute.put("/", async (req: Request, res: Response) => {
    const usecase = new UpdateProductUseCase(new ProductRepository());
    try {
        const output = await usecase.execute({ id: req.body.id, name: req.body.name, price: req.body.price });
        res.format({
            json: async () => res.send(output),
            xml: async () => res.send(ProductPresenter.singleXML(output)),
          });
    } catch (err) {
        res.status(500).send(err);
    }
});

import express, { Request, Response} from "express";
import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/facade.factory";
import { AddProductFacadeInputDto } from "../../../modules/product-adm/facade/product-adm.facade.interface";

export const productRoute = express.Router()

productRoute.post('/', async (req: Request, res: Response) => {
    const facade = ProductAdmFacadeFactory.create()
    try {
        const dto: AddProductFacadeInputDto = {
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            purchasePrice: req.body.purchasePrice,
            stock: req.body.stock,
        }
        await facade.addProduct(dto)
        res.send()
    } 
    catch (error) {
        res.status(500).send(error)
    }
})
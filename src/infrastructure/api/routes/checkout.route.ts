import express, { Request, Response} from "express";
import CheckoutFacadeFactory from "../../../modules/checkout/factory/checkout.facade.factory";
import { PlaceOrderFacadeInputDto } from "../../../modules/checkout/facade/checkout.facade.interface";

export const checkoutRoute = express.Router()

checkoutRoute.post('/', async (req: Request, res: Response) => {
    const facade = CheckoutFacadeFactory.create()
    const dto: PlaceOrderFacadeInputDto = {
        clientId: req.body.clientId,
        products: req.body.products
    }
    try {
        await facade.placeOrder(dto)
        res.send()
    } 
    catch (error) {
        res.status(500).send(error)
    }
})
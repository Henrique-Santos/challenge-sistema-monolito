import express, { Request, Response} from "express";
import ClientAdmFacadeFactory from "../../../modules/client-adm/factory/client-adm.facade.factory";
import { AddClientFacadeInputDto } from "../../../modules/client-adm/facade/client-adm.facade.interface";

export const clientRoute = express.Router()

clientRoute.post('/', async (req: Request, res: Response) => {
    const facade = ClientAdmFacadeFactory.create()
    const dto: AddClientFacadeInputDto = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        document: req.body.document,
        street: req.body.street,
        number: req.body.number,
        complement: req.body.complement,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode
    }
    try {
        await facade.add(dto)
        res.send()
    } 
    catch (error) {
        res.status(500).send(error)
    }
})
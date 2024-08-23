import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../domain/invoice-items.entity";
import Invoice from "../domain/invoice.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import InvoiceItemsModel from "./invoice-items.model";
import InvoiceModel from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {
    
    async find(id: string): Promise<Invoice> {
        const invoice = await InvoiceModel.findOne({ where: { id }, include: [InvoiceItemsModel] })
        return new Invoice({
            id: new Id(invoice.id),
            name: invoice.name,
            document: invoice.document,
            address: new Address(
                invoice.street,
                invoice.number,
                invoice.complement,
                invoice.city,
                invoice.state,
                invoice.zipcode,
              ),
              items: invoice.items.map(item => (new InvoiceItems({ id: new Id(item.id), name: item.name, price: item.price}))),
              createdAt: invoice.createdAt,
              updatedAt: invoice.createdAt
        })
    }

    async generate(input: Invoice): Promise<void> {
        await InvoiceModel.create(
            {
                id: input.id.id,
                name: input.name,
                document: input.document,
                street: input.address.street,
                number: input.address.number,
                complement: input.address.complement,
                city: input.address.city,
                state: input.address.state,
                zipcode: input.address.zipCode,
                items: input.items.map(item => ({ id: item.id.id, name: item.name, price: item.price})),
                updatedAt: input.updatedAt,
                createdAt: input.createdAt
            },
            {
                include: [InvoiceItemsModel]
            }
        )
    }
}
import Address from "../../../@shared/domain/value-object/address"
import InvoiceItems from "../../domain/invoice-items.entity"
import Invoice from "../../domain/invoice.entity"
import FindInvoiceUseCase from "./find.invoice.usecase"

const invoice = new Invoice({
    name: 'Invoice',
    document: '1234-5678',
    address: new Address('Rua 123', '99', 'Casa Verde', 'Criciúma', 'SC', '88888-888'),
    items: [
        new InvoiceItems({ name: 'Invoice Item', price: 100 })
    ]
})

const MockRepository = () => {
    return {
      find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
      generate: jest.fn(),
    }
}


describe('Find invoice usecase test', () => {

    it('should find a invoice', async () => {
        const repository = MockRepository()
        const usecase = new FindInvoiceUseCase(repository)
        const output = await usecase.execute({ id: '1' })
        expect(output.id).toBe(invoice.id.id);
        expect(output.name).toBe(invoice.name);
        expect(output.document).toBe(invoice.document);
        expect(output.address.street).toBe(invoice.address.street);
        expect(output.address.number).toBe(invoice.address.number);
        expect(output.address.complement).toBe(invoice.address.complement);
        expect(output.address.city).toBe(invoice.address.city);
        expect(output.address.state).toBe(invoice.address.state);
        expect(output.address.zipCode).toBe(invoice.address.zipCode);
        expect(output.items[0].name).toBe(invoice.items[0].name);
        expect(output.items[0].price).toBe(invoice.items[0].price);
    })
})
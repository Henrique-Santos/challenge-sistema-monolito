import { Sequelize } from "sequelize-typescript"
import InvoiceModel from "./invoice.model"
import InvoiceRepository from "./invoice.repository"
import InvoiceItemsModel from "./invoice-items.model"
import Invoice from "../domain/invoice.entity"
import InvoiceItems from "../domain/invoice-items.entity"
import Address from "../../@shared/domain/value-object/address"

describe('InvoiceRepository test', () => {
    let sequelize: Sequelize
  
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        })
        sequelize.addModels([InvoiceModel, InvoiceItemsModel])
        await sequelize.sync()
    })
  
    afterEach(async () => {
        await sequelize.close()
    })

    it('should find a invoice', async () => {
        await InvoiceModel.create(
            {
                id: '1',
                name: 'Invoice',
                document: '1234-5678',
                street: 'Rua 123',
                number: '99',
                complement: 'Casa Verde',
                city: 'Criciúma',
                state: 'SC',
                zipcode: '88888-888',
                items: [
                    {
                        id: '1',
                        name: 'Invoice Item',
                        price: 100
                    }
                ],
                createdAt: new Date(),
                updatedAt: new Date()
            }, 
            { 
                include: [InvoiceItemsModel]
            }
        )

        const repository = new InvoiceRepository()
        const invoice = await repository.find('1')
        
        expect(invoice.id.id).toBe('1')
        expect(invoice.name).toBe('Invoice')
        expect(invoice.document).toBe('1234-5678')
        expect(invoice.address.street).toBe('Rua 123')
        expect(invoice.address.number).toBe('99')
        expect(invoice.address.complement).toBe('Casa Verde')
        expect(invoice.address.city).toBe('Criciúma')
        expect(invoice.address.state).toBe('SC')
        expect(invoice.address.zipCode).toBe('88888-888')
        expect(invoice.items[0].name).toBe('Invoice Item')
        expect(invoice.items[0].price).toBe(100)
    })

    it('should generate a invoice', async () => {
        const invoice = new Invoice({
            name: 'Invoice',
            document: '1234-5678',
            address: new Address('Rua 123', '99', 'Casa Verde', 'Criciúma', 'SC', '88888-888'),
            items: [
                new InvoiceItems({ name: 'Invoice Item', price: 100 })
            ]
        })
        const repository = new InvoiceRepository()
        await repository.generate(invoice)
        const invoiceData = await InvoiceModel.findOne({ where: { id: invoice.id.id }, include: [InvoiceItemsModel] })
       
        expect(invoiceData.id).toBe(invoice.id.id);
        expect(invoiceData.name).toBe(invoice.name);
        expect(invoiceData.document).toBe(invoice.document);
        expect(invoiceData.street).toBe(invoice.address.street);
        expect(invoiceData.number).toBe(invoice.address.number);
        expect(invoiceData.complement).toBe(invoice.address.complement);
        expect(invoiceData.city).toBe(invoice.address.city);
        expect(invoiceData.state).toBe(invoice.address.state);
        expect(invoiceData.zipcode).toBe(invoice.address.zipCode);
        expect(invoiceData.items[0].name).toBe(invoice.items[0].name);
        expect(invoiceData.items[0].price).toBe(invoice.items[0].price);
    })
})
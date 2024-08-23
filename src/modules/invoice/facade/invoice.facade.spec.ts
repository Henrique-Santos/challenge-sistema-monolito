import { Sequelize } from "sequelize-typescript"
import InvoiceItemsModel from "../repository/invoice-items.model"
import InvoiceModel from "../repository/invoice.model"
import InvoiceFacadeFactory from "../factory/invoice.facade.factory"

describe('Invoice facade test', () => {
    let sequelize: Sequelize
  
    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false,
        sync: { force: true }
      })
  
      sequelize.addModels([InvoiceModel, InvoiceItemsModel])
      await sequelize.sync()
    })
  
    afterEach(async () => {
      await sequelize.close()
    })

    it('should find a invoice', async () => {
        const input = { id: '1' }
        const invoice = {
            id: input.id,
            name: 'Invoice',
            document: '1234-5678',
            street: 'Rua 123',
            number: '99',
            complement: 'Casa Verde',
            city: 'Criciúma',
            state: 'SC',
            zipCode: '88888-888',
            items: [
                { 
                    id: '1',
                    name: 'Invoice Item', 
                    price: 100 
                }
            ]
        }
        const facade = InvoiceFacadeFactory.create()
        await facade.generate(invoice)
        const output = await facade.find(input)
        
        expect(output.id).toBe(invoice.id);
        expect(output.name).toBe(invoice.name);
        expect(output.document).toBe(invoice.document);
        expect(output.address.street).toBe(invoice.street);
        expect(output.address.number).toBe(invoice.number);
        expect(output.address.complement).toBe(invoice.complement);
        expect(output.address.city).toBe(invoice.city);
        expect(output.address.state).toBe(invoice.state);
        expect(output.address.zipCode).toBe(invoice.zipCode);
        expect(output.items[0].name).toBe(invoice.items[0].name);
        expect(output.items[0].price).toBe(invoice.items[0].price);
    })

    it('should generate a invoice', async () => {
        const input = {
            id: '1',
            name: 'Invoice',
            document: '1234-5678',
            street: 'Rua 123',
            number: '99',
            complement: 'Casa Verde',
            city: 'Criciúma',
            state: 'SC',
            zipCode: '88888-888',
            items: [
                { 
                    id: '1',
                    name: 'Invoice Item', 
                    price: 100 
                }
            ]
        }
        const facade = InvoiceFacadeFactory.create()
        await facade.generate(input)
        const invoiceData = await InvoiceModel.findOne({ where: { id: input.id }, include: [InvoiceItemsModel] })
        
        expect(invoiceData.id).toBe(input.id);
        expect(invoiceData.name).toBe(input.name);
        expect(invoiceData.document).toBe(input.document);
        expect(invoiceData.street).toBe(input.street);
        expect(invoiceData.number).toBe(input.number);
        expect(invoiceData.complement).toBe(input.complement);
        expect(invoiceData.city).toBe(input.city);
        expect(invoiceData.state).toBe(input.state);
        expect(invoiceData.zipcode).toBe(input.zipCode);
        expect(invoiceData.items[0].name).toBe(input.items[0].name);
        expect(invoiceData.items[0].price).toBe(input.items[0].price);
    })
})
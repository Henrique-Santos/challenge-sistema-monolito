import { Sequelize } from "sequelize-typescript"
import request from "supertest";
import { ProductModel } from "../../../modules/product-adm/repository/product.model";
import { OrderModel } from "../../../modules/checkout/repository/order.model";
import { ClientModel } from "../../../modules/client-adm/repository/client.model";
import { ProductModel as StoreCatalogProductModel } from "../../../modules/store-catalog/repository/product.model";
import { ProductModel as CheckoutProductModel } from "../../../modules/checkout/repository/product.model";
import { ClientModel as OrderClientModel } from "../../../modules/checkout/repository/client.model";
import { Umzug } from "umzug";
import TransactionModel from "../../../modules/payment/repository/transaction.model";
import InvoiceModel from "../../../modules/invoice/repository/invoice.model";
import InvoiceItemsModel from "../../../modules/invoice/repository/invoice-items.model";
import { migrator } from "../../database/migrations/config/migrator";
import { app } from "../express";

describe('E2E test for checkout', () => {

    let sequelize: Sequelize

    let migration: Umzug<any>

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ":memory:",
            logging: false
        })

        await sequelize.addModels([ProductModel, OrderModel, StoreCatalogProductModel, CheckoutProductModel, OrderClientModel, ClientModel, TransactionModel, InvoiceModel, InvoiceItemsModel])
        migration = migrator(sequelize)
        await migration.up()
        await sequelize.sync();
    })

    afterEach(async () => {
        if (!migration || !sequelize) {
            return 
        }
        migration = migrator(sequelize)
        await migration.down()
        await sequelize.close()
    })

    it('should place a order', async () => {
        const clientInput = {
            id: '1c',
            name: 'Lucian',
            email: 'lucian@123.com',
            document: '1234-5678',
            street: 'Rua 123',
            number: '99',
            complement: 'Casa Verde',
            city: 'Criciúma',
            state: 'SC',
            zipCode: '88888-888'
        }

		const clientResponse = await request(app)
            .post('/client')
			.send(clientInput)

        expect(clientResponse.status).toBe(200)

        const productInput = {
			id: '1p',
			name: 'Product A',
			description: 'Product A Description',
			purchasePrice: 10,
			stock: 100,
		}

		const productResponse = await request(app)
			.post('/product')
			.send(productInput)

        expect(productResponse.status).toBe(200)

        const checkoutInput = {
            clientId: '1c',
            products: [
                { productId: '1p' }
            ]
        }

		const checkoutResponse = await request(app)
            .post('/checkout')
			.send(checkoutInput)
            
        console.log(checkoutResponse.error)

		expect(checkoutResponse.status).toBe(200)
		expect(checkoutResponse.body.id).toBeDefined()
        expect(checkoutResponse.body.invoiceId).toBeDefined()
        expect(checkoutResponse.body.status).toEqual('approved')
        expect(checkoutResponse.body.total).toEqual(productInput.purchasePrice)
        expect(checkoutResponse.body.products[0].productId).toEqual(checkoutInput.products[0].productId)
        expect(checkoutResponse.body.createdAt).toBeDefined()
        expect(checkoutResponse.body.updatedAt).toBeDefined()
	})
})
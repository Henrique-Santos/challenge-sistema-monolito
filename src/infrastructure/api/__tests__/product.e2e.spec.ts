import { Sequelize } from "sequelize-typescript";
import { ProductModel as ProductModelAdm } from "../../../modules/product-adm/repository/product.model";
import { ProductModel as ProductModelCatalog } from "../../../modules/store-catalog/repository/product.model";
import { sequelize, app } from "../express";
import request from "supertest";
import { Umzug } from "umzug";
import { migrator } from "../../database/migrations/config/migrator";
import { ClientModel } from "../../../modules/client-adm/repository/client.model";

describe('E2E test for product', () => {

	let sequelize: Sequelize

    let migration: Umzug<any>

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ":memory:",
            logging: false
        })
          
        sequelize.addModels([ProductModelAdm, ProductModelCatalog, ClientModel])
        migration = migrator(sequelize)
        await migration.up()
    })

    afterEach(async () => {
        if (!migration || !sequelize) {
        	return 
        }
        migration = migrator(sequelize)
        await migration.down()
        await sequelize.close()
    })

    it('should create a product', async () => {

		const input = {
			id: '1p',
			name: 'Product A',
			description: 'Product A Description',
			purchasePrice: 10,
			stock: 100,
		}

		const response = await request(app)
			.post('/product')
			.send(input);

		const product = await ProductModelAdm.findOne({ where: { id: "1p" } })
		
		expect(response.status).toBe(200)
		expect(product.id).toBeDefined()
		expect(product.name).toBe('Product A')
		expect(product.description).toBe('Product A Description')
		expect(product.purchasePrice).toBe(10)
		expect(product.stock).toBe(100)
	})
})
import { ProductModel } from "../../../modules/product-adm/repository/product.model";
import { sequelize, app } from "../express";
import request from "supertest";

describe('E2E test for product', () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true })
    })

    afterAll(async () => {
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

		const product = await ProductModel.findOne({ where: { id: "1p" } })
		
		expect(response.status).toBe(200)
		// expect(product.id).toBeDefined()
		// expect(product.name).toBe('Product A')
		// expect(product.description).toBe('Product A Description')
		// expect(product.purchasePrice).toBe(10)
		// expect(product.stock).toBe(100)
	})
})
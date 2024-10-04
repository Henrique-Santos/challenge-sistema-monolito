import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../../../modules/client-adm/repository/client.model";
import { app } from "../express";
import request from "supertest";
import { Umzug } from "umzug";
import { ProductModel as ProductModelAdm } from "../../../modules/product-adm/repository/product.model";
import { ProductModel as ProductModelCatalog } from "../../../modules/store-catalog/repository/product.model";
import { migrator } from "../../database/migrations/config/migrator";

describe('E2E test for client', () => {

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

    it('should create a client', async () => {
        const input = {
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

		const response = await request(app)
            .post('/client')
			.send(input);

        const client = await ClientModel.findOne({ where: { id: "1c" } })
        
		expect(response.status).toBe(200)
		expect(client.id).toBeDefined()
		expect(client.name).toBe('Lucian')
		expect(client.email).toBe('lucian@123.com')
		expect(client.document).toBe('1234-5678')
		expect(client.street).toBe('Rua 123')
        expect(client.number).toBe('99')
        expect(client.complement).toBe('Casa Verde')
        expect(client.city).toBe('Criciúma')
        expect(client.state).toBe('SC')
        expect(client.zipCode).toBe('88888-888')
	})
})
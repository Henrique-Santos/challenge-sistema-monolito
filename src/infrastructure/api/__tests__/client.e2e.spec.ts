import { ClientModel } from "../../../modules/client-adm/repository/client.model";
import { sequelize, app } from "../express";
import request from "supertest";

describe('E2E test for client', () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true })
    })

    afterAll(async () => {
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
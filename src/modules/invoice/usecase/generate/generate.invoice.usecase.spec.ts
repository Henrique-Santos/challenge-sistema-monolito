import GenerateInvoiceUseCase from "./generate.invoice.usecase"

const input = {
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

const MockRepository = () => {
    return {
      find: jest.fn(),
      generate: jest.fn(),
    }
}

describe('Generate usecase test', () => {

    it('should generate a invoice', async () => {
        const repository = MockRepository()
        const usecase = new GenerateInvoiceUseCase(repository)
        const output = await usecase.execute(input)
        expect(output.id).toBeDefined();
        expect(output.name).toBe(input.name);
        expect(output.document).toBe(input.document);
        expect(output.street).toBe(input.street);
        expect(output.number).toBe(input.number);
        expect(output.complement).toBe(input.complement);
        expect(output.city).toBe(input.city);
        expect(output.state).toBe(input.state);
        expect(output.zipCode).toBe(input.zipCode);
        expect(output.items[0].name).toBe(input.items[0].name);
        expect(output.items[0].price).toBe(input.items[0].price);
    })
})
import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import ProductGateway from "../../gateway/product.gateway";

export default class FindAllProductsUseCase implements UseCaseInterface {

    constructor(private productRepository: ProductGateway) {}
    
    async execute(input: any): Promise<any> {
        const products = await this.productRepository.findAll();

        return {
            products: products.map((product) => ({
                id: product.id.id,
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrice,
            })),
        };
    }
}
export default class FindAllProductsDto {
    products: {
        id: string
        name: string
        description: string
        salesPrice: number
    }[]
}
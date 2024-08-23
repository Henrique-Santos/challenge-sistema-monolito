import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import InvoiceFacadeInterface, { FindInvoiceFacadeInputDTO, FindInvoiceFacadeOutputDTO, GenerateInvoiceFacadeInputDTO, GenerateInvoiceFacadeOutputDTO } from "./invoice.facade.interface";

export default class InvoiceFacade implements InvoiceFacadeInterface {
    private _findUsecase: UseCaseInterface
    private _generateUsecase: UseCaseInterface
  
    constructor(usecaseProps: UseCaseProps) {
      this._findUsecase = usecaseProps.findUsecase
      this._generateUsecase = usecaseProps.generateUsecase
    }

    async find(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO> {
        return await this._findUsecase.execute(input)
    }

    async generate(input: GenerateInvoiceFacadeInputDTO): Promise<GenerateInvoiceFacadeOutputDTO> {
        return await this._generateUsecase.execute(input)
    }

}

export interface UseCaseProps {
    findUsecase: UseCaseInterface
    generateUsecase: UseCaseInterface
}
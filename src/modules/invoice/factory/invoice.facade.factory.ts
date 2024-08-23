import InvoiceFacade from "../facade/invoice.facade"
import InvoiceRepository from "../repository/invoice.repository"
import FindInvoiceUseCase from "../usecase/find/find.invoice.usecase"
import GenerateInvoiceUseCase from "../usecase/generate/generate.invoice.usecase"

export default class InvoiceFacadeFactory {
    static create() {
        const repository = new InvoiceRepository()
        const findInvoiceUsecase = new FindInvoiceUseCase(repository)
        const generateInvoiceUsecase = new GenerateInvoiceUseCase(repository)
        const facade = new InvoiceFacade({
            findUsecase: findInvoiceUsecase, 
            generateUsecase: generateInvoiceUsecase
        })
  
        return facade
    }
}
import express, { Express } from "express";
import { productRoute } from "./routes/product.route";
import { clientRoute } from "./routes/client.route";
import { checkoutRoute } from "./routes/checkout.route";
import { invoiceRoute } from "./routes/invoice.route";

export const app: Express = express()

app.use(express.json())
app.use('/client', clientRoute)
app.use('/product', productRoute)
app.use('/checkout', checkoutRoute)
app.use('/invoice', invoiceRoute)
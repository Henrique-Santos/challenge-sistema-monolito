import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../../modules/product-adm/repository/product.model";
import { productRoute } from "./routes/product.route";
import { ClientModel } from "../../modules/client-adm/repository/client.model";
import { clientRoute } from "./routes/client.route";

export const app: Express = express()
app.use(express.json())
app.use('/client', clientRoute)
app.use('/product', productRoute)

export let sequelize: Sequelize
setupDb()

async function setupDb() {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false,
    })
    sequelize.addModels([ProductModel, ClientModel])  
    await sequelize.sync();
}
import { Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { OrderModel } from "./order.model";

@Table({
    tableName: 'products',
    timestamps: false
})
export class ProductModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string

    @ForeignKey(() => OrderModel)
    @Column({ allowNull: false })
    declare order_id: string;

    @Column({ allowNull: false })
    declare name: string
    
    @Column({ allowNull: false })
    declare description: string

    @Column({ allowNull: false })
    declare salesPrice: number
}
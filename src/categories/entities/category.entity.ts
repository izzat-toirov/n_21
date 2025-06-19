import { AllowNull, Column, DataType, Model, Table } from "sequelize-typescript";

interface ICategory {
    name: string;
}

@Table({tableName: "category"})
export class Category extends Model<Category, ICategory> {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare name: string;
}

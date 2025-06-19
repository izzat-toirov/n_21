
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ISocial {
    name: string;
    social_icon: string;
}

@Table({tableName: "social"})
export class Social extends Model<Social, ISocial> {
    @Column({
        type:DataType.STRING,
        allowNull: false,
    })
    declare name: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare social_icon: string
}

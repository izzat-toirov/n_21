import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../../users/entities/user.entity";


interface INotification {
    user_id: number;
    message: string;
}

@Table({tableName: "notification"})
export class Notification extends Model<Notification, INotification> {
    @ForeignKey(()=> User)
    @Column({
        type: DataType.INTEGER
    })
    declare user_id: number;
    @BelongsTo(()=> User)
    user: User

    @Column({
        type: DataType.STRING
    })
    declare message: string;

    
}

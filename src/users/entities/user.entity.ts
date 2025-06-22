import { AllowNull, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Notification } from "../../notifications/entities/notification.entity";


interface IUsers {
    full_name: string;
    email: string;
    password_hash:string;
    role:'creator' | 'user';
    bio: string;
    avatar_uri: string;
    banner_uri: string;
}

@Table({tableName: "users"})
export class User extends Model<User, IUsers> {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare full_name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare email: string;
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare password_hash: string;
    @Column({
        type: DataType.ENUM('creator', 'user'),
        allowNull: false
    })
    declare role: 'creator' | 'user';
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare bio: string;
    @Column({
        type: DataType.STRING
    })
    declare avatar_uri: string;
    @Column({
        type: DataType.STRING
    })
    declare banner_uri: string;

    @HasMany(()=> Notification)
    notification: Notification
    
}

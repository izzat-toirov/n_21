import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "../../users/model/user.model";
import { UserRole } from "../../users/model/user-role.model";
interface IRolesCreationAttr {
  value: string;
  destcription: string;
}

@Table({ tableName: "roles" })
export class Roles extends Model<Roles, IRolesCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(50),
    unique: true,
    allowNull: true,
  })
  declare value: string;

  @Column({
    type: DataType.STRING(50),
  })
  declare description: string;

  @BelongsToMany(() => User, () => UserRole)
  users: User[];
}

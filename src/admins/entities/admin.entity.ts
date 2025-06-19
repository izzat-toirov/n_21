import { Table, Column, Model, DataType } from 'sequelize-typescript';

interface IAdmin {
  full_name: string;
  email: string;
  role: 'super_admin' | 'moderator';
  password_hash: string;
  is_active: boolean;
}

@Table({ tableName: 'admins' })
export class Admin extends Model<Admin, IAdmin> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare full_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.ENUM('super_admin', 'moderator'),
    allowNull: false,
  })
  declare role: 'super_admin' | 'moderator';

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare password_hash: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  declare is_active: boolean;
}

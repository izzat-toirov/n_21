import { Table, Column, Model, DataType } from 'sequelize-typescript';

interface IKurier {
  full_name: string;
  phone_number: string;
  vehicle_type: 'foot' | 'bike' | 'car' | 'motorcycle';
  vehicle_plate_number: string;
  is_active: boolean;
}

@Table({ tableName: 'kurier' }) // E'tibor bering: tableName `kurier` bo'lishi kerak
export class Kurier extends Model<Kurier, IKurier> {
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
  declare phone_number: string;

  @Column({
    type: DataType.ENUM('foot', 'bike', 'car', 'motorcycle'),
    allowNull: false,
  })
  declare vehicle_type: 'foot' | 'bike' | 'car' | 'motorcycle';

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare vehicle_plate_number: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  declare is_active: boolean;
}

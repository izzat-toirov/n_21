import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User){}
  async create(createUserDto: CreateUserDto) {
    const hash = await bcrypt.hash(createUserDto.password_hash, 10);
    const { password_hash, ...rest } = createUserDto;
  
    return this.userModel.create({
      ...rest,
      password_hash: hash
    });
  }
  

  async findAll() {
    return await this.userModel.findAll({include: {all:true}});
  }

  async findOne(id: number) {
    return await this.userModel.findByPk(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userModel.update(updateUserDto, {
      where: {id}, returning: true
    });
  }

  async remove(id: number) {
    const deleted = await this.userModel.destroy({where: {id}});
    if(deleted === 0){
      throw new Error(`${id} not found`);
      
    }
    return { message: "Delete succcusfully" };
  }
}

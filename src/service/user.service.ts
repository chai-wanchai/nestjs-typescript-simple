import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRegisterDto } from '../dto/auth/auth.dto';
import { Repository } from 'typeorm';
import { UserEntity } from '../model/user.entity';
export type User = any;
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) { }
  async getAllUsers(): Promise<any[]> {
    const result = await this.userRepo.find()
    return result;
  }
  async findOne(username: string): Promise<User> {
    const result = await this.userRepo.findOne({ username: username })
    return result;
  }
  async findOneWithPassword(username: string): Promise<User> {
    const result = await this.userRepo.findOne({ username: username }, { select: ["password","username","id"] })
    return result;
  }
  async registerUser(userDto: UserRegisterDto): Promise<any> {
    const user = new UserEntity()
    user.username = userDto.username
    user.password = userDto.password
    const result = await this.userRepo.insert(user)
    return result.raw;
  }
}

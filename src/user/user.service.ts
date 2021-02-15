import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      select: ['userId', 'name', 'email', 'isActive', 'created'],
    });
  }

  async create(createUserDto: CreateUserDto): Promise<any> {
    return await this.userRepository.save(createUserDto);
  }

  async findOne(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      select: ['userId', 'name', 'email', 'isActive', 'created'],
      where: { userId },
    });
    if (user === undefined) {
      throw new NotFoundException(`userId ${userId} is not found`);
    }
    return user;
  }

  async remove(userId: string): Promise<DeleteResult> {
    await this.findOne(userId);
    return await this.userRepository.delete(userId);
  }

  async update(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    await this.findOne(userId);
    return await this.userRepository.update(userId, updateUserDto);
  }
}

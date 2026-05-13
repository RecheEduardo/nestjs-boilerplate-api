/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public create(createUser: CreateUserDto): User {
    try {
      return this.userRepository.create(createUser);
    } catch (error) {
      throw new BadRequestException('Failed to create user');
    }
  }

  public findAll() {
    try {
      return this.userRepository.findAll();
    } catch (error) {
      throw new BadRequestException('Failed to find users');
    }
  }

  public findOne(id: string): User {
    try {
      return this.userRepository.findOne(id);
    } catch (error) {
      throw new BadRequestException('Failed to find user');
    }
  }

  public update(id: string, updateUserDto: UpdateUserDto) {
    try {
      return this.userRepository.update(id, updateUserDto);
    } catch (error) {
      throw new BadRequestException('Failed to update user');
    }
  }

  public remove(id: string) {
    try {
      return this.userRepository.remove(id);
    } catch (error) {
      throw new BadRequestException('Failed to remove user');
    }
  }
}

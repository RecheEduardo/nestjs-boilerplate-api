import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsUUIDParam } from '@/common/decorators/is-uuidparam.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@IsUUIDParam('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@IsUUIDParam('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@IsUUIDParam('id') id: string) {
    return this.userService.remove(id);
  }
}

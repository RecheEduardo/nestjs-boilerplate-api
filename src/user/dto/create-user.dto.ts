import { IsStrongPassword } from '@/common/decorators/is-strong-password.decorator';
import { UserCreatableInterface } from '../interfaces';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto implements UserCreatableInterface {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'O username do usuário' })
  username!: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  @ApiProperty({ type: String, description: 'A senha do usuário' })
  password!: string;

  @IsString()
  @ApiProperty({ type: String, description: 'O nome do usuário' })
  firstName!: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'O sobrenome do usuário' })
  lastName!: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  @ApiProperty({ type: String, description: 'O email do usuário' })
  email!: string;
}

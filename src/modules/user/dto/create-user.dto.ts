import { IsStrongPassword } from '@/common/decorators/is-strong-password.decorator';
import { UserCreatableInterface } from '../interfaces';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto implements UserCreatableInterface {
  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password!: string;

  @IsString()
  firstName!: string;

  @IsString()
  @IsOptional()
  lastName!: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email!: string;
}

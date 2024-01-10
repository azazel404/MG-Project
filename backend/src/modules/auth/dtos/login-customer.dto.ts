import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginCustomerDto {
  @ApiProperty({
    example: 'email@email.com',
    description: 'The email of new user.',
    type: String,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'super_secret_password',
    type: String,
  })
  @IsNotEmpty()
  password: string;
}

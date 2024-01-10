import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterCustomerDto {
  @ApiProperty({
    example: 'jhohn',
    type: String,
  })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    type: String,
  })
  lastName: string;

  @ApiProperty({
    example: '0826262399',
    type: String,
  })
  @IsNotEmpty()
  phoneNumber: string;

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

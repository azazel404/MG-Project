import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
  @ApiProperty({
    example: 'email@email.com',
    description: 'The email of new user.',
    type: String,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  // 💡 See here. Add this decorator
  @ApiProperty({
    example: 'super_secret_password',
    // description: 'The password of new user.',
    type: String,
  })
  @IsNotEmpty()
  password: string;

  // 💡 See here. Add this decorator
  @ApiProperty({
    example: 'John ',
    // description: 'The fistname  of new user.',
    type: String,
  })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    // description: 'The lastname  of new user.',
    type: String,
  })
  lastName: string;
  username: string;

  @ApiProperty({
    example: '0826262399',
    // description: 'The phone number of new user.',
    type: String,
  })
  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  role: string;
}

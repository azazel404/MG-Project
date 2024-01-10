import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CustomerDto {
  @ApiProperty({
    example: 'link_to_photo',
    type: String,
  })
  photo: string;

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

  @ApiProperty({
    example: 'Indonesia',
    type: String,
  })
  country: string;

  @ApiProperty({
    example: 'Jakarta',
    type: String,
  })
  city: string;

  @ApiProperty({
    example: 'Jakarta Selatan',
    type: String,
  })
  state: string;

  @ApiProperty({
    example: 'Jl. Jend. Sudirman',
    type: String,
  })
  address: string;

  @ApiProperty({
    example: '12345',
    type: String,
  })
  zipCode: string;
}

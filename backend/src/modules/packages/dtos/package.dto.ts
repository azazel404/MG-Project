import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PackageDto {
  @ApiProperty({
    example: 'How to be a good programmer',
    type: String,
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'This is a description',
    type: String,
  })
  description: string;

  @ApiProperty({
    example: 'This is a price package',
    type: String,
  })
  @IsNotEmpty()
  price: string;

  @ApiProperty({
    example: '(gold/silver/bronze)',
    type: String,
  })
  type: string;
}

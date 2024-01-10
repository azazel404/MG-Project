import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class EventDto {
  @ApiProperty({
    example: 'link_to_photo',
    type: String,
  })
  banner: string;

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
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: '2021-01-01',
    type: Date,
  })
  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    example: '3 Tampines Grande, Level 1, Singapore 528799',
    type: String,
  })
  location: string;
}

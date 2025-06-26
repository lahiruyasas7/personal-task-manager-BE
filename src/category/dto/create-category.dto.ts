import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ description: 'The Name of the category', example: 'Food' })
  @IsNotEmpty()
  @IsString()
  categoryName: string;

  @ApiProperty({
    description: 'The user id',
    example: '8c5ed00e-863a-4cf8-b33d-6d7218618cb3',
  })
  @IsString()
  @IsNotEmpty()
  user: string;
}

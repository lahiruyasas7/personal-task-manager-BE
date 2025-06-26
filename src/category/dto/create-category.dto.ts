import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ description: 'The Name of the category', example: 'Food' })
  @IsNotEmpty()
  @IsString()
  categoryName: string;

  @ApiProperty({ description: 'The user id', example: '' })
  @IsString()
  @IsNotEmpty()
  user: string;
}

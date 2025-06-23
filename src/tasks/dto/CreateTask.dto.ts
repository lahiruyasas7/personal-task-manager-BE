import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { TaskStatusEnum } from 'src/schemas/enum';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Title of the task',
    example: 'Complete project report',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Detailed description of the task',
    example: 'Prepare the final presentation and submit the PDF report',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Status of the task',
    enum: TaskStatusEnum,
    example: TaskStatusEnum.PENDING,
  })
  @IsEnum(TaskStatusEnum)
  status: TaskStatusEnum;

  @ApiProperty({
    description: 'Due date in ISO 8601 format',
    example: '2025-07-01T15:30:00Z',
  })
  @IsISO8601()
  @IsNotEmpty()
  dueDate: string;

  @ApiProperty({
    description: 'ID of the user who owns the task',
    example: 'user_123456',
  })
  @IsString()
  @IsNotEmpty()
  user: string; // userId

  @ApiProperty({
    description: 'ID of the category the task belongs to',
    example: 'category_abc123',
  })
  @IsString()
  @IsNotEmpty()
  category: string; // categoryId
}

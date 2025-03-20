import { IsDate, IsEnum, IsISO8601, IsNotEmpty, IsString } from 'class-validator';
import { TaskStatusEnum } from 'src/schemas/enum';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(TaskStatusEnum)
  status: TaskStatusEnum;

  @IsISO8601()
  @IsNotEmpty()
  dueDate: string;
}

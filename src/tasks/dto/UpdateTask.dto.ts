import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './CreateTask.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}

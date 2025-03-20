import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from 'src/schemas/tasks.scehma';
import { CreateTaskDto } from './dto/CreateTask.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async createTask(createTaskDto: CreateTaskDto) {
    const newTask = new this.taskModel(createTaskDto);
    return await newTask.save();
  }
}

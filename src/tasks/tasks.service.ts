import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from 'src/schemas/tasks.scehma';
import { CreateTaskDto } from './dto/CreateTask.dto';
import { User } from 'src/schemas/user.schema';
import { Category } from 'src/schemas/category.schema';
import { UpdateTaskDto } from './dto/UpdateTask.dto';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto) {
    const { user, category, ...rest } = createTaskDto;
    const existingUser = await this.userModel.findOne({ _id: user });
    if (!existingUser) {
      throw new ConflictException('User not exist');
    }
    const existingCategory = await this.categoryModel.findOne({
      _id: category,
    });
    if (!existingCategory) {
      throw new ConflictException('Category not exist');
    }
    const newTask = new this.taskModel(createTaskDto);
    return await newTask.save();
  }

  async getAllTasks() {
    const data = await this.taskModel.find();
    return data;
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    try {
      const existingTask = await this.taskModel.findById(id);

      if (!existingTask) {
        throw new NotFoundException('task not found');
      }

      await this.taskModel.findByIdAndUpdate(id, updateTaskDto, {
        new: true, // Returns the updated document
        runValidators: true, // Ensures validation rules are applied
      });
    } catch (error) {
      this.logger.error(error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }
}

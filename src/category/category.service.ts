import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/schemas/category.schema';
import { User } from 'src/schemas/user.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name);
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    const { user, ...rest } = createCategoryDto;
    const existingUser = await this.userModel.findOne({ _id: user });
    if (!existingUser) {
      throw new ConflictException('User not exist');
    }
    const newCategory = new this.categoryModel(createCategoryDto);
    return await newCategory.save();
  }

  async getAllCategoryByUserId(userId: string) {
    try {
      const existingUser = await this.userModel.findById(userId);

      if (!existingUser) {
        throw new NotFoundException('user not exist');
      }

      const categories = await this.categoryModel.find({ user: userId });

      return categories;
    } catch (error) {
      this.logger.error(error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }

  async getCategoryById(id: string) {
    try {
      const existingCategory = await this.categoryModel
        .findById(id)
        .populate({ path: 'task', model: 'Task' })
        .exec();

      if (!existingCategory) {
        throw new NotFoundException('category not found');
      }

      return existingCategory;
    } catch (error) {
      this.logger.error(error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const existingCategory = await this.categoryModel.findById(id);

      if (!existingCategory) {
        throw new NotFoundException('category not found');
      }

      await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, {
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

  async deleteCategory(id: string) {
    try {
      const existingTask = await this.categoryModel.findById(id);
      if (!existingTask) {
        throw new NotFoundException('task not found');
      }
      await this.categoryModel.deleteOne({ _id: id });

      return { message: 'Category deleted successfully' };
    } catch (error) {
      this.logger.error(error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }
}

import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/schemas/category.schema';
import { User } from 'src/schemas/user.schema';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
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
}

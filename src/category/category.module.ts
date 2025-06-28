import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/schemas/category.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { Task, TaskSchema } from 'src/schemas/tasks.scehma';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Task.name,
        schema: TaskSchema,
      },
    ]),
    AuthModule,
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}

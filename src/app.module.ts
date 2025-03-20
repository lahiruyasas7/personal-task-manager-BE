import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/personal_task_manager_db'), TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

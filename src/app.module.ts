import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/personal_task_manager_db'),
    TasksModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true, // Ensures ConfigService is available globally
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

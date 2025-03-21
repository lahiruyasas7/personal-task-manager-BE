import { Module } from '@nestjs/common';
import { AuthService, JWTAuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { Task, TaskSchema } from 'src/schemas/tasks.scehma';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService], // Inject ConfigService
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '24h' },
      }),
    }),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Task.name,
        schema: TaskSchema,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JWTAuthService],
})
export class AuthModule {}

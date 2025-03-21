import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { RegisterUserDto } from './dto/registerUser.dtp';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  private logger: Logger = new Logger(AuthService.name);
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(registerUserDto: RegisterUserDto) {
    try {
      const { userName, email, password } = registerUserDto;

      // hash password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      // Check existing user
      const existingUser = await this.userModel.findOne({ email });
      if (existingUser) {
        throw new ConflictException('Email is already in use');
      }
      const newUser = new this.userModel({
        userName,
        email,
        password: hashedPassword,
      });

      return await newUser.save();
    } catch (error) {
      this.logger.error(`register ${error}`);

      // conflict errors
      if (error instanceof ConflictException) {
        throw error;
      }
      // catch errors
      throw new UnauthorizedException('Failed to register new user');
    }
  }

  async userLogin(loginUserDto: LoginUserDto) {
    try {
      this.logger.debug('login user');

      const { email, password } = loginUserDto;

      const existingUser = await this.userModel.findOne({ email });
      if (!existingUser) {
        throw new ConflictException('user not found');
      }

      //check password
      const isValidPassword = await bcrypt.compare(
        password,
        existingUser.password,
      );

      if (!isValidPassword) {
        throw new ConflictException('Invalid Password');
      }

      //jwt payload
      const payload = {
        userId: existingUser._id,
        email: existingUser.email,
      };

      //create jwt token
      const token = this.jwtService.sign(payload, { expiresIn: '24h' });

      return { payload, token };
    } catch (error) {
      this.logger.error(`login ${error}`);
      // conflict errors
      if (error instanceof ConflictException) {
        throw error;
      }
      // catch errors
      throw new UnauthorizedException('Failed to login');
    }
  }
}

@Injectable()
export class JWTAuthService {
  constructor(
    private configService: ConfigService,
    private readonly jwtServ: JwtService,
  ) {}

  validateToken(token: string) {
    return this.jwtServ.verify(token, {
      secret: process.env.JWT_SECRET,
    });
  }
}

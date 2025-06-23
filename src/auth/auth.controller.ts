import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registerUser.dtp';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/create')
  @ApiOperation({ summary: 'User Login' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully Registered.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  createTask(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.registerUser(registerUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'User Login' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully Login.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @HttpCode(200)
  async login(@Body() loginAuthDto: LoginUserDto) {
    return this.authService.userLogin(loginAuthDto);
  }
}

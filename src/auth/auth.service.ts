import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {}

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

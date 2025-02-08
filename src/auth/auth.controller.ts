import {
  Controller,
  Post,
  Body,
  Inject,
  UnauthorizedException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { JwtAuthGuard } from 'src/helper/auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Post('register')
  async register(@Body() body: { username: string; password: string }) {
    return this.usersService.createUser(body.username, body.password);
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );

    const existingToken = await this.cacheManager.get(
      `user_session_${user.id}`,
    );

    if (existingToken) {
      throw new UnauthorizedException('Bạn đã đăng nhập trên thiết bị khác.');
    }

    const accessToken = await this.authService.login(user);

    await this.cacheManager.set(`user_session_${user.id}`, accessToken, 86400);

    return accessToken;
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Request() req) {
    const userId = req.user.userId;
    await this.cacheManager.del(`user_session_${userId}`);
    return { message: 'Đăng xuất thành công' };
  }
}

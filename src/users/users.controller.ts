import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/helper/auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { RolesGuard } from 'src/helper/auth/roles.guard';
import { Roles } from 'src/helper/auth/roles.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @Roles('admin')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}

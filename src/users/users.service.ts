import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async createUser(username: string, password: string): Promise<User> {
    const checkDuplicateUsername = await this.findByUsername(username);
    if (checkDuplicateUsername) {
      throw new BadRequestException('Username already exists');
    }
    const user = new User();
    user.username = username;
    user.password = password;
    await user.hashPassword();
    return this.usersRepository.save(user);
  }
}

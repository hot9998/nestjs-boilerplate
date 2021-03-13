import { BadRequestException, Injectable } from '@nestjs/common';
import { User, UserService } from '../../modules/user';
import { JwtService } from '@nestjs/jwt';
import { HashUtil } from '../../util/hashUtil.ts';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async createToekn(user: User) {
    return {
      accessToken: this.jwtService.sign({ id: user.userId }),
      user,
    };
  }

  async login(loginDto: LoginDto) {
    const { userId, password } = loginDto;
    const user = await this.validateUser(userId, password);
    return user;
  }

  async validateUser(userId: string, password: string): Promise<any> {
    const user = await this.userService.findOneByUserId(userId);
    if (!user) {
      throw new BadRequestException('User not exist');
    }
    if (!HashUtil.compare(password, user.password)) {
      throw new BadRequestException('Password not macth');
    }
    return user;
  }
}

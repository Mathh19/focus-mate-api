import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register-dts';
import { LoginDto } from './dto/login.dto';
import { UnauthorizedException, BadRequestException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async register(registerDto: RegisterDto) {
    const { username, email, password, profile, profile_url } = registerDto;

    if (username.length < 2) {
      throw new BadRequestException('Username must have at least 2 characters.')
    }

    if (password.length < 6) {
      throw new BadRequestException('Password must have at least 6 characters.');
    }

    const hashedPassword = await hash(password, 10);

    const user = await this.userService.createUser({
      username,
      email,
      password: hashedPassword,
      profile,
      profile_url
    });

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMerge = await compare(password, user.password);

    if (!isPasswordMerge) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }
} 

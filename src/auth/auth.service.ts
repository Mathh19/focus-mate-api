import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { BadRequestException } from '@nestjs/common';
import { SettingService } from 'src/setting/setting.service';
import { LoginGoogleDto } from './dto/login-google.dto';
import { RegisterGoogleDto } from './dto/register-google.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private settingService: SettingService
  ) { }

  async register(registerDto: RegisterDto) {
    const { username, email, password, avatar } = registerDto;

    const hasUser = await this.userService.findByEmail(email);

    if (hasUser) {
      throw new BadRequestException('This user already exists');
    }

    if (username.length < 2 || username.length > 25) {
      throw new BadRequestException('username must have between 2 and 25 characters.')
    }

    if (!password) {
      throw new BadRequestException('password is required.');
    }

    if (password.length < 8) {
      throw new BadRequestException('Your password must be at least 8 characters.');
    }

    const hashedPassword = await hash(password, 10);

    const user = await this.userService.createUser({
      username,
      email,
      password: hashedPassword,
      avatar
    });

    await this.settingService.create(String(user._id));

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    const isPasswordMerge = await compare(password, user.password);

    if (!isPasswordMerge) {
      throw new BadRequestException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  async loginGoogle(loginGoogleDto: LoginGoogleDto) {

    const { email } = loginGoogleDto;

    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  async registerGoogle(registerGoogleDto: RegisterGoogleDto) {
    const { username, email, avatar } = registerGoogleDto;

    const hasUser = await this.userService.findByEmail(email);

    if (hasUser) {
      throw new BadRequestException('This user already exists');
    }

    if (username.length < 2 || username.length > 25) {
      throw new BadRequestException('username must have between 2 and 25 characters.')
    }

    const user = await this.userService.createUser({
      username,
      email,
      avatar
    });

    await this.settingService.create(String(user._id));

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }
} 

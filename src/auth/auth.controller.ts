import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register-dts';
import { NoAuth } from 'src/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @NoAuth()
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @NoAuth()
  @Get('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
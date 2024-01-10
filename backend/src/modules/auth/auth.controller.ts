import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { LoginCustomerDto } from './dtos/login-customer.dto';
import { LoginResponse } from './interfaces/login.interface';
import { RegisterCustomerDto } from './dtos/register-customer.dto';
import { Public } from 'src/common/decorator/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login/user')
  loginUser(@Body() request: LoginUserDto): Promise<LoginResponse> {
    return this.authService.loginUser(request);
  }

  @Public()
  @Post('login/customer')
  loginCustomer(@Body() request: LoginCustomerDto): Promise<LoginResponse> {
    return this.authService.loginCustomer(request);
  }

  @Public()
  @Post('register/customer')
  registerCustomer(@Body() request: RegisterCustomerDto): Promise<object> {
    return this.authService.registerCustomer(request);
  }
}

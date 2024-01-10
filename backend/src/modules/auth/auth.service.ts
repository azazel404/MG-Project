import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/core/services/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dtos/login-user.dto';
import { LoginCustomerDto } from './dtos/login-customer.dto';
import { RegisterCustomerDto } from './dtos/register-customer.dto';
import { compare } from 'bcrypt';
import {
  LoginResponse,
  UserPayload,
  CustomerPayload,
} from './interfaces/login.interface';
import { hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async loginUser(request: LoginUserDto): Promise<LoginResponse> {
    try {
      // find user by email
      const user = await this.prisma.users.findUnique({
        where: { email: request.email },
      });

      // check if user exists
      if (!user) {
        throw new NotFoundException('User not found');
      }

      // check if password is correct by comparing it with the hashed password in the database
      if (!(await compare(request.password, user.password))) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload: UserPayload = {
        // create payload for JWT
        sub: user.id, // sub is short for subject. It is the user id
        email: user.email,
        name: user.firstName + ' ' + user.lastName,
        role: user.role,
      };

      return {
        // return access token
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      // throw error if any
      // throw new HttpException(error, 500);
      throw new HttpException(error, error.status);
    }
  }

  async loginCustomer(request: LoginCustomerDto): Promise<LoginResponse> {
    try {
      // find customer by email
      const customer = await this.prisma.customers.findUnique({
        where: { email: request.email },
      });

      // check if user exists
      if (!customer) {
        throw new NotFoundException('Customer not found');
      }

      // check if password is correct by comparing it with the hashed password in the database
      if (!(await compare(request.password, customer.password))) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload: CustomerPayload = {
        // create payload for JWT
        sub: customer.id, // sub is short for subject. It is the user id
        email: customer.email,
        name: customer.firstName + ' ' + customer.lastName,
        role: 'customer',
      };

      return {
        // return access token
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      // throw error if any
      // throw new HttpException(error, 500);
      throw new HttpException(error, error.status);
    }
  }

  async registerCustomer(request: RegisterCustomerDto): Promise<object> {
    try {
      const payload = {
        ...request,
        password: await hash(request.password, 10), // hash user's password
      };
      const newCustomers = await this.prisma.customers.create({
        data: payload,
      });
      delete newCustomers.password;
      return {
        message: 'The record has been successfully created',
        data: newCustomers,
      };
    } catch (error) {
      if (error.code === 'P2002') {
        if (error.meta.target.includes('email')) {
          throw new ConflictException('Email already registered');
        } else if (error.meta.target.includes('phoneNumber')) {
          throw new ConflictException('Phone number already registered');
        }
      }
      throw new HttpException(error, 500);
    }
  }
}

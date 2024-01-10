import {
  HttpException,
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/core/services/prisma.service';
import { Customers } from '@prisma/client';
import {
  IQueryPagination,
  IPaginateOutput,
} from 'src/interfaces/query-pagination.interface';
import { paginate, paginateOutput } from 'src/common/utils/pagination.utils';
import { hash } from 'bcrypt';
import { CustomerDto } from './dtos/customer.dto';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async get(query?: IQueryPagination): Promise<IPaginateOutput<Customers>> {
    const customers = await this.prisma.customers.findMany({
      ...paginate(query),
    });
    const manipalutedCustomers = customers.map((cust) => {
      delete cust.password;
      return cust;
    });
    const total = await this.prisma.customers.count();
    return paginateOutput<Customers>(manipalutedCustomers, total, query);
  }

  async find(id: number): Promise<CustomerDto> {
    try {
      const customer = await this.prisma.customers.findUniqueOrThrow({
        where: { id },
      });
      delete customer.password;
      return customer;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      // throw error if any
      throw new HttpException(error, 500);
    }
  }

  async create(request: CustomerDto): Promise<object> {
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

  async update(id: number, request: CustomerDto): Promise<object> {
    try {
      // find user by id. If not found, throw error
      await this.prisma.customers.findUniqueOrThrow({
        where: { id },
      });
      // update user using prisma client
      const payload = {
        ...request,
        // if password is provided, hash it
        password: request.password
          ? await hash(request.password.toString(), 10)
          : '',
      };
      const updatedCustomer = await this.prisma.users.update({
        where: { id },
        data: payload,
      });
      // remove password from response
      delete updatedCustomer.password;
      return {
        message: 'The record has been successfully updated',
        data: updatedCustomer,
      };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with id ${id} not found`);
      }
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

  async softDelete(id: number): Promise<object> {
    try {
      await this.prisma.customers.findUniqueOrThrow({
        where: { id },
      });
      await this.prisma.customers.update({
        where: { id },
        data: {
          isDeleted: true,
        },
      });

      return {
        message: 'The record has been successfully deleted',
      };
    } catch (error) {
      // check if user not found and throw error
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      // throw error if any
      throw new HttpException(error, 500);
    }
  }
}

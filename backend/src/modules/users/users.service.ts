import {
  HttpException,
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/core/services/prisma.service';
import { Users } from '@prisma/client';
import { UserDto } from './dtos/user.dto';
import { hash } from 'bcrypt';
import {
  IQueryPagination,
  IPaginateOutput,
} from 'src/interfaces/query-pagination.interface';
import { paginate, paginateOutput } from 'src/common/utils/pagination.utils';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  //   async get(params: {
  //     skip?: number;
  //     take?: number;
  //     cursor?: Prisma.UsersWhereUniqueInput;
  //     where?: Prisma.UsersWhereInput;
  //     orderBy?: Prisma.UsersOrderByWithRelationInput;
  //   }): Promise<Users[]> {
  //     const { skip, take, cursor, where, orderBy } = params;
  //     return this.prisma.users.findMany({
  //       skip,
  //       take,
  //       cursor,
  //       where,
  //       orderBy,
  //     });
  //   }

  async get(query?: IQueryPagination): Promise<IPaginateOutput<Users>> {
    const users = await this.prisma.users.findMany({
      ...paginate(query),
    });

    const manipulatedUsers = users.map((user) => {
      delete user.password;
      return user;
    });
    const total = await this.prisma.users.count();
    return paginateOutput<Users>(manipulatedUsers, total, query);
  }

  async find(id: number): Promise<Users> {
    try {
      // find user by id. If not found, throw error
      const user = await this.prisma.users.findUniqueOrThrow({
        where: { id },
      });
      delete user.password;
      return user;
    } catch (error) {
      // check if user not found and throw error
      console.log(error);
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      // throw error if any
      throw new HttpException(error, 500);
    }
  }

  async create(data: UserDto): Promise<object> {
    try {
      // create new user using prisma client
      const payload = {
        ...data,
        email: data.email,
        password: await hash(data.password, 10), // hash user's password
      };
      const newUser = await this.prisma.users.create({
        data: payload,
      });
      // remove password from response
      delete newUser.password;
      return {
        message: 'The record has been successfully created',
        data: newUser,
      };
    } catch (error) {
      // check if email already registered and throw error
      if (error.code === 'P2002') {
        if (error.meta.target.includes('email')) {
          throw new ConflictException('Email already registered');
        } else if (error.meta.target.includes('phoneNumber')) {
          throw new ConflictException('Phone number already registered');
        }
      }
      // throw error if any
      throw new HttpException(error, 500);
    }
  }

  async update(id: number, updateUserDto: UserDto): Promise<object> {
    try {
      // find user by id. If not found, throw error
      await this.prisma.users.findUniqueOrThrow({
        where: { id },
      });
      // update user using prisma client
      const payload = {
        ...updateUserDto,
        // if password is provided, hash it
        password: updateUserDto.password
          ? await hash(updateUserDto.password.toString(), 10)
          : '',
        // ...(updateUserDto.password && {
        //   password: await hash(updateUserDto.password, 10),
        // }),
      };
      const updatedUser = await this.prisma.users.update({
        where: { id },
        data: payload,
      });
      // remove password from response
      delete updatedUser.password;
      return {
        message: 'The record has been successfully updated',
        data: updatedUser,
      };
    } catch (error) {
      // check if user not found and throw error
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      // check if email already registered and throw error
      if (error.code === 'P2002') {
        if (error.meta.target.includes('email')) {
          throw new ConflictException('Email already registered');
        } else if (error.meta.target.includes('phoneNumber')) {
          throw new ConflictException('Phone number already registered');
        }
      }
      // throw error if any
      throw new HttpException(error, 500);
    }
  }

  async delete(id: number): Promise<object> {
    try {
      // find user by id. If not found, throw error
      await this.prisma.users.findUniqueOrThrow({
        where: { id },
      });

      // delete user using prisma client
      await this.prisma.users.delete({
        where: { id },
      });

      return {
        message: 'The record has been successfully deleted',
      };
    } catch (error) {
      // check if user not found and throw error
      console.log(error);
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      // throw error if any
      throw new HttpException(error, 500);
    }
  }
}

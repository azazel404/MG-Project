import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/services/prisma.service';
import {
  IQueryPagination,
  IPaginateOutput,
} from 'src/interfaces/query-pagination.interface';
import { paginate, paginateOutput } from 'src/common/utils/pagination.utils';
import { Packages, Prisma } from '@prisma/client';

@Injectable()
export class PackagesService {
  constructor(private prisma: PrismaService) {}

  async get(query?: IQueryPagination): Promise<IPaginateOutput<Packages>> {
    const data = await this.prisma.packages.findMany({
      ...paginate(query),
    });
    const total = await this.prisma.packages.count();
    return paginateOutput<Packages>(data, total, query);
  }

  async find(id: number): Promise<Packages> {
    try {
      const data = await this.prisma.packages.findUniqueOrThrow({
        where: { id },
      });
      return data;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Package with id ${id} not found`);
      }
      // throw error if any
      throw new HttpException(error, 500);
    }
  }

  async create(request: Prisma.PackagesCreateInput): Promise<object> {
    try {
      const payload = {
        ...request,
      };
      const newEvents = await this.prisma.packages.create({
        data: payload,
      });
      return {
        message: 'The record has been successfully created',
        data: newEvents,
      };
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async update(
    id: number,
    request: Prisma.PackagesUpdateInput,
  ): Promise<object> {
    try {
      // find user by id. If not found, throw error
      await this.prisma.packages.findUniqueOrThrow({
        where: { id },
      });
      // update user using prisma client
      const payload = {
        ...request,
      };
      const updateData = await this.prisma.packages.update({
        where: { id },
        data: payload,
      });
      // remove password from response
      return {
        message: 'The record has been successfully updated',
        data: updateData,
      };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Package with id ${id} not found`);
      }
      throw new HttpException(error, 500);
    }
  }

  async delete(id: number): Promise<object> {
    try {
      await this.prisma.packages.findUniqueOrThrow({
        where: { id },
      });

      await this.prisma.packages.delete({
        where: { id },
      });
      return {
        message: 'The record has been successfully deleted',
      };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Package with id ${id} not found`);
      }
      throw new HttpException(error, 500);
    }
  }
}

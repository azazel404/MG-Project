import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/services/prisma.service';
import {
  IQueryPagination,
  IPaginateOutput,
} from 'src/interfaces/query-pagination.interface';
import { paginate, paginateOutput } from 'src/common/utils/pagination.utils';
import { Events } from '@prisma/client';
import { EventDto } from './dtos/event.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async get(query?: IQueryPagination): Promise<IPaginateOutput<Events>> {
    const events = await this.prisma.events.findMany({
      ...paginate(query),
    });
    const total = await this.prisma.events.count();
    return paginateOutput<Events>(events, total, query);
  }

  async find(id: number): Promise<Events> {
    try {
      const events = await this.prisma.events.findUniqueOrThrow({
        where: { id },
      });
      return events;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Events with id ${id} not found`);
      }
      // throw error if any
      throw new HttpException(error, 500);
    }
  }

  async create(request: EventDto): Promise<object> {
    try {
      const payload = {
        ...request,
      };
      const newEvents = await this.prisma.events.create({
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

  async update(id: number, request: EventDto): Promise<object> {
    try {
      // find user by id. If not found, throw error
      await this.prisma.events.findUniqueOrThrow({
        where: { id },
      });
      // update user using prisma client
      const payload = {
        ...request,
      };
      const updatedEvent = await this.prisma.events.update({
        where: { id },
        data: payload,
      });
      // remove password from response
      return {
        message: 'The record has been successfully updated',
        data: updatedEvent,
      };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Event with id ${id} not found`);
      }
      throw new HttpException(error, 500);
    }
  }

  async delete(id: number): Promise<object> {
    try {
      await this.prisma.events.findUniqueOrThrow({
        where: { id },
      });

      await this.prisma.events.delete({
        where: { id },
      });
      return {
        message: 'The record has been successfully deleted',
      };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Event with id ${id} not found`);
      }
      throw new HttpException(error, 500);
    }
  }
}

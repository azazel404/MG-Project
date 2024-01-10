import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  //   Request,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { Events as EventModel } from '@prisma/client';
import { EventDto } from './dtos/event.dto';
import {
  IQueryPagination,
  IPaginateOutput,
} from 'src/interfaces/query-pagination.interface';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorator/public.decorator';
import { Roles } from 'src/common/decorator/role.decorator';
import { RolesGuard } from 'src/common/guard/roles.guard';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get('/')
  @Roles(['Admin'])
  @UseGuards(RolesGuard)
  async getAllEvent(
    @Query() query?: IQueryPagination,
  ): Promise<IPaginateOutput<EventModel>> {
    return this.eventsService.get(query);
  }

  @Post('create')
  @Roles(['Admin'])
  @UseGuards(RolesGuard)
  async createEvent(@Body() payload: EventDto): Promise<object> {
    return this.eventsService.create(payload);
  }

  @Public()
  @Get(':id')
  @Roles(['Admin'])
  @UseGuards(RolesGuard)
  async getEvent(@Param('id', ParseIntPipe) id: number): Promise<EventModel> {
    return this.eventsService.find(+id);
  }

  @Put(':id')
  @Roles(['Admin'])
  @UseGuards(RolesGuard)
  async updatEvent(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: EventDto,
  ): Promise<object> {
    return this.eventsService.update(+id, payload);
  }

  @Delete(':id')
  @Roles(['Admin'])
  @UseGuards(RolesGuard)
  async deleteEvent(@Param('id', ParseIntPipe) id: number): Promise<object> {
    return this.eventsService.delete(+id);
  }
}

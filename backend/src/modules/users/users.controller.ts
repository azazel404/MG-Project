import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Request,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Users as UsersModel } from '@prisma/client';
import { UserDto } from './dtos/user.dto';
import { ExpressRequestWithUser } from './interfaces/user.interface';
import { UserPayload } from '../auth/interfaces/login.interface';
import {
  IQueryPagination,
  IPaginateOutput,
} from 'src/interfaces/query-pagination.interface';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Public } from 'src/common/decorator/public.decorator';
import { Roles } from 'src/common/decorator/role.decorator';
import { RolesGuard } from 'src/common/guard/roles.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  @Roles(['Admin'])
  @UseGuards(RolesGuard)
  async getUsers(
    @Query() query?: IQueryPagination,
  ): Promise<IPaginateOutput<UsersModel>> {
    return this.usersService.get(query);
  }

  @Get('me')
  getMe(@Request() req: ExpressRequestWithUser): UserPayload {
    return req.user;
  }

  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: UserDto,
  })
  @Public()
  @Post('create')
  async createUser(@Body() userData: UserDto): Promise<object> {
    return this.usersService.create(userData);
  }

  @Get(':id')
  @Roles(['Admin'])
  @UseGuards(RolesGuard)
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<UsersModel> {
    return this.usersService.find(+id);
  }

  @Put(':id')
  @Roles(['Admin'])
  @UseGuards(RolesGuard)
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() userData: UserDto,
  ): Promise<object> {
    return this.usersService.update(+id, userData);
  }

  @Delete(':id')
  @Roles(['Admin'])
  @UseGuards(RolesGuard)
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<object> {
    return this.usersService.delete(+id);
  }
}

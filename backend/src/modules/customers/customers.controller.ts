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
} from '@nestjs/common';
import { CustomerDto } from './dtos/customer.dto';
import { Customers as CustomersModel } from '@prisma/client';
import { CustomersService } from './customers.service';
import {
  IQueryPagination,
  IPaginateOutput,
} from 'src/interfaces/query-pagination.interface';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Public } from 'src/common/decorator/public.decorator';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get('/')
  async getAllCustomer(
    @Query() query?: IQueryPagination,
  ): Promise<IPaginateOutput<CustomersModel>> {
    return this.customersService.get(query);
  }

  //   @Get('me')
  //   getMe(@Request() req: ExpressRequestWithUser): UserPayload {
  //     return req.user;
  //   }

  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CustomerDto,
  })
  @Public()
  @Post('create')
  async createCustomer(@Body() payload: CustomerDto): Promise<object> {
    return this.customersService.create(payload);
  }

  @Get(':id')
  async getCustomer(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CustomerDto> {
    return this.customersService.find(+id);
  }

  @Put(':id')
  async updateCustomer(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CustomerDto,
  ): Promise<object> {
    return this.customersService.update(+id, payload);
  }

  @Delete(':id')
  async deleteCustomer(@Param('id', ParseIntPipe) id: number): Promise<object> {
    return this.customersService.softDelete(+id);
  }
}

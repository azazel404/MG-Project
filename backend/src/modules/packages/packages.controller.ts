import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { PackagesService } from './packages.service';
import { Packages as PackagesModel } from '@prisma/client';
import {
  IQueryPagination,
  IPaginateOutput,
} from 'src/interfaces/query-pagination.interface';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorator/role.decorator';
import { RolesGuard } from 'src/common/guard/roles.guard';

@ApiTags('Packages')
@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Get('/')
  @Roles(['Admin'])
  @UseGuards(RolesGuard)
  async getAllPackages(
    @Query() query?: IQueryPagination,
  ): Promise<IPaginateOutput<PackagesModel>> {
    return this.packagesService.get(query);
  }

  @Post('create')
  @Roles(['Admin'])
  @UseGuards(RolesGuard)
  async createPackage(@Body() payload: PackagesModel): Promise<object> {
    return this.packagesService.create(payload);
  }

  @Get(':id')
  @Roles(['Admin'])
  @UseGuards(RolesGuard)
  async getPackage(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PackagesModel> {
    return this.packagesService.find(+id);
  }

  @Put(':id')
  @Roles(['Admin'])
  @UseGuards(RolesGuard)
  async updatePackage(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: PackagesModel,
  ): Promise<object> {
    return this.packagesService.update(+id, payload);
  }

  @Delete(':id')
  @Roles(['Admin'])
  @UseGuards(RolesGuard)
  async deletePackage(@Param('id', ParseIntPipe) id: number): Promise<object> {
    return this.packagesService.delete(+id);
  }
}

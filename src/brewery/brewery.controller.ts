import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateBreweryDTO, UpdateBreweryDTO } from '../dtos/brewery.dto';
import { BreweryEntity } from '../entities/brewery.entity';
import { BreweryService } from './brewery.service';

@Controller('brewery')
export class BreweryController {
    constructor(
        private breweryService: BreweryService,
    ) { }

    @Get('')
    @UseGuards(AuthGuard('jwt'))
    async getBreweries(
    ): Promise<BreweryEntity[]> {
        return [];
    }

    @Get('/:id')
    @UseGuards(AuthGuard('jwt'))
    async getBrewery(
        @Param('id') id: string
    ): Promise<BreweryEntity> {
        return null;
    }

    @Post('')
    @UseGuards(AuthGuard('jwt'))
    async createBrewery(
        @Body() createBreweryRequest: CreateBreweryDTO,
    ) {

    }

    @Put('/:id')
    @UseGuards(AuthGuard('jwt'))
    async updateBrewery(
        @Param('id') id: string,
        @Body() updateBreweryRequest: UpdateBreweryDTO,
    ) {

    }
}

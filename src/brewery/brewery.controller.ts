import { Body, Controller, Get, HttpException, Param, Post, Put, UseGuards } from '@nestjs/common';
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
    private async getBreweries(
    ): Promise<BreweryEntity[]> {
        return this.breweryService.getBreweries();
    }

    @Get('/beers')
    @UseGuards(AuthGuard('jwt'))
    private async getBreweriesAndBeers(
    ): Promise<BreweryEntity[]> {
        return this.breweryService.getAllBreweriesAndBeers();
    }

    @Get('/:id')
    @UseGuards(AuthGuard('jwt'))
    private async getBrewery(
        @Param('id') id: string
    ): Promise<BreweryEntity> {
        return this.breweryService.getBrewery(id);
    }

    @Post('')
    @UseGuards(AuthGuard('jwt'))
    private async createBrewery(
        @Body() createBreweryRequest: CreateBreweryDTO,
    ): Promise<BreweryEntity | HttpException> {
        return this.breweryService.createBrewery(createBreweryRequest);
    }

    @Put('/:id')
    @UseGuards(AuthGuard('jwt'))
    private async updateBrewery(
        @Param('id') id: string,
        @Body() updateBreweryRequest: UpdateBreweryDTO,
    ) {
        return this.breweryService.updateBrewery(id, updateBreweryRequest);
    }
}

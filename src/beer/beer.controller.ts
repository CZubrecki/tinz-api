import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateBeerDTO, UpdateBeerDTO } from '../dtos/beer.dto';
import { BeerEntity } from '../entities/beer.entity';
import { BeerService } from './beer.service';

@Controller('beer')
export class BeerController {
    constructor(
        private beerService: BeerService,
    ) { }

    @Get('')
    @UseGuards(AuthGuard('jwt'))
    async getBeers(): Promise<BeerEntity[]> {
        return [];
    }

    @Get('/:id')
    @UseGuards(AuthGuard('jwt'))
    async getBeer(
        @Param('id') id: string
    ): Promise<BeerEntity> {
        return null;
    }

    @Post('')
    @UseGuards(AuthGuard('jwt'))
    async createBeer(
        @Body() createBeerRequest: CreateBeerDTO,
    ) {

    }

    @Put('/:id')
    @UseGuards(AuthGuard('jwt'))
    async updateBeer(
        @Param('id') id: string,
        @Body() updateBeerRequest: UpdateBeerDTO,
    ) {

    }
}

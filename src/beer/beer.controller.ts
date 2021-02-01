import { Body, Controller, Get, HttpException, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
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
    private async getBeers(): Promise<BeerEntity[]> {
        return this.beerService.getBeers();
    }

    @Get('/:id')
    @UseGuards(AuthGuard('jwt'))
    private async getBeer(
        @Param('id') id: string
    ): Promise<BeerEntity> {
        return this.beerService.getBeer();
    }

    @Post('')
    @UsePipes(new ValidationPipe({ transform: true }))
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('image'))
    private async createBeer(
        @Body() createBeerRequest: CreateBeerDTO,
        @UploadedFile() image: any,
    ): Promise<BeerEntity | HttpException> {
        return this.beerService.createBeer(createBeerRequest);
    }

    @Put('/:id')
    @UseGuards(AuthGuard('jwt'))
    private async updateBeer(
        @Param('id') id: string,
        @Body() updateBeerRequest: UpdateBeerDTO,
    ) {
        return this.beerService.updateBeer(updateBeerRequest);
    }
}

import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BreweryService } from '../brewery/brewery.service';
import { CreateBeerDTO, UpdateBeerDTO } from '../dtos/beer.dto';
import { BeerEntity } from '../entities/beer.entity';

@Injectable()
export class BeerService {
    constructor(
        @InjectRepository(BeerEntity)
        private beerRepository: Repository<BeerEntity>,
        private breweryService: BreweryService,
    ) { }

    public async getBeers(): Promise<BeerEntity[]> {
        return await this.beerRepository.find();
    }

    public async getBeer(): Promise<BeerEntity> {
        return await this.beerRepository.findOne();
    }

    public async getBeersAndBreweries(): Promise<BeerEntity[]> {
        return await this.beerRepository.find({ relations: ['brewery'] });;
    }

    public async createBeer(createBeerRequest: CreateBeerDTO): Promise<BeerEntity | HttpException> {
        try {
            const insertResult = await this.beerRepository.insert(createBeerRequest);
            const id = insertResult.identifiers[0].id;
            const brewery = await this.breweryService.getBrewery(createBeerRequest.breweryId);
            const beer = await this.beerRepository.findOne({ id });
            beer.brewery = brewery;
            await beer.save();
            return beer;
        } catch (err) {
            return new HttpException(err.message, 409);
        }
    }

    public async updateBeer(updateBeerRequest: UpdateBeerDTO) {

    }
}

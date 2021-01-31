import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBeerDTO, UpdateBeerDTO } from '../dtos/beer.dto';
import { BeerEntity } from '../entities/beer.entity';

@Injectable()
export class BeerService {
    constructor(
        @InjectRepository(BeerEntity)
        private beerRepository: Repository<BeerEntity>,
    ) { }

    public async getBeers(): Promise<BeerEntity[]> {
        return await this.beerRepository.find();
    }

    public async getBeer(): Promise<BeerEntity> {
        return await this.beerRepository.findOne();
    }

    public async createBeer(createBeerRequest: CreateBeerDTO) {

    }

    public async updateBeer(updateBeerRequest: UpdateBeerDTO) {

    }
}

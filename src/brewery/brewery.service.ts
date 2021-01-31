import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBreweryDTO, UpdateBreweryDTO } from '../dtos/brewery.dto';
import { BreweryEntity } from '../entities/brewery.entity';

@Injectable()
export class BreweryService {
    constructor(
        @InjectRepository(BreweryEntity)
        private breweryRepository: Repository<BreweryEntity>,
    ) { }

    public async getBreweries(): Promise<BreweryEntity[]> {
        return await this.breweryRepository.find();
    }

    public async getAllBreweriesAndBeers(): Promise<BreweryEntity[]> {
        return await this.breweryRepository.find({ relations: ['beers'] });
    }

    public async getBrewery(id: string): Promise<BreweryEntity> {
        return await this.breweryRepository.findOne({ id });
    }

    public async createBrewery(createBreweryRequest: CreateBreweryDTO): Promise<BreweryEntity | HttpException> {
        try {
            const insertResult = await this.breweryRepository.insert(createBreweryRequest);
            const id = insertResult.identifiers[0].id;
            return await this.breweryRepository.findOne({ id });
        } catch (err) {
            return new HttpException(err.message, 409);
        }
    }

    public async updateBrewery(id: string, updateBreweryRequest: UpdateBreweryDTO) {
    }
}

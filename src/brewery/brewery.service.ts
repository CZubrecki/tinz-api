import { Injectable } from '@nestjs/common';
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

    public async getBrewery(): Promise<BreweryEntity> {
        return await this.breweryRepository.findOne();
    }

    public async createBrewery(createBreweryRequest: CreateBreweryDTO) {

    }

    public async updateBrewery(updateBreweryRequest: UpdateBreweryDTO) {

    }
}

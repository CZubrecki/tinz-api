import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreweryModule } from 'src/brewery/brewery.module';
import { BreweryService } from '../brewery/brewery.service';
import { BeerEntity } from '../entities/beer.entity';
import { BeerController } from './beer.controller';
import { BeerService } from './beer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BeerEntity]),
    BreweryModule,
  ],
  providers: [
    BeerService,
    BreweryService,
  ],
  controllers: [BeerController]
})
export class BeerModule { }

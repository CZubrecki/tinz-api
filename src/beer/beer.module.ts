import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BeerEntity } from '../entities/beer.entity';
import { BeerController } from './beer.controller';
import { BeerService } from './beer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BeerEntity])
  ],
  providers: [BeerService],
  controllers: [BeerController]
})
export class BeerModule { }

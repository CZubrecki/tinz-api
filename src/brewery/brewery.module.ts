import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreweryEntity } from '../entities/brewery.entity';
import { BreweryController } from './brewery.controller';
import { BreweryService } from './brewery.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BreweryEntity])
  ],
  providers: [BreweryService],
  controllers: [BreweryController],
  exports: [BreweryService, TypeOrmModule],
})
export class BreweryModule { }

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScanEntity } from '../entities/scan.entity';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ScanEntity])
  ],
  providers: [ImagesService],
  controllers: [ImagesController]
})
export class ImagesModule { }

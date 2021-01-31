import { Controller, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { User } from '../auth/user.decorator';
import { UserEntity } from '../entities/user.entity';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
    constructor(
        private imageService: ImagesService,
    ) { }

    @Post('process')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FilesInterceptor('image'))
    private async uploadFile(
        @User() user: UserEntity,
        @UploadedFiles() files: any[],
    ) {
        const file = files[0];
        if (file) {
            return await this.imageService.fileUpload(file, user);
        }
    }

}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as AWS from 'aws-sdk';
import { ScanEntity } from 'src/entities/scan.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class ImagesService {
    AWS_S3_BUCKET_NAME: string;
    S3: any;
    MIME_TYPE = 'image/jpeg';
    AWS_REGION: string;

    constructor(
        @InjectRepository(ScanEntity)
        private scanRepository: Repository<ScanEntity>,
    ) {
        this.AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
        this.AWS_REGION = process.env.COGNITO_REGION;
        this.S3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        });
    }

    public async fileUpload(file: any, user: UserEntity) {
        const uuid = uuidv4();
        const userId = user.id;
        const urlKey = `${userId}/${uuid}`;
        const params = {
            Body: file.buffer,
            Bucket: this.AWS_S3_BUCKET_NAME,
            Key: urlKey,
            ContentType: this.MIME_TYPE,
        };
        const data = await this.S3.putObject(params).promise();

        if (data) {
            const path = `https://${this.AWS_S3_BUCKET_NAME}.s3.${this.AWS_REGION}.amazonaws.com/${urlKey}`;
            const scan = new ScanEntity();
            scan.ownerId = userId;
            scan.path = path;

            await this.scanRepository.insert(scan);
        }
    }
}

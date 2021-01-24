import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
const S3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});


@Injectable()
export class ImagesService {
    AWS_S3_BUCKET_NAME: string;
    S3: any;


    constructor() {
        this.AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
        this.S3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        });
    }

    public async fileupload(file: any) {
        const urlKey = `filepath/${file.originalname}`;
        const params = {
            Body: file.buffer,
            Bucket: this.AWS_S3_BUCKET_NAME,
            Key: urlKey,
        };
        const data = await S3.putObject(params).promise();
    }
}

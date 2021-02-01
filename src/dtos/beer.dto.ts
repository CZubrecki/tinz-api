import { Transform } from "class-transformer";
import { IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

const transformStringToNumber = input => {
    return Number(input.value);
}

export class CreateBeerDTO {
    @IsDefined()
    @IsString()
    breweryId: string;

    @IsDefined()
    @IsString()
    name: string;

    @IsDefined()
    @IsString()
    style: string;

    @IsOptional()
    @IsString()
    substyle: string;

    @IsDefined()
    @IsNumber()
    @Transform(transformStringToNumber, { toClassOnly: true })
    abv: number;

    @IsDefined()
    @IsNumber()
    @Transform(transformStringToNumber, { toClassOnly: true })
    ibu: number;

    @IsOptional()
    @IsDefined()
    description: string;

    @IsOptional()
    image: any;
}

export class UpdateBeerDTO {

}
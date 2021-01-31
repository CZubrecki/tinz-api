import { IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

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
    abv: number;

    @IsDefined()
    @IsNumber()
    ibu: number;

    @IsOptional()
    @IsDefined()
    description: string;
}

export class UpdateBeerDTO {

}
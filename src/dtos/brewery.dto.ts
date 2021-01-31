import { IsDefined, IsOptional, IsString } from "class-validator";

export class CreateBreweryDTO {
    @IsDefined()
    @IsString()
    name: string;

    @IsDefined()
    @IsString()
    country: string;
}

export class UpdateBreweryDTO {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    country?: string;
}
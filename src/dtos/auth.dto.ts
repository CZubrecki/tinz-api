import { IsDefined, IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterUserDTO {
    @IsDefined()
    @IsEmail()
    @MinLength(4)
    email: string;

    @IsDefined()
    @IsString()
    @MinLength(8)
    password: string;
}
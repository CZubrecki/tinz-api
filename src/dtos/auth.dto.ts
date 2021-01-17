import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignUpDTO {
    @IsEmail()
    @IsString()
    @MinLength(4)
    email: string;

    @IsString()
    @MinLength(8)
    password: string;
}

export class SuccessSignUpDTO {
    @IsString()
    id: string;

    @IsEmail()
    @IsString()
    email: string;
}
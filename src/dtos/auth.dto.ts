import { IsDefined, IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UserCredentialsDTO {
    @IsDefined()
    @IsEmail()
    @MinLength(4)
    email: string;

    @IsDefined()
    @IsString()
    @MinLength(8)
    password: string;
}

export class ResetPasswordDTO {
    @IsDefined()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    newPassword: string;

    @IsOptional()
    @IsString()
    verificationCode: string;
}
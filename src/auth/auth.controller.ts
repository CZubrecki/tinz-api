import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDTO } from 'src/dtos/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    @Post('/sign-in')
    async signIn() {

    }

    @Post('/sign-up')
    async signUp(
        @Body() signUpDTO: SignUpDTO,
    ) {
        return this.authService.signUp(signUpDTO);
    }
}

import { Body, Controller, Post } from '@nestjs/common';
import { ResetPasswordDTO, SignUpDTO } from 'src/dtos/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    @Post('/sign-in')
    private async signIn() {

    }

    @Post('/sign-up')
    private async signUp(
        @Body() signUpDTO: SignUpDTO,
    ): Promise<void> {
        return this.authService.signUp(signUpDTO);
    }

    @Post('/reset-password')
    private async resetPassword(
        @Body() resetPasswordDTO: ResetPasswordDTO,
    ): Promise<string> {
        return await this.authService.resetPassword(resetPasswordDTO);
    }
}

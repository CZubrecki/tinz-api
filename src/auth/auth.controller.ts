import { Body, Controller, Post } from '@nestjs/common';
import { ResetPasswordDTO, UserCredentialsDTO } from '../dtos/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    @Post('register')
    private async register(
        @Body() registerRequest: UserCredentialsDTO,
    ): Promise<void> {
        return this.authService.registerUser(registerRequest);
    }

    @Post('login')
    private async login(
        @Body() credentials: UserCredentialsDTO,
    ): Promise<string> {
        return await this.authService.authenticate(credentials);
    }

    @Post('reset-password')
    private async resetPassword(
        @Body() resetPasswordDTO: ResetPasswordDTO,
    ) {
        return await this.authService.resetPassword(resetPasswordDTO);
    }

}

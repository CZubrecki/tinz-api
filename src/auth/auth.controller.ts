import { Body, Controller, Post } from '@nestjs/common';
import { ResetPasswordDTO, UserCredentialsDTO } from '../dtos/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    @Post('register')
    async register(
        @Body() registerRequest: UserCredentialsDTO,
    ): Promise<void> {
        return this.authService.registerUser(registerRequest);
    }

    @Post('login')
    async login(
        @Body() credentials: UserCredentialsDTO,
    ): Promise<string> {
        return await this.authService.authenticate(credentials);
    }

    @Post('reset-password')
    async resetPassword(
        @Body() resetPasswordDTO: ResetPasswordDTO,
    ) {
        return await this.authService.resetPassword(resetPasswordDTO);
    }

}

import { Body, Controller, Post } from '@nestjs/common';
import { UserCredentialsDTO } from '../dtos/auth.dto';
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

}

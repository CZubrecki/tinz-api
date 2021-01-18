import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDTO } from '../dtos/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    @Post('register')
    async register(
        @Body() registerRequest: RegisterUserDTO,
    ): Promise<void> {
        return this.authService.registerUser(registerRequest);
    }

}

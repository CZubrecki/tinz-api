import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { RegisterUserDTO } from 'src/dtos/auth.dto';
import { Repository } from 'typeorm/repository/Repository';
import { UserEntity } from '../entities/user.entity';
import { AuthConfig } from './auth.config';

@Injectable()
export class AuthService {
    private userPool: CognitoUserPool;
    constructor(
        @Inject('AuthConfig')
        private readonly authConfig: AuthConfig,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) {
        this.userPool = new CognitoUserPool({
            UserPoolId: this.authConfig.userPoolId,
            ClientId: this.authConfig.clientId,
        });
    }

    public async registerUser(registerRequest: RegisterUserDTO) {
    }
}

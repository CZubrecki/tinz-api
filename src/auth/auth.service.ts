import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool, ISignUpResult } from 'amazon-cognito-identity-js';
import * as _ from 'lodash';
import { Repository } from 'typeorm/repository/Repository';
import { ResetPasswordDTO, UserCredentialsDTO } from '../dtos/auth.dto';
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

    public async registerUser(registerRequest: UserCredentialsDTO) {
        const { email, password } = registerRequest;
        await this.userPool.signUp(
            email,
            password,
            [new CognitoUserAttribute({ Name: 'email', Value: email })],
            null,
            (error, result) => this.handleRegisterUser(error, result)
        );
    }

    private async handleRegisterUser(err: Error, result: ISignUpResult) {
        if (err) {
            console.log(err.message || JSON.stringify(err));
            return;
        }
        const cognitoUser = result.user;
        if (cognitoUser) {
            const email = cognitoUser.getUsername();
            const user = new UserEntity();
            user.email = email;
            await this.userRepository.insert(user);
        }
    }

    public async authenticate(credentials: UserCredentialsDTO): Promise<string> {
        const { email, password } = credentials;
        const authenticationDetails = new AuthenticationDetails({
            Username: email,
            Password: password,
        });
        const newUser = this.getUser(email);
        return new Promise((resolve, reject) => {
            return newUser.authenticateUser(authenticationDetails, {
                onSuccess: result => {
                    resolve(JSON.stringify(result.getIdToken()));
                },
                onFailure: err => {
                    reject(err);
                },
            });
        });
    }

    public async resetPassword({ email, verificationCode, newPassword }: ResetPasswordDTO) {
        const newUser = this.getUser(email);
        if (_.isNil(verificationCode)) {
            await this.requestVerificationCode(newUser);
        }

        if (verificationCode && newPassword) {
            await this.confirmPasswordChange(newUser, verificationCode, newPassword);
        }
    }

    private async requestVerificationCode(newUser: CognitoUser) {
        await newUser.forgotPassword({
            onSuccess: result => {
            },
            onFailure: err => {
                console.log(err.message || JSON.stringify(err));
            }
        });
    }

    private async confirmPasswordChange(newUser: CognitoUser, verificationCode: string, newPassword: string) {
        await newUser.confirmPassword(verificationCode, newPassword, {
            onSuccess: () => { },
            onFailure: (err) => {
                console.log(err.message || JSON.stringify(err));
            }
        });

    }

    private getUser(email: string) {
        const userData = {
            Username: email,
            Pool: this.userPool,
        };
        const newUser = new CognitoUser(userData);
        return newUser;
    }
}

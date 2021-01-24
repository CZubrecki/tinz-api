import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { AuthConfig } from './auth.config';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService,
        private authConfig: AuthConfig,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) {
        super({
            secretOrKeyProvider: passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `${authConfig.authority}/.well-known/jwks.json`,
            }),

            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            audience: authConfig.clientId,
            issuer: authConfig.authority,
            algorithms: ['RS256'],
        });
    }

    public async validate(payload: any) {
        const { email } = payload;
        const user = await this.userRepository.find({ where: { email } });
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
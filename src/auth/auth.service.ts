import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { SignUpDTO } from '../dtos/auth.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class AuthService {

    constructor(
        private httpService: HttpService,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) { }

    private get auth0Domain() {
        return process.env.AUTH0_DOMAIN;
    }

    public async signUp(signUpDTO: SignUpDTO) {
        const options = {
            headers: { 'Content-type': 'application/json' }
        };

        const content = {
            client_id: process.env.AUTH0_CLIENT_ID,
            connection: process.env.AUTH0_CONNECTION,
            email: signUpDTO.email,
            password: signUpDTO.password,
        }
        await this.httpService.post(`${this.auth0Domain}/dbconnections/signup`, content, options).subscribe({
            next: async (response) => {
                if (response.data) {
                    const data = response.data;
                    if (data.email && data._id) {
                        const userEntity = new UserEntity()
                        userEntity._id = data._id;
                        userEntity.email = data.email;
                        await this.insertUser(userEntity);
                    }
                }
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    private async insertUser(user: UserEntity) {
        console.log('HERHERHER');
        console.log(user);
        await this.userRepository.insert(user);
    }

}

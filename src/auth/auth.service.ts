import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersModel } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UsersModel)
        private usersRepository: Repository<UsersModel>,

        // add
        private jwtService: JwtService,

    ) { }

    async login(user: UsersModel): Promise<{ loginUser, access_token: string }> {
        const payload = { email: user.email, sub: user.id };
        return {
            loginUser: { id: user.id, email: user.email },
            access_token: this.jwtService.sign(payload),
        };
    }

    async validateUser(email: string, password: string): Promise<UsersModel | null> {
        const user = await this.usersRepository.findOne({ where: { email } });
        if (user && bcrypt.compareSync(password, user.password)) {
            return user;
        }
        return null;
    }

    async findByEmail(email: string): Promise<UsersModel | undefined> {
        // 사용자 이메일로 사용자 찾기
        return await this.usersRepository.findOne({ where: { email } });
    }


    async createUser(createUserDto: CreateUserDto): Promise<UsersModel> {
        try {
            // 비밀번호 암호화
            const hashedPassword = await bcrypt.hash(createUserDto.password, 10); // 10은 saltRounds입니다.

            // 새로운 사용자 생성
            const newUser = this.usersRepository.create({
                email: createUserDto.email,
                password: hashedPassword, // 암호화된 비밀번호 저장
            });
            return await this.usersRepository.save(newUser);
        } catch (error) {
            // 암호화 과정에서 발생한 에러 처리
            throw new Error(`Failed to create user: ${error.message}`);
        }
    }


}
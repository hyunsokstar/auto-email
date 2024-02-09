import { Controller, Post, Body, ConflictException, InternalServerErrorException, UnauthorizedException, Get, Req, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersModel } from 'src/users/entities/users.entity';
import { Request, Response } from 'express';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Get('validateUser')
    validateUser(@Req() req: Request, @Res() res: Response) {
        // 요청 객체에서 사용자 정보를 가져옴
        const loginUser = req.user;

        console.log("loginUser ??? ", loginUser);

        if (loginUser) {
            // 사용자가 로그인한 경우
            return res.status(HttpStatus.OK).json({
                isLoggedIn: true,
                loginUser: loginUser,
            });
        } else {
            // 사용자가 로그인하지 않은 경우
            return res.status(HttpStatus.UNAUTHORIZED).json({
                isLoggedIn: false,
                loginUser: null,
            });
        }
    }


    @Post('login')
    async login(@Body() loginUserDto: CreateUserDto): Promise<{ access_token: string }> {
        const user = await this.authService.validateUser(loginUserDto.email, loginUserDto.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.authService.login(user);
    }

    @Post('signup')
    async signUp(@Body() createUserDto: CreateUserDto): Promise<{ message: string, user: UsersModel }> {
        try {
            // 이메일 중복 체크
            const existingUser = await this.authService.findByEmail(createUserDto.email);
            if (existingUser) {
                throw new ConflictException('이미 존재하는 이메일입니다.');
            }

            // 회원 가입 처리
            const newUser = await this.authService.createUser(createUserDto);

            return {
                message: '회원 가입 성공',
                user: newUser,
            };
        } catch (error) {
            throw new InternalServerErrorException(`회원 가입 실패: ${error.message}`);
        }
    }


}

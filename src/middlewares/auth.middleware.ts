// src\middlewares\auth.middleware.ts

import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

// Request 객체에 사용자 지정 속성을 추가하는 방법
declare global {
    namespace Express {
        interface Request {
            user?: any; // 사용자 정보를 담을 속성 추가
        }
    }
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private jwtService: JwtService) { }
    private readonly logger = new Logger(AuthMiddleware.name);

    async use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.split(' ')[1]; // 클라이언트로부터 JWT를 헤더로 전달받음
        this.logger.log('AuthMiddleware 실행됨'); // 미들웨어 실행 로그

        if (token) {
            try {
                const decoded = this.jwtService.verify(token); // JWT를 검증하여 해독
                req.user = decoded; // 요청 객체에 사용자 정보를 추가
                this.logger.log(`User info: ${JSON.stringify(decoded)}`); // 사용자 정보 로깅

            } catch (err) {
                console.error('JWT verification error:', err);
            }
        }

        next();
    }
}

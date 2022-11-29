import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'mySecret',
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: any) {
    const userInfo = { id: payload.sub, email: payload.username };

    (request as any).userInfo = userInfo;

    return userInfo;
  }
}

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("JWT_SECRET")|| "default_secret", //si es el caso de que yo quisiera que fuera de esta manera 
    });
  }

  async validate(payload: any) {c
    return { userId: payload.sub, email: payload.email, roles: payload.roles }; //aqui retorno el rol del usuario junto con su id y email
  }
}

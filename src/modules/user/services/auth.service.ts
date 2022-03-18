import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user';
import { AuthResponse } from '../responses/auth.response';
import { UserRepository } from '../user.repository.ts';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (user) {
      const passwordValid = bcrypt.compareSync(
        password,
        user.getPasswordHash(),
      );

      if (passwordValid) {
        const payload = {
          email: user.getEmail(),
          id: user.getId(),
          name: user.fullName,
        };
        return payload;
      }
    }
    return null;
  }

  async login(user: User): Promise<AuthResponse> {
    const payload = {
      email: user.getEmail(),
      sub: user.getId(),
      name: user.fullName,
    };
    return {
      email: user.getEmail(),
      name: user.fullName,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async refresh(token: string) {
    try {
      const tokenDecode = await this.jwtService.verifyAsync(token);
      const payload = {
        email: tokenDecode.email,
        sub: tokenDecode.sub,
        name: tokenDecode.name,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new HttpException('Invalid Token', HttpStatus.BAD_REQUEST);
    }
  }
}

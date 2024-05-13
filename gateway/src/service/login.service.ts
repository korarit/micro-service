import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface LoginData {
  username: string;
  password: string;
}

/* เตรียมไว้เพื่ออนาคต มาทำต่อ */

@Injectable()
export class LoginService {
  constructor(private jwtService: JwtService) {}

  async getJWT(data: LoginData): Promise<string> {
    if (data.username === '' || data.password === '') {
      return 'All fields are required';
    }

    const payload = { username: data.username, password: data.password };
    try {
      const jwt = await this.jwtService.signAsync(payload);
      return jwt;
    } catch (error) {
      console.log(error);
      return 'Error generating JWT';
    }
  }

  async verifyJWT(jwt: string): Promise<LoginData | string> {
    if (jwt === '' || jwt === undefined) {
      return 'JWT is required';
    }

    try {
      const data = await this.jwtService.verifyAsync(jwt);
      return { username: data.username, password: data.password };
    } catch (error) {
      console.log(error);
      return 'Error verifying JWT';
    }
  }
}

import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn( email: string, password: string): Promise<{ access_token: string }> {
    const user : User = await this.usersService.findOne(email);
    if (!user) {
      throw new NotFoundException();
    }
    else if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { userId: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(user: User): Promise<User> {
    return await this.usersService.create(user);
  }
}



// AuthService has the job of retrieving a user and verifying the password.
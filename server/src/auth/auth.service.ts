import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/interfaces/user.interface';
import { encryptPassword, decryptPassword } from 'src/utils/encryption';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn( email: string, password: string): Promise<{ access_token: string }> {
    const user : User = await this.usersService.findOne(email);
    if (!user) {
      throw new NotFoundException();
    }
    // decrypt password retrieved from the database
    const decryptedPassword = await decryptPassword(user.password,this.configService.get<string>('ENCRYPTION_KEY'));
    if (password !== decryptedPassword) {
      throw new UnauthorizedException();
    }

    const payload = { id: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(user: User): Promise<User> {
    // encrypt password before saving it to the database
    const encryptedPassword = await encryptPassword(user.password, this.configService.get<string>('ENCRYPTION_KEY'));
    user.password = encryptedPassword;
    return await this.usersService.create(user);
  }
}
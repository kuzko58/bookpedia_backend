import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../../users/schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import { Auth } from '../schema/auth.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto, LocalLoginDto } from '../dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<Auth> {
    try {
      const createdUser = new this.userModel(createUserDto);
      const user = await createdUser.save();

      const access_token: string = this.signUser(user.email, user.id);
      return {
        access_token,
        user,
      };
    } catch (err) {
      if (err.code === 11000)
        throw new ConflictException('User already exists');
    }
  }

  public async loginLocal(localLoginDto: LocalLoginDto): Promise<Auth> {
    const user = await this.userModel.findOne({
      email: localLoginDto.email,
    });

    if (!user) {
      throw new NotFoundException('No user was found');
    }

    const isValidPassword = bcrypt.compareSync(
      localLoginDto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const access_token = this.signUser(user.email, user.id);

    return {
      access_token,
      user,
    };
  }

  signUser(email: string, id: string) {
    return this.jwtService.sign({
      username: email,
      sub: id,
    });
  }
}

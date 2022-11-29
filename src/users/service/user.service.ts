import { Model } from 'mongoose';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../schema/user.schema';
import { CreateUserDto } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    // private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const createdUser = new this.userModel(createUserDto);
      const newUser = await createdUser.save();

      //   const access_token: string = this.signUser(newUser.email, newUser.id);
      console.log(newUser.id);
      return newUser;
    } catch (err) {
      if (err.code === 11000)
        throw new ConflictException('User already exists');
    }
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

//   public signUser(email: string, id: string) {
//     return this.jwtService.sign({
//       username: email,
//       sub: id,
//     });
//   }
}

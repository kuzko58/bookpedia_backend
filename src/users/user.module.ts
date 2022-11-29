import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { UserSchema } from './schema/user.schema';
import { UserResolver } from './resolver/user.resolver';
import { UserService } from './service/user.service';
import { User } from './schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre('save', function () {
            if (this.password) {
              this.password = bcrypt.hashSync(this.password, 10);
            }
          });
          return schema;
        },
      },
    ]),
  ],
  providers: [UserResolver, UserService],
})
export class UsersModule {}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/schema/user.schema';

export type BookDocument = HydratedDocument<Book>;

@Schema()
@ObjectType()
export class Book {
  @Field(() => ID)
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  @Field()
  title: string;

  @Prop({ required: true })
  @Field()
  genre: string;

  @Prop({ required: true })
  @Field()
  description: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name, required: true })
  @Field()
  author: User;

  @Prop()
  @Field(() => Date)
  createdAt?: Date;

  @Prop()
  @Field(() => Date)
  updatedAt?: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);

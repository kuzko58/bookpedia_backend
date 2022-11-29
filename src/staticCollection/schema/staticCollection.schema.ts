import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BookData {
  @Field()
  title: string;

  @Field()
  genre: string;

  @Field()
  description: string;

  @Field()
  progress: number;

  @Field()
  image: string;

  @Field()
  author: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}

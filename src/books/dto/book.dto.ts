import { InputType, Field, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateBookDto {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsNotEmpty()
  genre: string;

  @Field()
  @IsNotEmpty()
  description: string;
}

@InputType()
export class UpdateBookDto {
  @Field()
  @IsOptional()
  title: string;

  @Field()
  @IsOptional()
  genre: string;

  @Field()
  @IsOptional()
  description: string;

  @Field()
  @IsNotEmpty()
  id: string;
}

@InputType()
export class DeleteBookDto {
  @Field()
  @IsNotEmpty()
  id: string;
}

@ArgsType()
export class GetOneBookDto {
  @Field()
  @IsNotEmpty()
  id: string;
}

@ArgsType()
export class GetAuthorBooksDto {
  @Field()
  @IsNotEmpty()
  author: string;
}

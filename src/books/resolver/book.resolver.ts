import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { JwtAuthGuard } from 'src/auth/gaurds/jwt-auth.gaurd';
import { IAuthUser } from 'src/auth/types/auth.type';
import { CreateBookDto } from '../dto/book.dto';
import { Book } from '../schema/book.schema';
import { BookService } from '../service/book.service';

@Resolver(() => Book)
@UseGuards(JwtAuthGuard)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Mutation(() => Book)
  async createBook(
    @Args('createBookDto') createBookDto: CreateBookDto,
    @AuthUser() user: IAuthUser,
  ): Promise<Book> {
    return await this.bookService.createBook(createBookDto, user);
  }

  @Query(() => [String])
  async getAllBooks(): Promise<Book[]> {
    return await this.bookService.getAllBooks();
  }
}

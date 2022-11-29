import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { JwtAuthGuard } from 'src/auth/gaurds/jwt-auth.gaurd';
import { IAuthUser } from 'src/auth/types/auth.type';
import {
  CreateBookDto,
  DeleteBookDto,
  GetAuthorBooksDto,
  GetOneBookDto,
  UpdateBookDto,
} from '../dto/book.dto';
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

  @Mutation(() => Book)
  async updateBook(
    @Args('updateBookDto') updateBookDto: UpdateBookDto,
    @AuthUser() user: IAuthUser,
  ): Promise<Book> {
    return await this.bookService.updateBook(updateBookDto, user);
  }

  @Mutation(() => Book)
  async deleteBook(
    @Args('deleteBookDto') deleteBookDto: DeleteBookDto,
    @AuthUser() user: IAuthUser,
  ): Promise<Book> {
    return await this.bookService.deleteBook(deleteBookDto, user);
  }

  @Query(() => Book)
  async getOneBook(@Args() getOneBookDto: GetOneBookDto): Promise<Book> {
    return await this.bookService.getOneBook(getOneBookDto);
  }

  @Query(() => [Book])
  async getAllBooksByAuthor(
    @Args() getAuthorBooksDto: GetAuthorBooksDto,
  ): Promise<Book[]> {
    return await this.bookService.getAllBooksByAuthor(getAuthorBooksDto);
  }

  @Query(() => [Book])
  async getAllBooks(): Promise<Book[]> {
    return await this.bookService.getAllBooks();
  }
}

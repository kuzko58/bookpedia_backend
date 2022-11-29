import { Model } from 'mongoose';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from '../schema/book.schema';
import {
  CreateBookDto,
  DeleteBookDto,
  GetOneBookDto,
  UpdateBookDto,
} from '../dto/book.dto';
import { IAuthUser } from 'src/auth/types/auth.type';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async createBook(
    createBookDto: CreateBookDto,
    user: IAuthUser,
  ): Promise<Book> {
    const createdBook = new this.bookModel({
      ...createBookDto,
      author: user.id,
    });
    const newBook = await createdBook.save();
    return await newBook.populate({ path: 'author', select: 'id name' });
  }

  async updateBook(
    updateBookDto: UpdateBookDto,
    user: IAuthUser,
  ): Promise<Book> {
    const { id, ...update } = updateBookDto;
    const book = await this.bookModel.findOneAndUpdate(
      { _id: id, author: user.id },
      update,
      { new: true },
    );

    if (!book) {
      throw new UnauthorizedException('Cannot modify this book');
    }
    return await book.populate({ path: 'author', select: 'id name' });
  }

  async deleteBook(
    deleteBookDto: DeleteBookDto,
    user: IAuthUser,
  ): Promise<Book> {
    const { id } = deleteBookDto;
    const book = await this.bookModel.findOneAndDelete({
      _id: id,
      author: user.id,
    });

    if (!book) {
      throw new UnauthorizedException('Cannot delete this book');
    }
    return book;
  }

  async getOneBook(getOneBookDto: GetOneBookDto): Promise<Book> {
    const { id } = getOneBookDto;
    const book = await this.bookModel.findOne({
      _id: id,
    });

    if (!book) {
      throw new UnauthorizedException('Book not found');
    }
    return book;
  }

  async getAllBooks(): Promise<Book[]> {
    return await this.bookModel
      .find()
      .populate({ path: 'author', select: 'id name' })
      .exec();
  }
}

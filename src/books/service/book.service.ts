import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from '../schema/book.schema';
import { CreateBookDto } from '../dto/book.dto';
import { IAuthUser } from 'src/auth/types/auth.type';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async createBook(
    createUserDto: CreateBookDto,
    user: IAuthUser,
  ): Promise<Book> {
    const createdBook = new this.bookModel({
      ...createUserDto,
      author: user.id,
    });
    const newBook = await createdBook.save();
    return await newBook.populate({ path: 'author', select: 'id name' });
  }

  async getAllBooks(): Promise<Book[]> {
    return await this.bookModel.find().exec();
  }
}

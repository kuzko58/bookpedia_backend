import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from './schema/book.schema';
import { BookResolver } from './resolver/book.resolver';
import { BookService } from './service/book.service';
import { Book } from './schema/book.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
  providers: [BookResolver, BookService],
})
export class BookModule {}

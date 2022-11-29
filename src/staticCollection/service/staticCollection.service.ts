import { BookData } from '../schema/staticCollection.schema';
import books from '../../data/books.json';

export class StaticCollectionService {
  getAllBooksCollections(): BookData[] {
    return books;
  }
}

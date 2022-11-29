import { Resolver, Query } from '@nestjs/graphql';
import { BookData } from '../schema/staticCollection.schema';
import { StaticCollectionService } from '../service/staticCollection.service';

@Resolver(() => BookData)
export class StaticCollectionResolver {
  constructor(
    private readonly staticCollectionService: StaticCollectionService,
  ) {}

  @Query(() => [BookData])
  getAllBooksCollections(): BookData[] {
    return this.staticCollectionService.getAllBooksCollections();
  }
}

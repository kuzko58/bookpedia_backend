import { Module } from '@nestjs/common';
import { StaticCollectionResolver } from './resolver/staticCollection.resolver';
import { StaticCollectionService } from './service/staticCollection.service';

@Module({
  providers: [StaticCollectionResolver, StaticCollectionService],
})
export class StaticCollectionModule {}

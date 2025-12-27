import { MongoMasterService } from '@/shared/infrastructure/database/mongodb/services/mongo-master/mongo-master.service';
import { Global, Module } from '@nestjs/common';

const SERVICES = [MongoMasterService];

@Global()
@Module({
  providers: [...SERVICES],
  exports: [...SERVICES],
})
export class MongoModule {}

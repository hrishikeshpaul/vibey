import * as mongoose from 'mongoose';
import { Logger, Module } from '@nestjs/common';

export class MongoDBService {
  constructor() {
    this.connect().then(() => Logger.log('MongoDB connected'));
  }

  private async connect() {
    return await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  }
}

@Module({
  providers: [MongoDBService],
  exports: [MongoDBService],
})
export class MongoDBModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientRepository } from './client.repository';
import { ClientModel, ClientSchema } from './client.model';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: ClientModel.name, schema: ClientSchema }]),
  ],
  providers: [ClientRepository],
  exports: [ClientRepository],
})
export class ClientModule {}

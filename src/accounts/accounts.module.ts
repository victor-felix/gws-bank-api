/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AccountsService } from './accounts.service';
import { AccountsControllerV1 } from './accounts.controller';
import { Account, AccountSchema } from './account.schema';
import { AccountsRepository } from './accounts.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
  ],
  providers: [AccountsService, AccountsRepository],
  controllers: [AccountsControllerV1],
})
export class AccountsModule {}

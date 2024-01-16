import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../database/entity.repository';
import { Account, AccountDocument } from './account.schema';

@Injectable()
export class AccountsRepository extends EntityRepository<AccountDocument> {
  constructor(@InjectModel(Account.name) accountModel: Model<AccountDocument>) {
    super(accountModel);
  }
}

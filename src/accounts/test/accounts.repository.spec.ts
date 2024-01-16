import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { AccountsRepository } from '../accounts.repository';
import { Account } from '../account.schema';
import { AccountModel } from './support/account.model';
import { accountStub } from './stubs/account.stub';
import { FilterQuery } from 'mongoose';

describe('AccountsRepository', () => {
  let accountsRepository: AccountsRepository;
  let accountModel: AccountModel;
  let accountFilterQuery: FilterQuery<Account>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AccountsRepository,
        {
          provide: getModelToken(Account.name),
          useClass: AccountModel,
        },
      ],
    }).compile();

    accountsRepository = module.get<AccountsRepository>(AccountsRepository);
    accountModel = module.get<AccountModel>(getModelToken(Account.name));
    accountFilterQuery = {
      accountId: accountStub().accountId,
    };

    jest.clearAllMocks();
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      let account: Account;

      beforeEach(async () => {
        jest.spyOn(accountModel, 'findOne');
        account = await accountsRepository.findOne(accountFilterQuery, {
          _id: 0,
          __v: 0,
        });
      });

      test('then it should call accountModel', () => {
        expect(accountModel.findOne).toHaveBeenCalledTimes(1);
      });

      test('then it should return an account', () => {
        expect(account).toEqual(accountStub());
      });
    });
  });

  describe('findOneAndUpdate', () => {
    describe('when findOneAndUpdate is called', () => {
      let account: Account;

      beforeEach(async () => {
        jest.spyOn(accountModel, 'findOneAndUpdate');
        account = await accountsRepository.findOneAndUpdate(
          accountFilterQuery,
          accountStub(),
        );
      });

      test('then it should call accountModel', () => {
        expect(accountModel.findOneAndUpdate).toHaveBeenCalledWith(
          accountFilterQuery,
          accountStub(),
          { new: true },
        );
        expect(accountModel.findOneAndUpdate).toHaveBeenCalledTimes(1);
      });

      test('then it should return an account', () => {
        expect(account).toEqual(accountStub());
      });
    });
  });
});

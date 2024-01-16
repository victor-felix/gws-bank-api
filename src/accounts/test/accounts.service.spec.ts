import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { FilterQuery } from 'mongoose';

import { AccountsService } from '../accounts.service';
import { Account } from '../account.schema';
import { AccountModel } from './support/account.model';
import { AccountsRepository } from '../accounts.repository';
import { accountStub } from './stubs/account.stub';

describe('AccountsService', () => {
  let accountsService: AccountsService;
  let accountsModel: AccountModel;
  let accountFilterQuery: FilterQuery<Account>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
        AccountsRepository,
        {
          provide: getModelToken(Account.name),
          useClass: AccountModel,
        },
      ],
    }).compile();

    accountsService = module.get<AccountsService>(AccountsService);
    accountsModel = module.get<AccountModel>(getModelToken(Account.name));
    accountFilterQuery = {
      accountId: accountStub().accountId,
    };

    jest.clearAllMocks();
  });

  describe('getAccount', () => {
    describe('when getAccount is called', () => {
      let account;

      beforeEach(async () => {
        jest.spyOn(accountsModel, 'findOne');
        account = await accountsService.getAccount(accountStub().accountId);
      });

      test('then it should call accountsModel', () => {
        expect(accountsModel.findOne).toHaveBeenCalledTimes(1);
      });

      test('then it should return an account', () => {
        expect(account).toEqual(accountStub());
      });
    });
  });

  describe('withdraw', () => {
    describe('when withdraw is called', () => {
      let withdraw;

      beforeEach(async () => {
        jest.spyOn(accountsModel, 'findOne');
        jest.spyOn(accountsModel, 'findOneAndUpdate');
        withdraw = await accountsService.withdraw(accountStub().accountId, {
          amount: 380,
        });
      });

      test('then it should call accountsModel', () => {
        expect(accountsModel.findOne).toHaveBeenCalledTimes(1);
        expect(accountsModel.findOneAndUpdate).toHaveBeenCalledWith(
          accountFilterQuery,
          {
            ...accountStub(),
            balance: accountStub().balance - 380,
          },
          { new: true },
        );
        expect(accountsModel.findOneAndUpdate).toHaveBeenCalledTimes(1);
      });

      test('then it should return an account', () => {
        expect(withdraw).toEqual([
          { note: 100, quantity: 3 },
          { note: 50, quantity: 1 },
          { note: 20, quantity: 1 },
          { note: 10, quantity: 1 },
        ]);
      });
    });
  });

  describe('when withdraw is called with insufficient funds', () => {
    test('then it should throw an error', async () => {
      await expect(
        accountsService.withdraw(accountStub().accountId, { amount: 15000 }),
      ).rejects.toThrow('api.error.insufficientFunds');
    });
  });

  describe('when withdraw is called with insufficient notes', () => {
    test('then it should throw an error', async () => {
      await expect(
        accountsService.withdraw(accountStub().accountId, { amount: 5 }),
      ).rejects.toThrow('api.error.insufficientNotes');
    });
  });
});

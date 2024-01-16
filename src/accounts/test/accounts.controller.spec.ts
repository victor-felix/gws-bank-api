import { Test, TestingModule } from '@nestjs/testing';
import { AccountsControllerV1 } from '../accounts.controller';
import { AccountsService } from '../accounts.service';
import { accountStub } from './stubs/account.stub';
import { withdrawStub } from './stubs/withdraw.stub';

jest.mock('../accounts.service');

describe('AccountsControllerV1', () => {
  let controller: AccountsControllerV1;
  let accountsService: AccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsControllerV1],
      providers: [AccountsService],
    }).compile();

    controller = module.get<AccountsControllerV1>(AccountsControllerV1);
    accountsService = module.get<AccountsService>(AccountsService);
    jest.clearAllMocks();
  });

  describe('getAccount', () => {
    describe('when getAccount is called', () => {
      let account;

      beforeEach(async () => {
        account = await controller.getAccount(accountStub().accountId);
      });

      test('then it should call accountsService', () => {
        expect(accountsService.getAccount).toHaveBeenCalledTimes(1);
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
        withdraw = await controller.withdraw(accountStub().accountId, {
          amount: 380,
        });
      });

      test('then it should call accountsService', () => {
        expect(accountsService.withdraw).toHaveBeenCalledTimes(1);
      });

      test('then it should return an account', () => {
        expect(withdraw).toEqual(withdrawStub());
      });
    });
  });
});

import { accountStub } from '../test/stubs/account.stub';

export const AccountsService = jest.fn().mockReturnValue({
  getAccount: jest.fn().mockResolvedValue(accountStub()),
  withdraw: jest.fn().mockResolvedValue([
    { note: 100, quantity: 3 },
    { note: 50, quantity: 1 },
    { note: 20, quantity: 1 },
    { note: 10, quantity: 1 },
  ]),
});

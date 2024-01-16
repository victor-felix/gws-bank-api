import { Account } from '../../account.schema';

export const accountStub = (): Account => {
  return {
    accountId: '0c9e308a-210e-4531-aed7-70f6e4b3f03f',
    agency: 1234,
    accountNumber: 999999999,
    balance: 10000,
    clientName: 'John Doe',
  };
};

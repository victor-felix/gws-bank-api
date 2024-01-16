import { Account } from '../../account.schema';
import { MockModel } from '../../../database/test/support/mock.model';
import { accountStub } from '../stubs/account.stub';

export class AccountModel extends MockModel<Account> {
  protected entityStub = accountStub();
}

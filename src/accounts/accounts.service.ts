import { BadRequestException, Injectable } from '@nestjs/common';

import { Account } from './account.schema';
import {
  CreateWithdrawRequestBodyDto,
  CreateWithdrawResponseDto,
} from './dto/create-withdraw.dto';
import { AccountsRepository } from './accounts.repository';

@Injectable()
export class AccountsService {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  private banknotes = [
    { note: 100, quantity: 100 },
    { note: 50, quantity: 100 },
    { note: 20, quantity: 100 },
    { note: 10, quantity: 100 },
  ];

  async getAccount(accountId: string): Promise<Account> {
    return this.accountsRepository.findOne({ accountId });
  }

  async withdraw(
    accountId: string,
    withdrawDto: CreateWithdrawRequestBodyDto,
  ): Promise<CreateWithdrawResponseDto[]> {
    const account = await this.getAccount(accountId);

    if (account.balance < withdrawDto.amount) {
      throw new BadRequestException('api.error.insufficientFunds');
    }

    this.banknotes.sort((a, b) => b.note - a.note);

    let remainingAmount = withdrawDto.amount;
    const result = [];

    for (let i = 0; i < this.banknotes.length; i++) {
      const note = this.banknotes[i];
      const count = Math.min(
        Math.floor(remainingAmount / note.note),
        note.quantity,
      );

      if (count > 0) {
        result.push({ note: note.note, quantity: count });
        remainingAmount -= count * note.note;

        this.banknotes[i].quantity -= count;
      }

      if (remainingAmount === 0) {
        break;
      }
    }

    if (remainingAmount !== 0) {
      throw new BadRequestException('api.error.insufficientNotes');
    }

    account.balance -= withdrawDto.amount;

    await this.accountsRepository.findOneAndUpdate(
      { accountId: account.accountId },
      account,
    );

    return result;
  }
}

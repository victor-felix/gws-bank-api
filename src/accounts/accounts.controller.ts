import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';

import { AccountsService } from './accounts.service';
import { Account } from './account.schema';
import {
  CreateWithdrawRequestBodyDto,
  CreateWithdrawResponseDto,
} from './dto/create-withdraw.dto';
import { ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Accounts V1')
@Controller({ version: '1', path: 'accounts' })
export class AccountsControllerV1 {
  constructor(private readonly accountService: AccountsService) {}

  @Post(':accountId/withdraw')
  @HttpCode(200)
  @ApiParam({ name: 'accountId', type: String })
  @ApiBody({ type: CreateWithdrawRequestBodyDto })
  @ApiOkResponse({ type: [CreateWithdrawResponseDto] })
  async withdraw(
    @Param('accountId') accountId: string,
    @Body() withdrawDto: CreateWithdrawRequestBodyDto,
  ): Promise<CreateWithdrawResponseDto[]> {
    return await this.accountService.withdraw(accountId, withdrawDto);
  }

  @Get(':accountId')
  @HttpCode(200)
  @ApiParam({ name: 'accountId', type: String })
  @ApiOkResponse({ type: Account })
  async getAccount(@Param('accountId') accountId: string): Promise<Account> {
    return await this.accountService.getAccount(accountId);
  }
}

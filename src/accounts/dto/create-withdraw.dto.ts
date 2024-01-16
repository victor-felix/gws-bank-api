import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateWithdrawRequestBodyDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}

export class CreateWithdrawResponseDto {
  @ApiProperty()
  note: number;

  @ApiProperty()
  quantity: number;
}

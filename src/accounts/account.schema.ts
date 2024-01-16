import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type AccountDocument = HydratedDocument<Account>;

@Schema()
export class Account {
  @Prop()
  accountId: string;

  @ApiProperty()
  @Prop({ required: true })
  agency: number;

  @ApiProperty()
  @Prop({ required: true })
  accountNumber: number;

  @ApiProperty()
  @Prop({ default: 10000 })
  balance: number;

  @ApiProperty()
  @Prop({ required: true })
  clientName: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);

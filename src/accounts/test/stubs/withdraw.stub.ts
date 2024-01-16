import { CreateWithdrawResponseDto } from '../../dto/create-withdraw.dto';

export const withdrawStub = (): CreateWithdrawResponseDto[] => {
  return [
    { note: 100, quantity: 3 },
    { note: 50, quantity: 1 },
    { note: 20, quantity: 1 },
    { note: 10, quantity: 1 },
  ];
};

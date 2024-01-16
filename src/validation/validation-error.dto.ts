/* istanbul ignore file */
import { ApiProperty } from '@nestjs/swagger';

export class ValidationErrorDto {
  @ApiProperty()
  message: string[];

  @ApiProperty()
  error: string;

  @ApiProperty()
  statusCode: number;
}

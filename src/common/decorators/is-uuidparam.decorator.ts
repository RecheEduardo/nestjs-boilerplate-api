import { Param } from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common/pipes/parse-uuid.pipe';
import { HttpStatus } from '@nestjs/common';

export function IsUUIDParam(property: string): ParameterDecorator {
  return Param(
    property,
    new ParseUUIDPipe({
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      exceptionFactory: () => {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'O ID fornecido não é válido.',
        };
      },
    }),
  );
}

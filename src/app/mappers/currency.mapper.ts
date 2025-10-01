import { Injectable } from '@angular/core';
import { FromDTO } from './mapper';
import { CurrencyDto } from '../types/dtos/currency.dto';
import { Currency } from '../types/currency';

@Injectable({ providedIn: 'root' })
export class CurrencyMapper implements FromDTO<CurrencyDto, Currency> {
  public fromDTO(dto: CurrencyDto): Currency {
    return {
      id: dto.id,
      name: dto.name,
      shortCode: dto.short_code,
      code: dto.code,
      precision: dto.precision,
      subunit: dto.subunit,
      symbol: dto.symbol,
      symbolFirst: dto.symbol_first,
      decimalMark: dto.decimal_mark,
      thousandsSeparator: dto.thousands_separator,
    };
  }
}

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { converterActions } from './converter.actions';
import { CurrencyBeaconHttpService } from '../../../http/currency-beacon-http.service';
import { map, switchMap } from 'rxjs';
import { CurrencyMapper } from '../../../mappers/currency.mapper';
import { mapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ConverterEffects {
  constructor(
    private actions$: Actions,
    private currencyBeaconHttpService: CurrencyBeaconHttpService,
    private currencyMapper: CurrencyMapper,
  ) {}

  fetchCurrencyList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(converterActions.fetchCurrencyList),
      switchMap(() => this.currencyBeaconHttpService.getCurrencies()),
      map((currencyListDtoResponse) => currencyListDtoResponse.response),
      map((currencyListDto) =>
        currencyListDto.map((currencyDto) => this.currencyMapper.fromDTO(currencyDto)),
      ),
      mapResponse({
        next: (list) => converterActions.saveCurrencyList({ list }),
        error: (error: HttpErrorResponse) => converterActions.fetchCurrencyFailed({ error }),
      }),
    );
  });
}

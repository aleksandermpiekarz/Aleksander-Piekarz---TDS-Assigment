import { Currency } from '../../../types/currency';
import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import { converterActions } from './converter.actions';

export const CONVERTER_STATE_KEY = 'converter';
export interface ConverterState {
  currencyList: {
    list: Currency[];
    loading: boolean;
    error: HttpErrorResponse | null;
  };
  lastConversion: {
    from: string;
    to: string;
    amount: number;
    result: number;
    rate: number;
    loading: boolean;
    error: HttpErrorResponse | null;
  };
}

const INITIAL_STATE: ConverterState = {
  currencyList: {
    list: [],
    loading: true,
    error: null,
  },
  lastConversion: {
    from: '',
    to: '',
    amount: 0,
    result: 0,
    rate: 0,
    loading: true,
    error: null,
  },
};

export const converterReducer = createReducer(
  INITIAL_STATE,
  on(
    converterActions.fetchCurrencyFailed,
    (state, { error }): ConverterState => ({
      ...state,
      currencyList: { ...state.currencyList, error },
    }),
  ),
  on(
    converterActions.saveCurrencyList,
    (state, { list }): ConverterState => ({
      ...state,
      currencyList: { ...state.currencyList, list },
    }),
  ),
  on(
    converterActions.changeCurrencyListLoadingState,
    (state, { loading }): ConverterState => ({
      ...state,
      currencyList: { ...state.currencyList, loading },
    }),
  ),
  on(
    converterActions.changeConverterLoadingState,
    (state, { loading }): ConverterState => ({
      ...state,
      lastConversion: { ...state.lastConversion, loading },
    }),
  ),
);

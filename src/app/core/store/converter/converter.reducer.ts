import { Currency } from '../../../types/currency';
import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import { converterActions } from './converter.actions';
import { ConversionResult } from '../../../types/conversion-result';

export const CONVERTER_STATE_KEY = 'converter';

interface CurrencyListData {
  list: Currency[];
  loading: boolean;
  error: HttpErrorResponse | null;
}
interface LastConversionData extends ConversionResult {
  loading: boolean;
  error: HttpErrorResponse | null;
}

export interface ConverterState {
  currencyListData: CurrencyListData;
  lastConversionData: LastConversionData;
}

const INITIAL_STATE: ConverterState = {
  currencyListData: {
    list: [],
    loading: true,
    error: null,
  },
  lastConversionData: {
    from: '',
    to: '',
    amount: 0,
    value: 0,
    loading: false,
    error: null,
  },
};

export const converterReducer = createReducer(
  INITIAL_STATE,
  on(
    converterActions.fetchCurrencyFailed,
    (state, { error }): ConverterState => ({
      ...state,
      currencyListData: { ...state.currencyListData, error },
    }),
  ),
  on(
    converterActions.saveCurrencyList,
    (state, { list }): ConverterState => ({
      ...state,
      currencyListData: { ...state.currencyListData, list },
    }),
  ),
  on(
    converterActions.changeCurrencyListLoadingState,
    (state, { loading }): ConverterState => ({
      ...state,
      currencyListData: { ...state.currencyListData, loading },
    }),
  ),
  on(
    converterActions.changeConverterLoadingState,
    (state, { loading }): ConverterState => ({
      ...state,
      lastConversionData: { ...state.lastConversionData, loading },
    }),
  ),
  on(
    converterActions.saveLastConvert,
    (state, { result }): ConverterState => ({
      ...state,
      lastConversionData: { ...state.lastConversionData, ...result },
    }),
  ),
);

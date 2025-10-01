import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CONVERTER_STATE_KEY, ConverterState } from './converter.reducer';

export const selectConverterState = createFeatureSelector<ConverterState>(CONVERTER_STATE_KEY);

export const selectCurrencyList = createSelector(
  selectConverterState,
  (state: ConverterState) => state.currencyList.list,
);
export const selectCurrencyListLoadingState = createSelector(
  selectConverterState,
  (state: ConverterState) => state.currencyList.loading,
);

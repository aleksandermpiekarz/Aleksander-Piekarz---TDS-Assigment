import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CONVERTER_STATE_KEY, ConverterState } from './converter.reducer';

export const selectConverterState = createFeatureSelector<ConverterState>(CONVERTER_STATE_KEY);

export const selectCurrencyListData = createSelector(
  selectConverterState,
  (state: ConverterState) => state.currencyListData,
);

export const selectLastConversionData = createSelector(
  selectConverterState,
  (state: ConverterState) => state.lastConversionData,
);

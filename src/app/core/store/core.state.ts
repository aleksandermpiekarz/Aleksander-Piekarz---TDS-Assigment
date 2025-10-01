import { converterReducer, ConverterState } from './converter/converter.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { ConverterEffects } from './converter/converter.effects';

export interface CoreState {
  converter: ConverterState;
}

export const effects = [ConverterEffects];

export const reducers: ActionReducerMap<CoreState> = {
  converter: converterReducer,
};

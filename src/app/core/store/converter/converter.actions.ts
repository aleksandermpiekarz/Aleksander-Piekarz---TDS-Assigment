import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Currency } from '../../../types/currency';
import { HttpErrorResponse } from '@angular/common/http';
import { ConversionResult } from '../../../types/conversion-result';

export const converterActions = createActionGroup({
  source: 'converter',
  events: {
    'Fetch currency list': emptyProps(),
    'Fetch currency Failed': props<{ error: HttpErrorResponse }>(),
    'Save currency list': props<{ list: Currency[] }>(),
    'Change currency list loading state': props<{ loading: boolean }>(),
    'Change converter loading state': props<{ loading: boolean }>(),
    'Convert currency': props<{ from: string; to: string; amount: number; precision: number }>(),
    'Convert currency Failed': props<{ error: HttpErrorResponse }>(),
    'Save last convert': props<{ result: ConversionResult; precision: number }>(),
  },
});

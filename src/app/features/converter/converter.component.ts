import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectCurrencyListData,
  selectLastConversionData,
} from '../../core/store/converter/converter.selectors';
import { converterActions } from '../../core/store/converter/converter.actions';
import { debounceTime, tap } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NUMBERS_WITH_DECIMAL_POINT } from '../../core/helpers/regexp-patterns';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-converter',
  imports: [ReactiveFormsModule, DecimalPipe],
  templateUrl: './converter.component.html',
  providers: [DecimalPipe],
})
export class ConverterComponent implements OnInit {
  public form = new FormGroup({
    from: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    to: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    amount: new FormControl<number>(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(NUMBERS_WITH_DECIMAL_POINT)],
    }),
  });

  private store = inject(Store);
  public currencyListData = this.store.selectSignal(selectCurrencyListData);
  public lastConversionData = this.store.selectSignal(selectLastConversionData);

  constructor(private destroyRef: DestroyRef) {}

  public ngOnInit(): void {
    this.store.dispatch(converterActions.fetchCurrencyList());

    this.form.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        debounceTime(200),
        tap((value) => {
          if (this.form.valid) {
            const from = value.from?.trim() || '';
            const to = value.to?.trim() || '';
            const amount: number = value.amount as number;

            this.convertCurrency(from, to, amount);
          }
        }),
      )
      .subscribe();
  }

  public retryCurrencyListFetch(): void {
    this.store.dispatch(converterActions.fetchCurrencyList());
  }

  public retryConvert(): void {
    if (this.form.valid) {
      const from = (this.form.controls.from.value as string).trim();
      const to = (this.form.controls.to.value as string).trim();
      const amount = this.form.controls.amount.value as number;

      this.convertCurrency(from, to, amount);
    }
  }

  private convertCurrency(from: string, to: string, amount: number): void {
    const precision = this.currencyListData().list.find((x) => x.shortCode === to)?.precision || 2;

    if (amount === 0) return;

    this.store.dispatch(converterActions.convertCurrency({ from, to, amount, precision }));
  }
}

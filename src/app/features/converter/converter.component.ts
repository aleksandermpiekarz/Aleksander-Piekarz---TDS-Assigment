import { Component, OnInit } from '@angular/core';
import { CurrencyBeaconHttpService } from '../../http/currency-beacon-http.service';
import { take, tap } from 'rxjs';

@Component({
  selector: 'app-converter',
  imports: [],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.scss',
})
export class ConverterComponent implements OnInit {
  constructor(private http: CurrencyBeaconHttpService) {}

  ngOnInit() {
    this.http
      .getCurrencies()
      .pipe(
        take(1),
        tap((x) => {
          console.log('dzien dobry', x);
        }),
      )
      .subscribe();
  }
}

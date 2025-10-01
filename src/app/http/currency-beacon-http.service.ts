import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrencyDto } from '../types/dtos/currency.dto';

@Injectable({ providedIn: 'root' })
export class CurrencyBeaconHttpService {
  private apiUrl: string = 'https://api.currencybeacon.com/v1';

  constructor(private http: HttpClient) {}

  public getCurrencies(): Observable<{ response: CurrencyDto[] }> {
    return this.http.get<{ response: CurrencyDto[] }>(`${this.apiUrl}/currencies`);
  }

  public convert(
    from: string,
    to: string,
    amount: number,
  ): Observable<{ result: number; rate: number }> {
    let params = new HttpParams({ fromObject: { from, to, amount } });

    return this.http.get<{ result: number; rate: number }>(`${this.apiUrl}/convert`, { params });
  }
}

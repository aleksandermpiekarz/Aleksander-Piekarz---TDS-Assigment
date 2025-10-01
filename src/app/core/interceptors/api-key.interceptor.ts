import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { CURRENCY_BEACON_API_KEY } from '../tokens/api-key';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
  constructor(@Inject(CURRENCY_BEACON_API_KEY) private apiKey: string) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    });

    return next.handle(authReq);
  }
}

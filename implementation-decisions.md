# Implementation decisions - Currency Converter

### Summary

This document records assumptions and decisions made to implement the task.

---

## Assumptions

- The CurrencyBeacon API key is stored in environment configuration and injected via an `InjectionToken`.
- The currency list is loaded into the store on site entry.
- Conversion is live with debounce time.
- All conventions are adopted — components are kept as dumb as possible; logic lives outside them - f.e. in effects.

--- 

## State management:

### Choice:

NgRx Store

### Reason:

Signal store service would be enough, but NgRx was intentionally chosen to demonstrate skills with the Redux pattern (actions, effects, reducers/selectors).  
**State shape:**

- `currencies` — list of currency entities + `loading` + `error`
- `last conversion` — last conversion response `{ from, to, amount, result, rate, loading, error }`

## HTTP auth:

### Choice:

HTTP Interceptor

### Reason:

I considered creating a custom `HttpClient` that would extend HttpClient and add the auth header, but that approach is more complicatedand would be overkill for this app. An interceptor is simpler, and centralizes header logic without changing service call sites.

**Behavior:** The interceptor injects the API key from an `InjectionToken` and adds `Authorization: Bearer <API_KEY>` to outgoing requests.

## Request flow

- **Fetch currencies:** dispatch `loadCurrencies` on site enter so UI can show a clear loader and the list is available for selects.
- **Convert currency:** live conversion on user changes — listen to `FormControl.valueChanges` for `amount`, `from`, `to` and dispatch `convertRequest`. Effects call the backend and emit success/failure actions.

## Mapping and typing

- Use explicit DTO interfaces that reflect API payloads (snake_case).
- Implement mapper classes (`fromDTO` / `toDTO`) to convert DTOs into camelCase app models. 


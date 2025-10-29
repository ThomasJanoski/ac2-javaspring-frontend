// src/app/interceptors/error.interceptor.ts
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  return next(req).pipe(
    catchError((error: any) => {
      let errorMessage = 'Ocorreu um erro desconhecido.';

      if (error.error?.errors && Array.isArray(error.error.errors)) {
        errorMessage = error.error.errors.join('\n');
      } else if (typeof error.error === 'string') {
        errorMessage = error.error;
      } else if (error.message) {
        errorMessage = error.message;
      }

      // Exibe o erro no alert
      alert(errorMessage);

      return throwError(() => error);
    })
  );
};
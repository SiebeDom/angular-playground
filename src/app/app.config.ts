import {ApplicationConfig, provideBrowserGlobalErrorListeners} from '@angular/core';
import {provideRouter} from '@angular/router';
import {providePrimeNG} from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import {routes} from './app.routes';
import {HttpInterceptorFn, HttpResponse, provideHttpClient, withInterceptors} from '@angular/common/http';
import {delay, of} from 'rxjs';
import {MessageService} from 'primeng/api';

// export const demoBackendInterceptor: HttpInterceptorFn = (req, next) => {
//   // READ
//   if (req.method === 'GET') {
//     console.log(req.url);
//     if (req.url.startsWith('/api/enterprises')) {
//       return of(new HttpResponse({
//         status: 200,
//         body: [
//           {id: 1, name: 'Colruyt'},
//           {id: 2, name: 'Delhaize'}
//         ]
//       })).pipe(delay(400));
//     }
//   }
//
//   // WRITE (sometimes fail)
//   if (req.method === 'POST' && req.url.startsWith('/api/enterprises')) {
//     // const shouldFail = Math.random() < 0.3;
//     //
//     // if (shouldFail) {
//     //   return throwError(() =>
//     //     new HttpErrorResponse({
//     //       status: 500,
//     //       error: { message: 'Random demo failure' }
//     //     })
//     //   ).pipe(delay(400));
//     // }
//
//     return of(new HttpResponse({
//       status: 200,
//       body: { success: true }
//     })).pipe(delay(400));
//   }
//
//   // fallback to real backend if needed
//   return next(req);
// };

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
    MessageService
    // provideHttpClient(
    //   withInterceptors([demoBackendInterceptor])
    // )
  ]
};

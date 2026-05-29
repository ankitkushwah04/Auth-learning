import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptorInterceptor } from './services/authInterceptor/auth-interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [

    {
      provide: HTTP_INTERCEPTORS,
      useValue: authInterceptorInterceptor,
      multi: true
    },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptorInterceptor]))
    ]
};

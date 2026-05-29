import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../token.service';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(TokenService);
    const jwtToken = authService.token;
    if (jwtToken) {
      const clonedRequest = req.clone({headers: req.headers.set('Authorization', `Bearer ${jwtToken}`)});
      return next(clonedRequest);
    }
    return next(req);
};

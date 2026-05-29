import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistrationRequest } from './models/RegistrationRequest';
import { AuthenticationRequest } from './models/AuthenticationRequest';
import { AuthenticationResponse } from './models/AuthenticationResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private readonly baseUrl = `http://localhost:8080/api/v1/auth`;

  constructor(private http: HttpClient) {}

  // 🔐 LOGIN
  authenticate(
    request: AuthenticationRequest
  ): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(
      `${this.baseUrl}/authenticate`,
      request
    );
  }

  // 📝 REGISTER
  register(
    request: RegistrationRequest
  ): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/register`,
      request
    );
  }

   confirm(
     token: string
    ):Observable<void> {
   return this.http.post<void>( `${this.baseUrl}/activate-account`,null,{
    params:{
      token:token
    }
   })
  }
}


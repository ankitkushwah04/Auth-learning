import { NgForOf, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AuthenticationRequest } from "../../services/models/AuthenticationRequest";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { TokenService } from "../../services/token.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authRequest: AuthenticationRequest = {email: '', password: ''};
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService
  ) {
  }

  login() {
    this.errorMsg = [];
    this.authService.authenticate( this.authRequest )
    .subscribe({
      next: (res) => {
        this.tokenService.token = res.token as string;
        this.router.navigate(['dashboard'])
      },
      error: (err) => {
        console.log(err);
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors
        } else {
          this.errorMsg.push(err.error.businessErrorMessage)
        }
      }
    });
  }

  register() {
    this.router.navigate(['register']);
  }


 loginByOauth2(provider: string) {
  window.location.href =
    `http://localhost:8080/api/v1/oauth2/authorization/${provider}`;
}


}



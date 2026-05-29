import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {Router} from '@angular/router';
import { RegistrationRequest } from '../../services/models/RegistrationRequest';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registrationRequest: RegistrationRequest = {email: '', password: '', firstname: '', lastname: ''};
  errorMsg: Array<string> = [];


  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  login() {
    this.router.navigate(['login']);
  }

  register() {
    this.errorMsg = [];
    this.authService.register(
       this.registrationRequest
    ).subscribe({
      next: () => {
        this.router.navigate(['activate-account']);
      },
      error: (err) => {
        console.log(err);
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors
        } else {
          this.errorMsg.push('This email is already exit!')
        }
      }
    });
  }
}


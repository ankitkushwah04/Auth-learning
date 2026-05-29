import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {CodeInputModule} from 'angular-code-input';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-activate-account',
  standalone: true,
  imports: [
    CodeInputModule,
    NgIf,
  ],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss'
})
export class ActivateAccountComponent {

  message: string = '';
  isOkay: boolean = true;
  submitted: boolean = false;


  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  redirectToLogin() {
    this.router.navigate(['login']);
  }

  onCodeCompleted(token: string) {
    this.confirmAccount(token);
  }

  private confirmAccount(token: string) {
    this.authService.confirm(
      token
    ).subscribe({
      next: () => {
        this.message = 'Your account is successfully activated!!';
        this.submitted = true;
        this.isOkay = true;
      },
      error: () => {
        this.message = 'Token has been expired or invalid';
        this.submitted = true;
        this.isOkay = false;
      }
    });
  }
}

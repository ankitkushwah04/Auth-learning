import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Oauth2SuccessComponent } from './pages/oauth2success/oauth2success.component';
import { authGuard } from './services/guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent,

  },
  {
    path: 'register',
    component: RegisterComponent,

  },
  {
    path: 'activate-account',
    component: ActivateAccountComponent,

  },
  {
  path: 'oauth2/success',
  component: Oauth2SuccessComponent
  }
,
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  }




























]

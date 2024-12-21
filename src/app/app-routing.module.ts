import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { OtpComponent } from './components/otp/otp.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ProfileComponent } from './components/profile/profile.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'otp-verification', component: OtpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent,canActivate: [authGuard] },
  {path : 'forgot-password', component : ForgotPasswordComponent},
  {path : 'reset-password' , component : ResetPasswordComponent},
  {path : 'profile' , component : ProfileComponent, canActivate: [authGuard] },
  { path: '', component: HomeComponent,canActivate: [authGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

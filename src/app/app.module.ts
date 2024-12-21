import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Amplify } from 'aws-amplify';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

import { FormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';
import { OtpComponent } from './components/otp/otp.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthInterceptor } from './auth.interceptor';



Amplify.configure({
  Auth: {
    Cognito : {
      userPoolId : '',
      userPoolClientId : '',
      signUpVerificationMethod : 'code',
    }
  },
});

@NgModule({
  declarations: [ 
    AppComponent,
    SignupComponent,
    OtpComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,  // Add the AuthInterceptor
      multi: true  // This ensures multiple interceptors can be used
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component } from '@angular/core';
import { signUp } from "aws-amplify/auth";
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  selectedCountryCode: string = '+1';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  countryCodes = [
    { name: 'United States', code: '+1' },
    { name: 'India', code: '+91' },
    { name: 'United Kingdom', code: '+44' },
    { name: 'Australia', code: '+61' },
    { name: 'Germany', code: '+49' },
  ];

  get passwordMismatch(): boolean {
    return this.confirmPassword !== this.password;
  }
  
  password: string = '';

  constructor(private router: Router) {}

  async onSignUp(signUpForm: NgForm) {
    this.errorMessage = '';
    this.successMessage = '';

    const phoneNumberWithCode = `${this.selectedCountryCode}${signUpForm.value.phoneNumber}`;
    console.log(signUpForm.value);
    
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: signUpForm.value.username,
        password: signUpForm.value.password,
        options: {
          userAttributes: {
            preferred_username : signUpForm.value.username,
            email: signUpForm.value.email,
            phone_number: phoneNumberWithCode,
            given_name: signUpForm.value.givenName,
            family_name: signUpForm.value.familyName,
          },
        },
      });
      this.successMessage = 'Signup successful! Check your email for confirmation.';
      if (nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
        this.router.navigate(['/otp-verification'], { queryParams: { username: signUpForm.value.username } });
      }
    } catch (error: any) {
      console.log(error);
      
      this.errorMessage = error.message || 'An error occurred during signup.';
    }
  }
}

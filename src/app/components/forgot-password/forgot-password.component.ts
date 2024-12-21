import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { resetPassword, type ResetPasswordOutput } from 'aws-amplify/auth';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  email: string = '';
  
  constructor(
    private router: Router,
    private http: HttpClient 
  ) 
  {}

 async onForgotPassword() {
    if (!this.email) 
      return;
    
    try {
      const output = await resetPassword({
        username: this.email
      });
      this.handleResetPasswordNextSteps(output);
    } catch (error) {
      console.log(error);
    }
  }

  handleResetPasswordNextSteps(output: ResetPasswordOutput) {
    const { nextStep } = output;
    switch (nextStep.resetPasswordStep) {
      case 'CONFIRM_RESET_PASSWORD_WITH_CODE':
        const codeDeliveryDetails = nextStep.codeDeliveryDetails;
        console.log(
          `Confirmation code was sent to ${codeDeliveryDetails.deliveryMedium}`
        );
        this.router.navigate(['/reset-password'],{ queryParams: { email: this.email }})
        break;
      case 'DONE':
        console.log('Successfully reset password.');
        break;
    }
  }
}

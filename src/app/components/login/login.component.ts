import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { signIn } from '@aws-amplify/auth';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username : string = ''
  password : string = ''
  email : string  = ''

  constructor(private auth : AuthService,private router : Router){}

  async onLogin() {
    console.log('Login with', this.username, this.password);
    try {
      const { nextStep: signInNextStep } = await signIn({
        username: this.email,
        password: this.password,
        options: {
          authFlowType: 'USER_AUTH',
          preferredChallenge: 'PASSWORD_SRP', 
        },
      });
      if (signInNextStep.signInStep === 'DONE') {
        this.auth.loginStatusChanged.emit();
        this.router.navigate(['/home'])
      }
     console.log(signInNextStep);
    }
    catch (error: any) {
      console.error('Error during sign in:', error);
    }
  }

  
  onResetPassword() {
    this.router.navigate(['/forgot-password'])
  }
  
}

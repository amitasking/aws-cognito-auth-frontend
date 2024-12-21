import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { confirmSignUp } from 'aws-amplify/auth';


@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    // Ensure that the OTP fields are initialized before any method is called
    console.log('OTP Fields Initialized:', this.otp1, this.otp2, this.otp3, this.otp4);
  }

  @ViewChild('otp1') otp1: ElementRef | undefined;
  @ViewChild('otp2') otp2: ElementRef | undefined;
  @ViewChild('otp3') otp3: ElementRef | undefined;
  @ViewChild('otp4') otp4: ElementRef | undefined;
  @ViewChild('otp5') otp5: ElementRef | undefined;
  @ViewChild('otp6') otp6: ElementRef | undefined;

  username : string  = ''
 
  constructor(private route: ActivatedRoute, private router : Router) {}

  ngOnInit() {
    // Access the 'username' query parameter from the URL
    this.route.queryParams.subscribe((params) => {
      this.username = params['username'];
      console.log('Username from query params:', this.username);
    });
  }

  
  async onSubmit() {
    
    const otp = `${this.otp1?.nativeElement.value}${this.otp2?.nativeElement.value}${this.otp3?.nativeElement.value}${this.otp4?.nativeElement.value}${this.otp5?.nativeElement.value}${this.otp6?.nativeElement.value}`;

    try{
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username: this.username,
        confirmationCode: otp
      });

      if(nextStep && nextStep.signUpStep == 'DONE'){
        this.router.navigate(['/login'])
      }
      console.log({ isSignUpComplete, nextStep });
    }
    catch (error: any) {
      console.error('Error during sign up:', error);
    }
 
  }

  resendOtp() {
    console.log('Resend OTP clicked');
  }
}

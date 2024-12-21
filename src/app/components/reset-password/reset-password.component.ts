import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import {
  confirmResetPassword,
  type ConfirmResetPasswordInput
} from 'aws-amplify/auth';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit{
  username: string = ''; // Two-way binding for username
  confirmationCode: string = ''; // Two-way binding for confirmation code
  newPassword: string = ''; // Two-way binding for new password

  constructor(
    private router: Router,
    private http: HttpClient, 
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
      this.username = params['email']; 
    });
  }


  // async function handleConfirmResetPassword({
  //   username,
  //   confirmationCode,
  //   newPassword
  // }: ConfirmResetPasswordInput) {
  //   try {
  //     await confirmResetPassword({ username, confirmationCode, newPassword });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  async onResetPassword(form: NgForm) {
    if (form.invalid) {
      // this.toastr.error('Please fix the errors in the form.', 'Error');
      return;
    }

    try {
      await confirmResetPassword({ username : this.username, confirmationCode : this.confirmationCode, newPassword : this.newPassword });
      this.router.navigate(['/login'])
    } catch (error) {
      console.log(error);
    }
  }
}

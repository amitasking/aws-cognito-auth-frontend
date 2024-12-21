import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fetchUserAttributes } from 'aws-amplify/auth';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileData : any = {}

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.handleFetchUserAttributes()
  }

  onEditProfile(): void {
    this.router.navigate(['/edit-profile']); 
  }

  async handleFetchUserAttributes() {
    try {
      const userAttributes = await fetchUserAttributes();
      this.profileData = userAttributes

      console.log(userAttributes);
    } catch (error) {
      console.log(error);
    }
  }
}

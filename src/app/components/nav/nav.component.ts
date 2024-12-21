import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fetchAuthSession, signOut } from '@aws-amplify/auth';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
  isLoggedIn : boolean = false;
  constructor(private router : Router,private auth : AuthService, private http : HttpClient){}

  ngOnInit() {
    this.auth.loginStatusChanged.subscribe(()=>{
      this.checkLoginStatus();
    })
    this.checkLoginStatus();
  }

  async checkLoginStatus() {
    try {
      const session = await fetchAuthSession();
      this.isLoggedIn = !!session.tokens?.accessToken;
    } catch (error) {
      this.isLoggedIn = false;
    }
  }


  async signOut() {
    try {
      await signOut().then(()=>{
        const logoutModal = document.getElementById('logoutModal');
          if (logoutModal) {
            const modal = bootstrap.Modal.getInstance(logoutModal);
            modal.hide();
            this.router.navigate(['/login'])
            const modalBackdrops = document.querySelectorAll('.modal-backdrop');
            modalBackdrops.forEach((backdrop) => backdrop.remove());
            this.router.navigate(['/login'])
            this.checkLoginStatus()
          }
      });
      const logoutModal = document.getElementById('logoutModal');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: {
    name: String;
    username: String;
    email: String
  };

  constructor(
    private authService:AuthService,
    private router:Router
  ) { }

  // Initialize the user
  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      // console.log(profile.user);
      this.user = profile.user;
    },
    err => {
      console.log(err);
      return false;
    });
  }

}

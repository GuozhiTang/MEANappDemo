import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
// import { tokenNotExpired } from 'angular2-jwt';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // have a couple of properties in the auth service
  authToken: any;
  user: any;

  // Inject the modules into the constructor
  constructor(
    private http:Http,
    public jwtHelper:JwtHelperService
    ) { }

  // Function to register to the user
  // Here is where we actually reach into our backend API and make that post request to register
  registerUser(user) {
    // Set header values
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    // return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
    return this.http.post('users/register', user, {headers: headers})
      .pipe(map(res => res.json()));
  }

  authenticateUser(user) {
    // Set header values
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    // return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers})
    return this.http.post('users/authenticate', user, {headers: headers})
      .pipe(map(res => res.json()));
  }

  getProfile() {
    // Set header values
    let headers = new Headers();
    this.loadToken();
    // Use the token here
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    // return this.http.get('http://localhost:3000/users/profile', {headers: headers})
    return this.http.get('users/profile', {headers: headers})
      .pipe(map(res => res.json()));
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  // get token from local storage
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  // loggedIn() {
  //   return tokenNotExpired();
  // }
  isTokenExp(){
    return this.jwtHelper.isTokenExpired();
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}

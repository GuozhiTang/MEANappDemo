import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
// import { tokenNotExpired } from 'angular2-jwt';
import { JwtHelperService } from '@auth0/angular-jwt';
import { testServer } from '../testServer';

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

  /**
   * Function to register to the user
   * Here is where we actually reach into our backend API and make that post request to register
   * @param user json sent to local server conatining all information for users
   */
  registerUser(user) {
    // Set header values
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(testServer + 'users/register', user, {headers: headers})
      .pipe(map(res => res.json()));
  }

  /**
   * Authenticate the login information for the specific users
   * @param user json sent to local server conatining all information for authenticating existed users.
   */
  authenticateUser(user) {
    // Set header values
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(testServer + 'users/authenticate', user, {headers: headers})
      .pipe(map(res => res.json()));
  }

  /**
   * Load the data in local storage and set it as current user
   * Before login there should be a null user from users/nulluser
   */
  getProfile() {
    // Set header values
    let headers = new Headers();
    this.loadToken();
    // Use the token here
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get(testServer + 'users/profile', {headers: headers})
      .pipe(map(res => res.json()));
  }

  /**
   * Store login information in local storage
   * @param token the token information of authentication
   * @param user the users information of login user
   */
  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  /**
   * Get token from local storage
   */
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  // loggedIn() {
  //   return tokenNotExpired();
  // }

  /**
   * Judge whether the token of login user has expired
   */
  isTokenExp(){
    return this.jwtHelper.isTokenExpired();
  }

  /**
   * Functionality of logout and set token and user information as null. Finally clear up the local storage
   */
  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}

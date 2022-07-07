import {urlValues} from '../configs/url.values';
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import {throwError} from 'rxjs';

import { User } from './user.model';
import {UserToken} from "./userToken.model";
import {ApiService} from "../services/api.service";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  token: UserToken;
  loggedUser: User;
  routerState: string = '';

  constructor(private http: HttpClient,
              private router: Router,
              private apiService: ApiService,
    ) {
    const checkUserToken = localStorage.getItem('userToken')
    if (checkUserToken) this.token = new UserToken(JSON.parse(checkUserToken))

    const checkLoggedUser = localStorage.getItem('userData')
    if (checkLoggedUser) this.loggedUser = new User(JSON.parse(checkLoggedUser))
  }

  login(email: string, password: string) {
    return this.apiService
      .send(
        urlValues.login.method,
        urlValues.login.url,
        { email, password }
      ).pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData['token'],
            resData['user']
          );
        })
      );
  }


  private handleAuthentication(
    token: any,
    user: any
  ) {
    this.token = new UserToken(token);
    this.loggedUser = new User(user);
    localStorage.setItem('userData', JSON.stringify(user));
    localStorage.setItem('userToken', JSON.stringify(token));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }

  logout() {
    localStorage.removeItem('userData');
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }

}

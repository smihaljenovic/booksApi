import { Component } from '@angular/core';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  error: string;
  isLoading = false;


  constructor(private authService: AuthService,
              private router: Router) { }


  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<any>;
    this.isLoading = true;
    authObs = this.authService.login(email, password);

    authObs.subscribe(
      resData => {
        this.isLoading = false;
        this.router.navigate(['/authors']);
      },
      errorMessage => {
        console.log('.... login form error');
        console.log(errorMessage);
        this.isLoading = false;
        this.error = errorMessage;
      }
    );

    form.reset();
  }
}

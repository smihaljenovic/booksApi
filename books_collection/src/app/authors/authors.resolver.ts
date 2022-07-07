import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {ApiService} from "../services/api.service";
import {User} from "../auth/user.model";
import {AuthorsService} from "./authors.service";

@Injectable()
export class AuthorsResolver implements Resolve<any> {

  constructor(private authorsService: AuthorsService,
              private apiService: ApiService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.apiService.handleRequest(this.authorsService.getAuthors());
  }

}

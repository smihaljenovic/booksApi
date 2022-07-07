import {Observable} from "rxjs";
import {User} from "../auth/user.model";
import {urlValues} from "../configs/url.values";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {UserToken} from "../auth/userToken.model";
import {Router} from "@angular/router";
import {ApiService} from "../services/api.service";



@Injectable()
export class AuthorsService {
  token: UserToken;
  loggedUser: User;
  authors: User[] = [];

  constructor(private http: HttpClient,
              private router: Router,
              private apiService: ApiService,
  ) {
    const checkUserToken = localStorage.getItem('userToken')
    if (checkUserToken) this.token = new UserToken(JSON.parse(checkUserToken))

    const checkLoggedUser = localStorage.getItem('userData')
    if (checkLoggedUser) this.loggedUser = new User(JSON.parse(checkLoggedUser))
  }

  getAuthor(authorID: number) {
    return this.authors.find(auth => auth.id === authorID)
  }

  getAuthors(): Observable<User[]> {
    return new Observable<User[]>(obs => {
      this.apiService.send(urlValues.listUsers.method, urlValues.listUsers.url, null, new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token.token}`
      })).subscribe(res => {
        this.authors = res['data'].map(user => new User(user));
        obs.next(this.authors);
        obs.complete();
      }, err => {
        obs.error(err);
        obs.complete();
      });
    });
  }

  addAuthor(formValues: User) {
    console.log('.... creating new user');
    console.log(formValues);
    this.apiService.send(urlValues.createUser.method, urlValues.createUser.url, formValues, new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}`
    })).subscribe(res => {
      console.log('.... sucessfuly created user');
      this.router.navigateByUrl(``).then(() => location.reload());
    }, err => {
      console.log(err);
    });
  }

  updateAuthor(authorID: number, formValues: User) {
    this.apiService.send(urlValues.updateUser.method, `${urlValues.updateUser.url}/${authorID}`, formValues, new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}`
    })).subscribe(res => {
      console.log('.... successfully user updated');
      this.router.navigateByUrl(``).then(() => location.reload());
    }, err => {
      console.log(err);
    });
  }

  deleteAuthor(authorId: number) {
    this.apiService.send(urlValues.deleteUser.method, `${urlValues.deleteUser.url}/${authorId}`, null, new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}`
    })).subscribe(res => {
      console.log('.... successfully user deleted');
      this.router.navigateByUrl(``).then(() => location.reload());
    }, err => {
      console.log(err);
    });
  }
}

import {Observable} from "rxjs";
import {User} from "../auth/user.model";
import {urlValues} from "../configs/url.values";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {UserToken} from "../auth/userToken.model";
import {Router} from "@angular/router";
import {ApiService} from "../services/api.service";
import {Book} from "./book.model";



@Injectable()
export class BooksService {
  token: UserToken;
  loggedUser: User;
  books: Book[];

  constructor(private http: HttpClient,
              private router: Router,
              private apiService: ApiService,
  ) {
    const checkUserToken = localStorage.getItem('userToken')
    if (checkUserToken) this.token = new UserToken(JSON.parse(checkUserToken))

    const checkLoggedUser = localStorage.getItem('userData')
    if (checkLoggedUser) this.loggedUser = new User(JSON.parse(checkLoggedUser))
  }

  getBooks(authorID: number): Observable<Book[]> {
    return new Observable<Book[]>(obs => {
      this.apiService.send(urlValues.listBooks.method, `${urlValues.listBooks.url}?authorID=${authorID}`, null, new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token.token}`
      })).subscribe(res => {
        this.books = res['data'].map(book => new Book(book));
        obs.next(this.books);
        obs.complete();
      }, err => {
        obs.error(err);
        obs.complete();
      });
    });
  }

  getBook(bookID: number) {
    console.log('.... get book method');
    console.log({bookID});
    console.log(this.books);
    return this.books.find(book => book.id === bookID)
  }

  addBook(formValues: Book) {
    console.log('.... creating new book');
    console.log(formValues);
    this.apiService.send(urlValues.createBook.method, urlValues.createBook.url, formValues, new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}`
    })).subscribe(res => {
      console.log('.... sucessfuly created book');
      this.router.navigateByUrl(``).then(() => location.reload());
    }, err => {
      console.log(err);
    });
  }

  updateBook(bookID: number, formValues: Book) {
    this.apiService.send(urlValues.updateBook.method, `${urlValues.updateBook.url}/${bookID}`, formValues, new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}`
    })).subscribe(res => {
      console.log('.... successfully book updated');
      this.router.navigateByUrl(``).then(() => location.reload());
    }, err => {
      console.log(err);
    });
  }

  deleteBook(bookId: number) {
    this.apiService.send(urlValues.deleteBook.method, `${urlValues.deleteBook.url}/${bookId}`, null, new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}`
    })).subscribe(res => {

    }, err => {
      console.log(err);
    });
  }
}

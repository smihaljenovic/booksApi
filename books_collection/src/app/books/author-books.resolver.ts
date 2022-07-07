import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Params, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {ApiService} from "../services/api.service";
import {BooksService} from "./books.service";
import {Book} from "./book.model";

@Injectable()
export class AuthorBooksResolver implements Resolve<any> {

  constructor(private booksService: BooksService,
              private apiService: ApiService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Book> {
    return this.apiService.handleRequest(this.booksService.getBooks(+route.params['id']));
  }

}

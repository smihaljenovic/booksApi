import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";



@Injectable()
export class ApiService {
  constructor(
    private _http: HttpClient,
    private _router: Router
  ) {
  }

  send(method: string, url: string, body?: any, headers?: HttpHeaders) {
    return this._http.request(method, url, {body: body, headers: headers, reportProgress: true});
  };

  handleRequest(observable: Observable<any>): Observable<any> {
    return new Observable<any>(obs => {
      observable.subscribe(res => {
          obs.next(res);
          obs.complete();
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          this._router.navigate(['/']);
          obs.next(null); //next instead of error, so the console does not show the error
          obs.complete();
        });
    });
  }
}

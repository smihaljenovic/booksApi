import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthComponent} from "./auth/auth.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ApiService} from "./services/api.service";
import {AuthService} from "./auth/auth.service";
import {AuthGuard} from "./auth/auth.guard";
import {LoadingSpinnerComponent} from "./components/loading-spinner/loading-spinner.component";
import {AuthorsComponent} from "./authors/authors.components";
import {BooksComponent} from "./books/books.component";
import {AuthorsResolver} from "./authors/authors.resolver";
import {AuthorsService} from "./authors/authors.service";
import {BooksService} from "./books/books.service";
import {AuthorBooksResolver} from "./books/author-books.resolver";
import {AuthorsEditComponent} from "./authors/authors-edit/authors-edit.component";
import {BooksEditComponent} from "./books/books-edit/books-edit.component";

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AuthorsComponent,
    AuthorsEditComponent,
    BooksComponent,
    BooksEditComponent,
    DashboardComponent,
    LoadingSpinnerComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
  providers: [
    ApiService,
    AuthService,
    AuthorsService,
    AuthGuard,
    AuthorsResolver,
    AuthorBooksResolver,
    BooksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

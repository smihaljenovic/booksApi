import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from "./auth/auth.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuard} from "./auth/auth.guard";
import {AuthorsResolver} from "./authors/authors.resolver";
import {BooksComponent} from "./books/books.component";
import {AuthorBooksResolver} from "./books/author-books.resolver";
import {AuthorsEditComponent} from "./authors/authors-edit/authors-edit.component";
import {BooksEditComponent} from "./books/books-edit/books-edit.component";

const routes: Routes = [
  { path: '', redirectTo: '/authors', pathMatch: 'full' },
  { path: 'authors',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    resolve: { authorsList: AuthorsResolver },
    children: [
      { path: 'new', component: AuthorsEditComponent },
      { path: 'edit/:id', component: AuthorsEditComponent },
      { path: ':id', component: BooksComponent, resolve: { authorBooks: AuthorBooksResolver } },
      { path: ':id/new', component: BooksEditComponent },
      { path: ':id/edit/:bookid', component: BooksEditComponent },
    ]
  },
  { path: 'login', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

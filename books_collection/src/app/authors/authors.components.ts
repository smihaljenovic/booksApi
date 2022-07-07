import { Component } from '@angular/core';
import {User} from "../auth/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthorsService} from "./authors.service";

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.components.css']
})
export class AuthorsComponent {
  users: [User];
  loggedUser: User;

  constructor(private router: Router,
              private authorService: AuthorsService,
              private route: ActivatedRoute,
              ) {
    this.users = this.route.snapshot.data['authorsList'];

    const checkLoggedUser = localStorage.getItem('userData');
    if (checkLoggedUser) this.loggedUser = new User(JSON.parse(checkLoggedUser));
  }

  getAuthorBooks(authorID: number) {
    this.router.navigateByUrl(`/authors/${authorID}`);
  }

  deleteAuthor(authorId: number) {
    this.authorService.deleteAuthor(authorId);
    this.router.navigateByUrl(`/authors`).then(() => location.reload());
  }

  onNewAuthor() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onEditAuthor(authorID: number) {
    this.router.navigate([`edit/${authorID}`], {relativeTo: this.route});
  }
}

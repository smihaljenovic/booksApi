import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Book} from "./book.model";
import {BooksService} from "./books.service";
import {User} from "../auth/user.model";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  id: number;
  books: Book[];
  loggedUser: User;

  constructor(private booksService: BooksService,
              private route: ActivatedRoute,
              private router: Router
              ) {
    this.books = this.route.snapshot.data['authorBooks'];

    const checkLoggedUser = localStorage.getItem('userData')
    if (checkLoggedUser) this.loggedUser = new User(JSON.parse(checkLoggedUser))
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.booksService.getBooks(this.id).subscribe(res => {
        this.books = res;
      }, error => {
        console.log(error);
      })
    });
  }

  onNewBook() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onEditBook(bookID: number) {
    this.router.navigate([`edit/${bookID}`], {relativeTo: this.route});
  }

  deleteBook(bookId: number) {
    this.booksService.deleteBook(bookId)
    this.router.navigateByUrl(`/authors`).then(() => location.reload());
  }
}

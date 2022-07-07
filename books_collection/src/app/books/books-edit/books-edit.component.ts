import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {BooksService} from "../books.service";

@Component({
  selector: 'app-books-edit',
  templateUrl: './books-edit.component.html',
  styleUrls: ['./books-edit.component.css']
})
export class BooksEditComponent implements OnInit {
  id: number;
  authorID: number;
  editMode = false;
  bookForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private booksService: BooksService,
              private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['bookid'];
      this.authorID = +params['id'];
      this.editMode = params['bookid'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    console.log('.... submiting form');
    console.log('Edit mode: ', this.editMode);
    if (this.editMode) {
      this.booksService.updateBook(this.id, this.bookForm.value);
    } else {
      this.booksService.addBook(this.bookForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let title: string | undefined;
    let publisher: string | undefined;
    let authorId: number | undefined;
    console.log('... initialise book form');
    if (this.editMode) {
      console.log('.... editing mode');
      const book = this.booksService.getBook(this.id);
      console.log(book);
      title = book?.title;
      publisher = book?.publisher;
      authorId = book?.author_id;
    }

    this.bookForm = new FormGroup({
      title: new FormControl(title, Validators.required),
      publisher: new FormControl(publisher),
      authorID: new FormControl(authorId),
    });
  }
}

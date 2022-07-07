import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AuthorsService} from "../authors.service";

@Component({
  selector: 'app-authors-edit',
  templateUrl: './authors-edit.component.html',
  styleUrls: ['./authors-edit.component.css']
})
export class AuthorsEditComponent implements OnInit {
  id: number;
  editMode = false;
  authorForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private authorService: AuthorsService,
              private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    console.log('.... submiting form');
    console.log('Edit mode: ', this.editMode);
    if (this.editMode) {
      this.authorService.updateAuthor(this.id, this.authorForm.value);
    } else {
      this.authorService.addAuthor(this.authorForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let firstName: string | undefined;
    let lastName: string | undefined;
    let email: string | undefined;
    let password: string | undefined;

    if (this.editMode) {
      const author = this.authorService.getAuthor(this.id);
      firstName = author?.firstName;
      lastName = author?.lastName;
      email = author?.email;
      password = author?.password;
    }

    this.authorForm = new FormGroup({
      firstName: new FormControl(firstName, Validators.required),
      lastName: new FormControl(lastName, Validators.required),
      email: new FormControl(email, Validators.required),
      password: new FormControl(password, Validators.required),
    });
  }
}

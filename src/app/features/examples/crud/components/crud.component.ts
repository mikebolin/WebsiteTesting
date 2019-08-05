import { Router } from '@angular/router';
import { FormBuilder, NgForm } from '@angular/forms';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../../core/core.module';

import { State } from '../../examples.state';
import { Book } from '../books.model';
import { actionBooksDeleteOne, actionBooksUpsertOne } from '../books.actions';
import { selectSelectedBook, selectAllBooks } from '../books.selectors';

@Component({
  selector: 'anms-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrudComponent {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  bookFormGroup = this.fb.group(CrudComponent.createBook());
  books$: Observable<Book[]> = this.store.pipe(select(selectAllBooks));
  selectedBook$: Observable<Book> = this.store.pipe(select(selectSelectedBook));

  isEditing: boolean;


  static createBook(): Book {

        var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); 
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return {
      id: uuid,
      title: '',
      author: '',
      description: ''
    };
  }

  constructor(
    public store: Store<State>,
    public fb: FormBuilder,
    private router: Router
  ) {}

  select(book: Book) {
    this.isEditing = false;
    this.router.navigate(['examples/crud', book.id]);
  }

  deselect() {
    this.isEditing = false;
    this.router.navigate(['examples/crud']);
  }

  edit(book: Book) {
    this.isEditing = true;
    this.bookFormGroup.setValue(book);
  }

  addNew(bookForm: NgForm) {
    bookForm.resetForm();
    this.bookFormGroup.reset();
    this.bookFormGroup.setValue(CrudComponent.createBook());
    this.isEditing = true;
  }

  cancelEditing() {
    this.isEditing = false;
  }

  delete(book: Book) {
    this.store.dispatch(actionBooksDeleteOne({ id: book.id }));
    this.isEditing = false;
    this.router.navigate(['examples/crud']);
  }

  save() {
    if (this.bookFormGroup.valid) {
      const book = this.bookFormGroup.value;
      this.store.dispatch(actionBooksUpsertOne({ book }));
      this.isEditing = false;
      this.router.navigate(['examples/crud', book.id]);
    }
  }

  
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IBook } from 'src/app/interfaces/books/books.interface';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent {
  
    constructor() { }
    @Input() books$!: Observable<IBook[]>;
    @Input() isLoading$: Observable<boolean> = new Observable<boolean>();
    @Input() error$: Observable<boolean> = new Observable<boolean>();
    @Input() whiteList$!: Observable<IBook[]>;
    @Input() modalType = '';
    @Output() removeFromWhitelistEv = new EventEmitter<string>();
    
    removeFromWhitelists(id: string) {
      this.removeFromWhitelistEv.emit(id)
    }

}

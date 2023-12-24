import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Route, Router, RouterEvent } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, filter, switchMap, takeUntil } from 'rxjs';
import { IBook } from 'src/app/interfaces/books/books.interface';
import { IBooksState } from 'src/app/interfaces/books/books.state.interface';
import { BooksService } from 'src/app/services/books/books.service';
import { addToWhiteList, removeFromWhiteList } from 'src/app/state/books/books.actions';

@Component({
  selector: 'app-book-details-modal',
  templateUrl: './book-details-modal.component.html',
  styleUrls: ['./book-details-modal.component.scss']
})
export class BookDetailsModalComponent implements OnDestroy {


 @Input() modalType: string = '';
  destroy$ = new Subject();
  book$!: Observable<IBook | null>;
  defaultBookImg: string = 'https://res.cloudinary.com/diqcy5uye/image/upload/v1703353113/whitebook_nvgoc8.png'

  
  constructor(private router: Router, private booksService: BooksService, private store : Store<IBooksState>) {
    this.book$ = this.router.events.pipe(
      takeUntil(this.destroy$),
      switchMap((event:any) => {
        const id = this.extractIdFromUrl(event?.routerEvent?.url);
        if (!id) return new Observable<IBook | null>();
        return this.booksService.getBookById(id);
      })
    );
  }
  
  isWhitelisted(bookId: string) {
    return this.booksService.isWhitelisted(bookId);
  }

  removeFromWhitelists(id: string) {
    this.store.dispatch(removeFromWhiteList({ bookId: id }));
  }
  addToWhitelist(book: IBook) {
    this.store.dispatch(addToWhiteList({ book}));
  }


extractIdFromUrl(url: string) {
  if (!url) return null;
  const id = url.split('/').pop();
  return id
}

closeModal() {
  this.router.navigate(['/' + this.modalType + '/all']);
}

ngOnDestroy(): void {
  this.destroy$.next(null);
  this.destroy$.complete();

}
}
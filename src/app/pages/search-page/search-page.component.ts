import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { IBooksState } from 'src/app/interfaces/books/books.state.interface';
import { searchBooks, removeFromWhiteList } from 'src/app/state/books/books.actions';
import { getBooks, getLoading } from 'src/app/state/books/books.selectors';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit, OnDestroy {
  searchTerm = new FormControl('');
  destroy$ = new Subject();
  isLoading$ = this.store.select(getLoading);
  books$ = this.store.select(getBooks);

  constructor(private store: Store<IBooksState>) {
    this.searchTerm.valueChanges.pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$)).subscribe(searchTxt => {
      if (searchTxt === null || searchTxt === undefined) searchTxt = '';
      this.store.dispatch(searchBooks({ query: searchTxt }));
    })
  }

  removeFromWhitelist(id: string) {
    this.store.dispatch(removeFromWhiteList({ bookId: id }));
  }

  ngOnInit(): void {
    this.books$.pipe(takeUntil(this.destroy$)).subscribe(books => {
      if (books && books.length === 0) {
        this.store.dispatch(searchBooks({ query: '' }));
      } 
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();


  }
}

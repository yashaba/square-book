import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { BooksApiService } from '../../services/books/books-api.service';
import * as BookActions from './books.actions';
import { BooksService } from 'src/app/services/books/books.service';
import { Store, select } from '@ngrx/store';
import { getUserName, getWhiteList } from './books.selectors';
import { StorageService } from 'src/app/services/storage/storage.service';

@Injectable()
export class BookEffects {
    constructor(
        private actions$: Actions,
        private booksApiService: BooksApiService,
        private booksService: BooksService,
        private store: Store,
        private storageService: StorageService
      ) {}
    
    searchBooks$ = createEffect(() => this.actions$.pipe(
        ofType(BookActions.searchBooks),
        switchMap(action =>
            this.booksApiService.getBooks(action.query).pipe(
                map(results =>{
                    const books = this.booksService.parseBooks(results);
                    return BookActions.searchBooksSuccess({ results: books })
                }),
                catchError(error => {
                console.error(error);
                return of(BookActions.searchBooksFailure({ error: true }))
                })
                )
                )
    ));

    saveWhitelist$ = createEffect(() => this.actions$.pipe(
        ofType(BookActions.addToWhiteList, BookActions.removeFromWhiteList),
        withLatestFrom(this.store.pipe(select(getWhiteList))),
        map(([action, whiteList]) => {
          StorageService.set('whiteList', whiteList);
          return { type: '[Whitelist] NOOP' };
        })
      ));

    saveUserName$ = createEffect(() => this.actions$.pipe(
        ofType(BookActions.setUserName),
        withLatestFrom(this.store.pipe(select(getUserName))),
        map(([action, userName]) => {
          StorageService.set('username', userName);
          return { type: '[Whitelist] NOOP' };
        })
      ));
                
              
}

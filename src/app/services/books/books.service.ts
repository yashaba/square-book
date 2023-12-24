import { Injectable } from '@angular/core';
import { IRawBooksResponse } from '../../interfaces/books/books.response.interface';
import { IBook } from '../../interfaces/books/books.interface';
import { Store } from '@ngrx/store';
import { IBooksState } from '../../interfaces/books/books.state.interface';
import { getBooks, getWhiteList } from '../../state/books/books.selectors';
import { Observable, combineLatest, find, map, merge } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
books$ = this.store.select(getBooks);
whiteList$ = this.store.select(getWhiteList);
combined$ = merge(this.books$, this.whiteList$);
  constructor(private store: Store<IBooksState>) {
   
   }

 parseBooks(rawBooks: IRawBooksResponse) : IBook[] {
   const books = rawBooks.items.map((book) => {
     return {
       id: book.id,
       title: book.volumeInfo.title,
       subtitle: book.volumeInfo.subtitle,
       authors: book.volumeInfo.authors,
       publishedDate: book.volumeInfo.publishedDate,
       pageCount: book.volumeInfo.pageCount,
       categories: book.volumeInfo.categories,
       imageLinks: book.volumeInfo.imageLinks,
       language: book.volumeInfo.language,
       previewLink: book.volumeInfo.previewLink,
       infoLink: book.volumeInfo.infoLink,
       canonicalVolumeLink: book.volumeInfo.canonicalVolumeLink,
        description: book.searchInfo?.textSnippet,
     }
   })
   return books;
 }

 getBookById(id: string | void): Observable<IBook | null> {
  return combineLatest([this.books$, this.whiteList$]).pipe(
    map(([books, whitelist]) => {
      if (!books || !whitelist) return null;
      const foundInBooks = books.find(book => book.id === id);
      if (foundInBooks) return foundInBooks;

      const foundInWhitelist = whitelist.find(book => book.id === id);
      return foundInWhitelist ? foundInWhitelist : null;
    })
  );
  
 }

 isWhitelisted(id: string): Observable<boolean> {
   return this.whiteList$.pipe(
     map(whitelist => {
       if (!whitelist) return false;
       const found = whitelist.find(book => book.id === id);
       return found ? true : false;
     })
   )
 }

}

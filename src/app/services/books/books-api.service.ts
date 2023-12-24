import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { IRawBooksResponse } from '../../interfaces/books/books.response.interface';

@Injectable({
  providedIn: 'root'
})
export class BooksApiService {
  baseUrl = 'https://www.googleapis.com/books/v1/volumes?q=';
  maxResults = '&maxResults=20';
  fromIndex = '&startIndex=';
  constructor(private http: HttpClient) { }

  getBooks(searchTerm: string, startIndex: number=0) :Observable<IRawBooksResponse> {
    return this.http.get(`${this.baseUrl}"${searchTerm}"${this.maxResults}${this.fromIndex}${startIndex}`) as Observable<IRawBooksResponse>;
  }

}

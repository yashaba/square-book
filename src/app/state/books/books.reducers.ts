import { createReducer, on } from '@ngrx/store';
import { addToWhiteList, removeFromWhiteList, searchBooks, searchBooksFailure, searchBooksSuccess, setUserName } from './books.actions';
import { IBooksState } from '../../interfaces/books/books.state.interface';
import { StorageService } from 'src/app/services/storage/storage.service';
import { IBook } from 'src/app/interfaces/books/books.interface';

const initialState: IBooksState = {
  username: StorageService.get('username') || '',
  books: [],
  whiteList: StorageService.get('whiteList') || [],
  isLoading: false,
  error: false
};
  
  export const booksReducer = createReducer(
    initialState,

    on(setUserName, (state, { username }) => ({
      ...state,
      username
    })),

    on(searchBooks, (state) => ({
      ...state,
      loading: true,
      error: false
    })),

    on(addToWhiteList, (state, { book }) => {
      return({
      ...state,
      whiteList: [...state.whiteList, book]
    })}),

    on(removeFromWhiteList, (state, { bookId }) => ({
      ...state,
      whiteList: state.whiteList.filter((book) => book.id !== bookId)
    })),

    on(searchBooksSuccess, (state, { results }) => ({
      ...state,
      loading: false,
      error: false,
      books: results,
    })),

    on(searchBooksFailure, (state, { error }) => ({
      ...state,
      error,
      loading: false
    }))
  );
  

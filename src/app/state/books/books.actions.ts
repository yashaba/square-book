import { createAction, props } from '@ngrx/store';
import { IBook } from 'src/app/interfaces/books/books.interface';

export const setUserName = createAction(
    '[Books] Set User Name',
    props<{ username: string }>()
);


export const searchBooks = createAction(
    '[Books] Search Books',
    props<{ query: string }>()
);

export const searchBooksSuccess = createAction(
    '[Books] Search Books Success',
    props<{ results: IBook[] }>()
);

export const searchBooksFailure = createAction(
    '[Books] Search Books Failure',
    props<{ error: boolean }>()
);

export const addToWhiteList = createAction(
    '[Books] Add to White List',
    props<{ book: IBook }>()
);

export const removeFromWhiteList = createAction(
    '[Books] Remove from White List',
    props<{ bookId: string }>()
);
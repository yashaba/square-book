import { IBooksState } from "src/app/interfaces/books/books.state.interface";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectBooksState = createFeatureSelector<IBooksState>('books');


export const getUserName = createSelector(
    selectBooksState,
    (state: IBooksState) => state.username
  );
  
  export const getBooks = createSelector(
    selectBooksState,
    (state: IBooksState) => state.books
  );
  
  export const getWhiteList = createSelector(
    selectBooksState,
    (state: IBooksState) => state.whiteList
  );
  
  export const getLoading = createSelector(
    selectBooksState,
    (state: IBooksState) => state.isLoading
  );
  
  export const getError = createSelector(
    selectBooksState,
    (state: IBooksState) => state.error
  );
  

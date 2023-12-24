import { IBook } from "./books.interface";

export interface IBooksState  {
    username: string;
    books: IBook[];
    isLoading: boolean;
    whiteList: IBook[];
    error: boolean;
  };
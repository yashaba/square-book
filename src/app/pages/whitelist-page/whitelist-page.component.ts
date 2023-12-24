import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IBooksState } from 'src/app/interfaces/books/books.state.interface';
import { removeFromWhiteList } from 'src/app/state/books/books.actions';
import { getWhiteList } from 'src/app/state/books/books.selectors';

@Component({
  selector: 'app-whitelist-page',
  templateUrl: './whitelist-page.component.html',
  styleUrls: ['./whitelist-page.component.scss']
})
export class WhitelistPageComponent {

  books$ = this.store.select(getWhiteList);
  constructor(private store: Store<IBooksState>) { }

  
  removeFromWhitelist(id: string) {
    this.store.dispatch(removeFromWhiteList({ bookId: id }));
  }

}

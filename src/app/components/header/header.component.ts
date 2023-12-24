import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IBooksState } from 'src/app/interfaces/books/books.state.interface';
import { setUserName } from 'src/app/state/books/books.actions';
import { getUserName } from 'src/app/state/books/books.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

logout() {
this.store.dispatch(setUserName({ username: '' }))
this.router.navigate(['/'])
}

username$ = this.store.select(getUserName)
constructor(private store: Store<IBooksState>, private router: Router) { }
}

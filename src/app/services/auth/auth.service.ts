import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IBooksState } from 'src/app/interfaces/books/books.state.interface';
import { getUserName } from 'src/app/state/books/books.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<IBooksState>, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select(getUserName).pipe(
      map(username => {
        if (username) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      })
    );
  }
}

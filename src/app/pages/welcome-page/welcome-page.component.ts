import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setUserName } from 'src/app/state/books/books.actions';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent {

  constructor(private store: Store, private router: Router) { }
  maxLenght: number = 20;
  username = new FormControl('', [Validators.required, Validators.maxLength(this.maxLenght)]);

  setUsername() {
  this.store.dispatch(setUserName({ username: this.username.value as string }))
  this.router.navigate(['/books/all'])
  }


}



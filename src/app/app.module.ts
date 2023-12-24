import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { WhitelistPageComponent } from './pages/whitelist-page/whitelist-page.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { BookDetailsModalComponent } from './components/books/book-details-modal/book-details-modal.component';
import { BookItemComponent } from './components/books/book-item/book-item.component';
import { BooksListComponent } from './components/books/books-list/books-list.component';
import { BookEffects } from './state/books/books.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { booksReducer } from './state/books/books.reducers'
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    WhitelistPageComponent,
    WelcomePageComponent,
    SearchPageComponent,
    BookDetailsModalComponent,
    BookItemComponent,
    BooksListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ books: booksReducer }),
    EffectsModule.forRoot([BookEffects]),
    HttpClientModule,
    StoreDevtoolsModule.instrument({}),
    RouterModule.forRoot(appRoutes)// Fix: Pass the routes defined in AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

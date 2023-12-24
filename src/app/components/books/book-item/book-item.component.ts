import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IBook } from 'src/app/interfaces/books/books.interface';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss']
})
export class BookItemComponent {
defaultBookImg: string = 'https://res.cloudinary.com/diqcy5uye/image/upload/v1703353113/whitebook_nvgoc8.png'
@Input() book!: IBook;
@Input() modalType = '';
@Output() removeFromWhitelistEv = new EventEmitter<string>()


  constructor(private router: Router) { }
  
  addToUrl(event: Event){
    event.stopPropagation();
    this.router.navigate([`/${this.modalType}/${this.book.id}`])
  }

  removeFromWhitelists() {
  this.removeFromWhitelistEv.emit(this.book.id)
  }
}


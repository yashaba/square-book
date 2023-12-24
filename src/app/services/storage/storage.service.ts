import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  

  constructor() { }

  static get(key: string) {
    const value = localStorage.getItem(key) 
    if (!value) return null
    if (key === 'username') return value
    return JSON.parse(value) 
  }

  static set(key: string, value: any) {
    if (typeof value !== 'string') value = JSON.stringify(value)
    localStorage.setItem(key, value)
  }
}

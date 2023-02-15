import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdGeneratorService {

  constructor() {}

  createId(length: number = 10): number{
    let id: number = 0;
    for(let i = 0; i < length; i++){
      id = id * 10 + Math.floor(Math.random() * 10);
    }
    return id;
  }
}

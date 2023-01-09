import { Injectable } from '@angular/core';

//Decorator that marks a class as available to be provided and injected as a dependency.
@Injectable({
//providedIn determines which injectors will provide the injectable.
  providedIn: 'root'
})

export class MessageService {
  messages: string[] = [];

  constructor() { }

  add(message:string){
     this.messages.push(message);
  }

  clear(){
    this.messages = [];
  }
}


import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudSessionService {
  private messageSource = new BehaviorSubject('ok');
  currentMessage = this.messageSource.asObservable();

  constructor() { }
  disconnected() {
    this.messageSource.next('disc')
  }
  getObservable() : Observable<string> {
    return this.currentMessage;
  }
}

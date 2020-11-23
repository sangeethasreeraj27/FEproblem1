import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  result = new BehaviorSubject(null);

  constructor() { }

  setResult(value) {
    this.result.next(value);
  }

}

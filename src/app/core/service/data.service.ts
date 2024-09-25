import { Component, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
 email = localStorage.getItem('email')
  private componentData = new BehaviorSubject(
    {
      "user" : this.email,
      "personal": {},
      "education": {},
      "professional": {},
      "others": {}
  }
  );
   compdata = this.componentData.asObservable();
  constructor() { 
    
  }
  CompdataUpdate(data: any){
    this.componentData.next(data)
  }
}

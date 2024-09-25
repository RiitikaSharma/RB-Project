import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {

  behaviordata = new BehaviorSubject(1);
  behavior =   new BehaviorSubject(1);
  mydata = new Subject();

  constructor(private http:HttpClient) { }
  getData(name:String){
    return this.http.get('assets/'+name+".json")
  }
  postResume(url:string, data:any){
    return this.http.post(url, data)
  }
  getUserResume(url:string){
    return this.http.get(url)
  }
  getResume(url : string){
    return this.http.get(url)
  }
  updateResume(url:string ,data:any){
   return this.http.put(url , data)
  }
  deleteResume(url:any){
    return this.http.delete(url)
  }
  deleteAllResume(url:any){
    return this.http.delete(url)
  }

}

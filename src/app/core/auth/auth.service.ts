import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http:HttpClient, private route : Router) { }

  postData(url:string, data:any){
    return this.http.post(url, data, this.noAuthHeader)
  }
  getData(url:any){
    return this.http.get(url)
  }
  
  getToken(){
    return localStorage.getItem('Token')
  }
  setToken(token: string){
    localStorage.setItem('Token',token)
  }
  deleteToken(){
    localStorage.clear()
    this.route.navigateByUrl('/useraccess')
  }

  getUserPayload() {
    var token = localStorage.getItem('Token');
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
    {
      return null;
    }
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
    {
      return userPayload.exp > Date.now() / 1000;
    }else
    {
      return false;
    }
  }


}

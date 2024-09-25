import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'RBproject';
  constructor(private http : HttpClient){
    // this.http.get('assets/education.json').subscribe(res=>console.log(res))
  }
}

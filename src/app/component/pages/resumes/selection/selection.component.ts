import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  sendFresher(){
    this.router.navigate(['/resume/add'], { state: { example: 'freshers' } });
  }
  sendExperience(){
    this.router.navigate(['/resume/add'], { state: { example: 'experience' } });
  }

}

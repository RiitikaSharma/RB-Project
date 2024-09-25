import { Component, OnInit,} from '@angular/core';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { Router} from '@angular/router';
import { MyserviceService } from 'src/app/core/service/myservice.service';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class CrudComponent implements OnInit {

  MyData:any;
  view:boolean=true;
  mat_card : boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );
 disabled: boolean = true;
 cat=1;
 person: any;
 screenHeight!: number;
 height!:number;
  isLinear = false;
  isNew !: boolean;
  resumeId !: string;

  professional_next(){
    this.cat = 4;
  }
  professional_back(){
    this.cat = 2;
  }

  constructor(private router: Router,
    private breakpointObserver: BreakpointObserver,
    private service: MyserviceService) {
    let data = this.router.getCurrentNavigation()?.extras?.state?.['example']
    // console.log(data)
    // var height = this.screenHeight;
    this.isHandset$.subscribe(res => this.view =! res)

    this.service.behaviordata.next(4)
    this.isHandset$.subscribe(res => this.view =!res)


    
      // this.service.getData('person'). subscribe(res=> {this.person = res
      //   console.log(this.person)})
    
  }


  //-------------------------------preview----------------------------------

  preview(){
    this.service.getData('person'). subscribe(res=> {this.person = res
      console.log(this.person)})
      this.mat_card = true;
  }

  ngOnInit(): void {
    
    var href = (this.router.url).split('/');
    // console.log(href[2])
    if(href[2] == 'add'){
      this.isNew = true
    }
    else if(href[2] == 'edit'){
      this.resumeId = href[3]
      this.isNew = false
      // console.log(this.resumeId)
    }

  }

 pagecontroller(page: number){
   var avail = 1
   this.service.behaviordata.subscribe( (res) => {
     console.log(res)
    avail = res
  }) 
  if (avail >= page){
    this.cat = page; 
  
  }
 }
  person_next() {
    this.cat=2
  }

  addEducation(){
    this.cat=3
  }
  backEducation(){
    this.cat=1
  }

  backOthers(){
    this.cat=3
  }
}

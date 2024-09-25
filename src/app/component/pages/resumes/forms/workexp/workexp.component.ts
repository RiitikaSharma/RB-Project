import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StepperOrientation, STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, Observable } from 'rxjs';
import { MyserviceService } from 'src/app/core/service/myservice.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { DataService } from 'src/app/core/service/data.service';

@Component({
  selector: 'app-workexp',
  templateUrl: './workexp.component.html',
  styleUrls: ['./workexp.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class WorkexpComponent implements OnInit {

  ischecked:boolean=false;
  objects:any =[];
  professional:any={}
  
  @Output() Next = new EventEmitter<string>();
  @Output() Back = new EventEmitter<string>();

  professional_next(){
    this.Next.emit();
    // this.professional = this.workexp.value
    let final:any
    this.data.compdata.subscribe(res=> {
    final = res  
    })
    final.professional = this.workexp.value
    this.data.CompdataUpdate(final)
    this.data.compdata.subscribe(res=>console.log(res))
  }
  professional_back(){
    this.Back.emit();
  }

  constructor(private _formBuilder: FormBuilder,
    public breakpointObserver : BreakpointObserver, 
    private service : MyserviceService,
    private data :DataService) {
      // console.log(this.disabled)
  }

 //..........FOR WORKEXP FORM FIELDS....................... 
  workexp: FormGroup=this._formBuilder.group({
    title: ['', [Validators.required]],
    fields: ['', [Validators.required]],
    organization: ['', [Validators.required]],
    location: ['', [Validators.required]],
    startmonth: ['', [Validators.required]],
    startyear: ['', [Validators.required]],
    endmonth: ['', [Validators.required]],
    endyear: ['', [Validators.required]],
    change :['', [Validators.required]],
  });

 //..........ERROR FUNCTION FOR ERROR MESSAGE FOR WORKEXP FORM....................... 
  get organization(){
    return this.workexp.get('organization')
  }
  get location(){
    return this.workexp.get('location')
  }
  get dow(){
    return this.workexp.get('dow')
  }
  get aow(){
    return this.workexp.get('aow')
  }

  remove(i:any){
    this.objects.splice(i,1);
    // console.log(this.objects.length)
  }

 

  reset(){
    this.workexp.reset();
  }
 



  ngOnInit(): void {
  }

 //..........FUNCTION FOR WORKEXP FORM....................... 
  submitWorkexp(value:any){
    console.log(this.workexp.value)
    this.objects.push(this.workexp.value)
    console.log(this.objects.length)
    localStorage.setItem("workexp_details", JSON.stringify(this.workexp.value)  )

   
  }


  hide(event:MatCheckboxChange):void {
    console.log(event.checked);
    this.ischecked = event.checked
    if(this.ischecked){
      
    }
 }

}

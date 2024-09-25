import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StepperOrientation, STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { MatDatepicker, } from '@angular/material/datepicker';
import { MyserviceService } from 'src/app/core/service/myservice.service';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/core/service/data.service';
@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class EducationComponent implements OnInit { 
  arr:any=[]
  formGroup: any;
  grid:any
  education :any={}
  
  @Output() next = new EventEmitter();
  @Output() back = new EventEmitter();

  constructor(private _formBuilder: FormBuilder,private service:MyserviceService,public breakpointObserver : BreakpointObserver,private data:DataService ){

  }
secondary: FormGroup=this._formBuilder.group({
  school: ['', [Validators.required]],
  degree: [''],
  field :['', ],
  starting: ['',],
  ending :['', ],
  grade :['', ],
});
  ngOnInit(): void {
    this.breakpointObserver
    .observe(['(max-width: 500px)'])
    .subscribe((state: BreakpointState) => {
    //  if(state.matches){
    //     console.log("condition matches")
    //  }
    //  else{
    //    console.log("not matches")
    //  }
    });
  }
  reset(){
     this.arr.push(this.secondary.value)
    this.secondary.reset();
  }
  submitSecondary(value:any){
    this.arr.push(this.secondary.value)
   
  }
delete(i:any){
  this.arr.splice(i,1);
}
preview(){
  this.service.getData('education').subscribe(res=>{this.education = res 
   })
}
closeDatePicker(elem: MatDatepicker<any>,) {
  elem.close();
  this.formGroup.get('ending').setValue(String(event).split(' ')[3]);
 }

 nextEducation() {
  this.next.emit();
  localStorage.setItem("education", JSON.stringify(this.secondary.value)  )
  // this.education = this.secondary.value
  let final:any
  this.data.compdata.subscribe(res=> {
  final = res  
  })
  final.education = this.secondary.value
  this.data.CompdataUpdate(final)
  this.data.compdata.subscribe(res=>console.log(res))
}

backEducation() {
  this.back.emit();
}


}
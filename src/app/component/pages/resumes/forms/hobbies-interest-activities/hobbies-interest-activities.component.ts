import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StepperOrientation, STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, Observable } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips'
import { Output, EventEmitter } from '@angular/core';
import { MyserviceService } from 'src/app/core/service/myservice.service';
import { api } from 'src/app/model/app.routes';
import { DataService } from 'src/app/core/service/data.service';

export interface Skill {
  name: string;
}
export interface Hobbies {
  type: string;
}


@Component({
  selector: 'app-hobbies-interest-activities',
  templateUrl: './hobbies-interest-activities.component.html',
  styleUrls: ['./hobbies-interest-activities.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})

export class HobbiesInterestActivitiesComponent implements OnInit {

  addOnBlur = true;
  addOnHobbies =true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  skills: Skill[] = [];
  hobbies : Hobbies[] =[];
  checked = false;
  email:any;
  othersData:any = {
    ProjectDetails : {},
    SkillsDetails : {},
    CertificationDetails : {},
    HobbiesDetails : {}
  }

  @Output() back = new EventEmitter();

  // For skills
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.skills.push({name: value});
    }
    event.chipInput!.clear();
  }

  remove(skill: Skill): void {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }
  
// for hobbies
  addHobbies(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    
    if (value) {
      this.hobbies.push({type: value});
    }

    event.chipInput!.clear();
  }

  removeHobbies(hobbies: Hobbies): void {
    const index = this.hobbies.indexOf(hobbies);

    if (index >= 0) {
      this.hobbies.splice(index, 1);
    }
  }

  //stepper
  stepperOrientation: Observable<StepperOrientation>;
  constructor(private _formBuilder : FormBuilder,
    public breakpointObserver : BreakpointObserver,
    private service : MyserviceService ,
    private data : DataService
    ) {
      
    //..........STEPPER STEPPERORIENTATION HORIZONTAL TO VERTICAL.......................   
    this.stepperOrientation = breakpointObserver
    .observe('(min-width: 800px)')
    .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

 //..........FOR PROJECT FORM FIELDS....................... 
  project: FormGroup=this._formBuilder.group({
    name: ['', ],
    tools: ['', ],
    description: ['',],
    
  });
  
  
 //..........FOR Skills FORM FIELDS....................... 
  skill: FormGroup=this._formBuilder.group({
    skill1: [],
  });
 
 //..........Certificate FORM FIELDS.......................  
  certificate: FormGroup=this._formBuilder.group({
    name: [''],
    company: [''],
    duration: [''],
    mode: [''], 
  });

  hobby: FormGroup=this._formBuilder.group({
    hobby1: [''],
    
  });
  ngOnInit(): void {
     this.email = localStorage.getItem('email')
      this.service.getUserResume(api.resume.getUserResume+this.email).subscribe(res =>{
      console.log(res)
    })
  }

 //..........FUNCTION FOR Project Details....................... 
  projectExp(value:any){
    // console.log(this.project.value)
    localStorage.setItem("ProjectEXp", JSON.stringify(this.project.value)  )
    this.othersData.ProjectDetails = this.project.value
  }

  reset(){
   this.project.reset();
 }
 //..........FUNCTION FOR SKILLS FORM.......................
  submitSkills(value:any){
    // console.log(this.skills)
    localStorage.setItem("Skills", JSON.stringify(this.skills)  )
    this.othersData.SkillsDetails = this.skills
  }
 //..........FUNCTION FOR STRENGTH FORM.......................
  submitCertificate(value:any){
    // console.log(this.certificate.value)
    localStorage.setItem("Certificates", JSON.stringify(this.certificate.value)  )
    this.othersData.CertificationDetails = this.certificate.value
  }

  resetCertificate(){
    this.certificate.reset();
  }
  
  submitHobbies(value:any){
   

    localStorage.setItem("Hobbies", JSON.stringify(this.hobbies))
    this.othersData.HobbiesDetails = this.hobbies
    let final:any
    this.data.compdata.subscribe(res=> {
    final = res  
    })
    final.others = this.othersData
    this.data.CompdataUpdate(final)
    // this.data.compdata.subscribe(res=>console.log(res))

    this.service.postResume(api.resume.uploadResume, final).subscribe(res=>{
      // console.log(res)
      // this.data.compdata.subscribe(res=>console.log(res))
    })
    
  }

  backOthers() {
    this.back.emit();
  }
  
 
  }




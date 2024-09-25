import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl, FormArray} from '@angular/forms';
import {StepperOrientation, STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, Observable } from 'rxjs';
import { MyserviceService } from 'src/app/core/service/myservice.service';
import { HttpClient } from '@angular/common/http';
import { Output, EventEmitter } from '@angular/core';
import { api } from 'src/app/model/app.routes';
import { DataService } from 'src/app/core/service/data.service';


@Component({
  selector: 'app-personalinfo',
  templateUrl: './personalinfo.component.html',
  styleUrls: ['./personalinfo.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class PersonalinfoComponent implements OnInit {
  stepperOrientation: Observable<StepperOrientation>;
  counter = 1;
  @Output() Next = new EventEmitter();
  person:any;
  personals: boolean = false;
  addresss: boolean = false;
  socials: boolean = false;
  objectives: boolean = false;
  personalData:any = {
    PersonalDetails : {},
    addressDetails : {},
    socialDetails : {},
    objectiveDetails : {}
  }
  currentUserEmail :any

  constructor(private _formBuilder: FormBuilder,
    public breakpointObserver : BreakpointObserver, 
    private service:MyserviceService,
    private data : DataService,
    private http : HttpClient) {
   //..........STEPPER STEPPERORIENTATION HORIZONTAL TO VERTICAL.......................    
    this.stepperOrientation = breakpointObserver
    .observe('(min-width: 800px)')
    .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  
   }
   
  //..........FOR PERSONAL FORM FIELDS....................... 
  personal: FormGroup=this._formBuilder.group({
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    parentname: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    contact: ['', [Validators.required,Validators.pattern("[0-9 ]{10}")]],
     img: ['',]
  });

  //url
	url: any; 
	msg = "";
  msgs = "";

	
	selectFile(event: any) { 
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msgs = "loaded sucessfully";
			this.url = reader.result; 
		}
	}
	


 //..........ERROR FUNCTION FOR ERROR MESSAGE FOR PERSONAL FORM....................... 
  get name(){
    return this.personal.get('name')
  }
  get fathersname(){
    return this.personal.get('fathername')
  }
  get mothersname(){
    return this.personal.get('mothername')
  }
  get dob(){
    return this.personal.get('dob')
  }
  get contact(){
    return this.personal.get('contact')
  }
  get email(){
    return this.personal.get('email')
  }

  //..........FOR ADDRESS FORM FIELDS....................... 
  address: FormGroup=this._formBuilder.group({
    country: ['', [Validators.required]],
    state: ['', [Validators.required]],
    pincode: ['', [Validators.required]],
    flat:['', [Validators.required]],
    area: ['',],
    town: ['', [Validators.required]],
    
  });

  
  

  //..........FOR SOCIAL FORM FIELDS....................... 
  social : FormGroup = this._formBuilder.group ({
    contact : this._formBuilder.array([
      this.addnew(),this.addnew(),this.addnew()
    ])  
  });

  get getcontacts (){
    return this.social.get('contact') as FormArray
  }

  add(): void {
    (<FormArray>this.social.get('contact')).push(this.addnew());
  }
  addnew(): FormGroup {
    return this._formBuilder.group({
      contacts: ['', [Validators.required]],
      url: ['', [Validators.required]],
    })
  }
  remove(i: any){

    const count = (<FormArray>this.social.get('contact')).length;
    console.log(count);
    if(count > 3){
    (<FormArray>this.social.get('contact')).removeAt(i);
  }
  else{
    console.log("false")
  }
  }
  //..........FOR OBJECTIVE FORM FIELDS....................... 
  objective: FormGroup=this._formBuilder.group({

    objective: ['', [Validators.required]],

    
  });

  // preview(){
  //   this.service.getData('person'). subscribe(res=> {this.person = res
  //     console.log(this.person)})
  // }

  ngOnInit(): void {
    // this.service.getData('person'). subscribe(res=> {this.person = res
    // console.log(this.person)})
    // console.log(this.getcontacts?.controls)
    // this.http.get('assets/person.json').subscribe(res=>console.log(res))
    
  }


  //..........FUNCTION FOR PERSONAL FORM....................... 
  submitPersonal(value:any){
    localStorage.setItem("personal_details", JSON.stringify(this.personal.value)  )
    this.personalData.PersonalDetails = this.personal.value
  }


 //..........FUNCTION FOR ADDRESS FORM....................... 
  submitAddress(value:any){
    localStorage.setItem("address_details", JSON.stringify(this.address.value)  )
    this.personalData.addressDetails = this.address.value
  }

 //..........FUNCTION FOR SOCIAL FORM....................... 
  submitSocial(value:any){
    localStorage.setItem("social_details", JSON.stringify(this.social.value)  )
    this.personalData.socialDetails = this.social.value
  }

 //..........FUNCTION FOR OBJECTIVE FORM....................... 
  submitObjective(value:any){
    localStorage.setItem("objective_details", JSON.stringify(this.objective.value)  )
    this.personalData.objectiveDetails = this.objective.value
    let final:any
    this.data.compdata.subscribe(res=> {
    final = res  
    })
    final.personal = this.personalData
    this.data.CompdataUpdate(final)
    // this.data.compdata.subscribe(res=>console.log(res))
  }

 //..........FUNCTION FOR CHECKING ALL FORM IS VALID OR NOT....................... 
  valid(){
    if(this.personal.valid && this.address.valid && this.social && this.objective){
       
      this.service.behaviordata.next(2)
      
    }
  }

  person_next() {
    this.Next.emit();
  }
  show1(){
    this.personals = true;
  }
  show2(){
    this.addresss = true;
  }
  show3(){
    this.socials = true;
  }
  show4(){
    this.objectives = true;
  }
  
}

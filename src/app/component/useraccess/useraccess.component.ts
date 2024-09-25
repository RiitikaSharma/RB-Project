import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router } from '@angular/router';
import { api } from 'src/app/model/app.routes';
@Component({
  selector: 'app-useraccess',
  templateUrl: './useraccess.component.html',
  styleUrls: ['./useraccess.component.scss']
})
export class UseraccessComponent implements OnInit {
  sidepage = false;

  constructor(private fb : FormBuilder, private auth : AuthService , private router : Router) { }

  formControl : FormGroup = this.fb.group({
    fullName: ['',[Validators.required]],
    email:['',[Validators.required]],
    password:['',[Validators.required]]   
    });


    get fullName(){
      return this.formControl.get('fullName')
    }

    get email(){
      return this.formControl.get('email')
    }
  
    get password(){
      return this.formControl.get('password')
    }

  ngOnInit(): void {
  }
  Login(){
    var data = this.formControl.value
    this.auth.postData(api.user.login, {email: data.email, password: data.password })
    .subscribe(
      (res: any) =>{
         console.log(res)
         localStorage.setItem('Token', res.token)
         this.router.navigate(['/dashboard'])
      },
      err => console.log(err)
    )
  }
  Register(){
    this.auth.postData(api.user.register, this.formControl.value )
      .subscribe(
       (res:any)=>{
          console.log(res)  
          this.sidepage = !this.sidepage;
        },
        err => console.log(err)
      )
  }
  pagechange(){
    this.sidepage = !this.sidepage
  }

}

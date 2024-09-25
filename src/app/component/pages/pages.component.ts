import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth/auth.service';
import { api } from 'src/app/model/app.routes';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent {
  select : boolean =false
  currentUser:any;
  rotate :boolean = true;
  isExpandable:boolean = true;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches ),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private auth : AuthService) {
    // console.log(this.isHandset$.subscribe(res=>console.log(res)))
    this.isHandset$.subscribe(res => this.isExpandable =! res)
    this.isHandset$.subscribe(res  => this.rotate =! res)

    if(this.isExpandable = true){
       setTimeout(() => { this.isExpandable =! this.isExpandable;  this.rotate =! this.rotate;}, 10000);
      // setTimeout(() => { console.log("World!"); }, 20);
   }
  }

  ngOnInit(): void {
    this.auth.getData(api.user.userprofile)
    .subscribe( 
      (res: any) => {
        // console.log(res)
        localStorage.setItem('user', res.user.fullName)
        this.currentUser = res.user.fullName
      }
      )
      // console.log(this.currentUser)

      
  }

  SignOut(){
    this.auth.deleteToken()
  }
  extendable(){
    this.isExpandable=!this.isExpandable
    if(this.isExpandable == true){
      setTimeout(() => { this.isExpandable =! this.isExpandable; this.rotate =! this.rotate}, 15000);

    }
  }
}



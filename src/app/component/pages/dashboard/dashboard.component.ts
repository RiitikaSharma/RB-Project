import { Component, OnInit, ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { api } from 'src/app/model/app.routes';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router } from '@angular/router';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Sort, MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';




export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

 export const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},

];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  

  currentUser:any;

  send(){
    this.router.navigate(['/selection'], { state: { example: 'selection' } });
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  constructor( private my : AuthService,
               private router :Router,
               private _liveAnnouncer: LiveAnnouncer,) {

   }
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;
 

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
    
  

  }

  announceSortChange(sortState: Sort){
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit(): void {  
    // console.log(this.dataSource)
    // console.log(this.displayedColumns)

    this.my.getData(api.user.userprofile)
    .subscribe( 
      (res: any) => {
        console.log(res)
        // this.dataSource == res;
        localStorage.setItem('user', res.user.fullName)
        localStorage.setItem('email', res.user.email)
        this.currentUser = res.user.fullName
      }
      )
  }

  clear(){
    this.router.navigate(['/useraccess'])
  }

  edit(index:any){
    this.router.navigate(["resume/edit/"+index.position])
  }
  delete(index: any){
    alert(index.name)
    this.my.getData(api.user.userprofile)
    .subscribe( 
      (res: any) => {
        console.log(res.user)
      }
      )
  }



 selectedname: string = "";
 selectednameControl = new FormControl(this.selectedname);


}

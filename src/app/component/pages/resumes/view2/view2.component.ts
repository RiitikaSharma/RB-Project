import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'src/app/core/service/myservice.service';

@Component({
  selector: 'app-view2',
  templateUrl: './view2.component.html',
  styleUrls: ['./view2.component.scss']
})
export class View2Component implements OnInit {
  person:any
  education:any=[]
  divContents:any
  printWindow:any
  constructor(private service : MyserviceService) { }

  ngOnInit(): void {
    this.service.getData('person').subscribe(res=>{this.person = res 
    })
    this.service.getData('education').subscribe(res2=>{this.education = res2
    })
    }
  print(contain:any){
    this.divContents = document.getElementById(contain)?.innerHTML;
    // this.printWindow =window.open('', '', 'height=500, width=500');
    this.printWindow = document.body.innerHTML;
    document.body.innerHTML= this.divContents;
    window.print();
    // this.printWindow.print();
    document.body.innerHTML = this.printWindow;
    // this.printWindow.print();
    // console.log(contain)
    window.location.reload()
   
  }

    name = localStorage.getItem('personal_details')

}

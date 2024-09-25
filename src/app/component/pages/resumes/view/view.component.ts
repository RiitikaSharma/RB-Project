import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'src/app/core/service/myservice.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  data:any;
  person: any;
  element!: HTMLElement;
  constructor( private service : MyserviceService) { }

  ngOnInit(): void {

    this.service.getData('person'). subscribe(res=> {this.person = res
      // console.log(this.person)
    })
  }
  

  printDiv(print_div : any) {
    var printContents = (<HTMLInputElement>document.getElementById("print_div")).innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = "<html><head><title></title></head><body>" + printContents + "</body>";
    window.print();
    document.body.innerHTML = originalContents;
}
}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataserviceService } from '../../services/dataservice.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import  {DatePipe } from '@angular/common';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';
import {RegistryService} from '../../services/registry.service';

@Component({
  selector: 'app-createregistry',
  templateUrl: './createregistry.component.html',
  styleUrls: ['./createregistry.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreateregistryComponent implements OnInit {

  date:number;
  year:string;
  day:string;
  month:string;

  minDate={
    year: 0,
    month: 0,
    day: 0
  };
  
  user = {
    firstName: 'Rahul',
    lastName: 'Sengupta',
    regUrl: 'ras.pi/',
    registryDate: '',
    regName: ''
  };

  userId:number=0;
  constructor(
    private dataService: DataserviceService,
    private flashMessageService: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute,
    private registryService: RegistryService
  ) { }
  
  ngOnInit() {
    this.user.regName = this.route.snapshot.params['regName'];
    console.log(this.user.regName.valueOf());
    
    this.dataService.currentMessage.subscribe(message => {
      // this.user.regUrl+=message;
      // this.user.regName = message;
      this.userId = message;
    });

    let datePipe = new DatePipe('en-US');
    this.date = Date.now();
    this.minDate = {
      year: parseInt( datePipe.transform(this.date,'yyyy')),
      month: parseInt(datePipe.transform(this.date,'MM')),
      day: parseInt(datePipe.transform(this.date,'dd'))
    };
    
  }

  onSubmit({value,valid}:{value: any, valid: boolean}){
    if(valid){  
      this.flashMessageService.show('Registry successfuly created',{cssClass: 'alert-success',timeout:3000});
      this.registryService.changeMessage(value);
      this.router.navigate(['view-registry']);
    } else{
      this.flashMessageService.show('Please fill all the fields and try again.',{cssClass: 'alert-danger',timeout:3000});
      this.router.navigate(['/create-registry/'+' ']);
    }
  }


}

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
  userData:any;
  spinner:boolean=false;
constructor(private http:HttpClient,
  private employee_service:EmployeeService){
  

}
submit(){
  this.spinner=true;
  const data={
    'id':1,
    'name':'siva'
  }
  this.employee_service.postUser(data).subscribe(data=>{
    console.log("Data",data);
    this.userData=data;
    this.spinner=false;
    this.getUserInfo();
  },(error)=>{
    console.error(error);
  })
}

getUserInfo(){
  // this.httprequest
  // functionName()
}
 functionName(){

}

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http:HttpClient
  ) {
   
   }
   postUser(data:any){
    const headers=new HttpHeaders({
      'content-type':'application/json',
      'authorization':"Bearer Token"
    })
    return this.http.post("url",data,{headers})
  }
}

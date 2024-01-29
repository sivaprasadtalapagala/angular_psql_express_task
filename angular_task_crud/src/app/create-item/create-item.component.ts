import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Item } from '../item.model';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent {
newItem: Item = { id: 0, name: '', description: '' };

itemForm: any;

constructor(private fb: FormBuilder,
  private itemService:ItemService,
  private http:HttpClient) { }

ngOnInit() {
  this.itemForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required]
  });
}

createItem() {
  // Implement your createItem logic here using this.itemForm.value
  console.log(this.itemForm.value);
  // this.itemService.createItem(this.itemForm.value as Item).subscribe((data) => {
  //   console.log("success data",data)
  //   //handle success message and error messages based on response
  // });
  this.http.post<Item>(`http://localhost:3000/api/items`, this.itemForm.value).subscribe(data => {
    console.log("api res",data);
  });
  
  
}

cancel() {
  // Implement your cancel logic here
  this.itemForm.reset()
}
}

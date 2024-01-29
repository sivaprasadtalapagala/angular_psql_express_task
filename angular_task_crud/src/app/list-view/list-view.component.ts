import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../item.model';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent {
  items: any;

  constructor(private itemService: ItemService, private router: Router,
    private http:HttpClient) {}

  ngOnInit(): void {
    // this.itemService.getItems().subscribe((items) => {
    //   this.items = items;


    // });
    this.http.get<Item>(`http://localhost:3000/api/items`).subscribe(data => {
      console.log("api get res",data);
      this.items=data;
    });
    // this.items = [
    //   { id: 1, name: 'Item 1', description: 'Description for Item 1' },
    //   { id: 2, name: 'Item 2', description: 'Description for Item 2' },
    //   { id: 3, name: 'Item 3', description: 'Description for Item 3' },
    //   // Add more items as needed
    // ];
  }

  viewDetails(id: number): void {
    this.router.navigate(['/detail', id]);
  }

  createItem(): void {
    this.router.navigate(['/create']);
  }

  updateItem(id: number): void {
    this.router.navigate(['/update', id]);
  }

  deleteItem(id: number): void {
    // Implement delete confirmation logic if needed
    if (confirm('Are you sure you want to delete this item?')) {
      // this.itemService.deleteItem(id).subscribe(() => {
      //   // Refresh the list after deletion
      //   this.ngOnInit();
      // });
      this.http.delete<Item>(`http://localhost:3000/api/items/${id}`).subscribe((data: any) => {
        console.log("api delete by id res",data);
        this.ngOnInit();
    
      });
    }
  }
}

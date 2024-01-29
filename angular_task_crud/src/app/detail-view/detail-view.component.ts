import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../item.model';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css']
})
export class DetailViewComponent {
  // item: Item | undefined;
   item={
    'name':'siva',
    'description':"vdfdf"
  }
  constructor(private route: ActivatedRoute, private itemService: ItemService,
    private http: HttpClient) {}

  ngOnInit(): void {
    const itemId = Number(this.route.snapshot.paramMap.get('id'));
    // this.itemService.getItemById(itemId).subscribe((item: any) => {
    //   this.item = item;
    // });
    this.http.get<Item>(`http://localhost:3000/api/items/${itemId}`).subscribe((data: any) => {
      console.log("api get by id res",data);
      // this.items=data;
      this.item=data
    });
   
  }
}

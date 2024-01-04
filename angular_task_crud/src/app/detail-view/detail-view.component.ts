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
  constructor(private route: ActivatedRoute, private itemService: ItemService) {}

  ngOnInit(): void {
    const itemId = Number(this.route.snapshot.paramMap.get('id'));
    this.itemService.getItemById(itemId).subscribe((item: any) => {
      this.item = item;
    });
   
  }
}

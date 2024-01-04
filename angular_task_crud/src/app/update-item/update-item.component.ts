import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../item.model';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css']
})
export class UpdateItemComponent {
  itemId: number | undefined;
  currentItem: Item = { id: 0, name: '', description: '' };
  itemForm: any;
  constructor(private route: ActivatedRoute, private router: Router, private itemService: ItemService,
    private fb:FormBuilder) {}

  ngOnInit(): void {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.itemId = Number(this.route.snapshot.paramMap.get('id'));
    this.itemService.getItemById(this.itemId).subscribe((item: any) => {
      this.currentItem = item;
    });
  }

  updateItem(): void {
    console.log("updated items",this.itemForm.value)
    this.itemService.updateItem(this.currentItem).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}

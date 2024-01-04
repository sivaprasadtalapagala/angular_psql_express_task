import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateItemComponent } from './create-item/create-item.component';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { ListViewComponent } from './list-view/list-view.component';
import { UpdateItemComponent } from './update-item/update-item.component';

const routes: Routes = [
  { path: '', component: ListViewComponent },
  { path: 'detail/:id', component: DetailViewComponent },
  { path: 'create', component: CreateItemComponent },
  { path: 'update/:id', component: UpdateItemComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

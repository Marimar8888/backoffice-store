import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { CategoryComponent } from './category/category.component';
import { ItemComponent } from './item/item.component';


@NgModule({
  declarations: [
    CategoryComponent,
    ItemComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }

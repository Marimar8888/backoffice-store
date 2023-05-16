import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../service/item.service';
import { Item } from '../modelo/item.model';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit{

  items: Item [] = [];
  categoryId?: number;
  title: string ="";

  constructor(private route: ActivatedRoute,
              private itemService: ItemService){}

  ngOnInit(): void {
    if(this.route.snapshot.paramMap.get("categoryId")){
      //Para cambiar un number a cadera poniendo un + delante y ! por que puede ser nulo
      this.categoryId=+this.route.snapshot.paramMap.get("categoryId")!;
      this.title = "Artículos de la categoría "+ this.categoryId;
      this.getAllItemsInCategoryId(this.categoryId);
    }else{
      this.title = "Lista de artículos";
      this.getAllItems();
    }
  }
  private getAllItems(): void{
    this.itemService.getAllItems().subscribe ({
      next: (itemsRequest) => { this.items = itemsRequest; },
      error: (err) => { this.handleError(err); }
    })
  }
  private getAllItemsInCategoryId(categoryId: number): void{
    this.itemService.getAllItemsByCategoryId(categoryId).subscribe ({
      next: (itemsRequest) => { this.items = itemsRequest; },
      error: (err) => { this.handleError(err); }
    })
  }

  private handleError(error: any): void{
    //Lo que queramos que haga por ejemplo mostrar un alert al usuario
  }



}

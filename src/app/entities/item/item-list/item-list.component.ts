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

  page: number =0;
  size: number = 25;
  sort: string = "name,asc";

  first: boolean = false;
  last: boolean = false;
  totalPages: number = 0;
  totalElements: number = 0;
  nameFilter?: string;
  priceFilter?: number;


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
    const filters : string | undefined = this.buildFilters();

    this.itemService.getAllItems(this.page, this.size, this.sort, filters).subscribe ({
      next: (data:any) => {
        this.items = data.content;
        this.first = data.first;
        this.last = data.last;
        this.totalPages = data.totalPages;
        this.totalElements = data.totalElements;
      },
      error: (err) => { this.handleError(err); }
    })
    console.log(this.items);
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

  public nextPage():void{
    this.page = this.page+1;
    this.getAllItems();
  }

  public previousPage():void{
    this.page = this.page-1;
    this.getAllItems();
  }

  public searchByFilters():void{
    this.getAllItems();
  }

  //Crear una clase especifica para este método
  private buildFilters():string|undefined{

    const filters: string[] = [];

    if(this.nameFilter){ //Nombre igual o que contenga
      filters.push("name:MATCH:" + this.nameFilter);
    }
    if(this.priceFilter){ //precio menor o igual
      filters.push("price:LESS_THAN_EQUAL:" + this.priceFilter);
    }

    if(filters.length>0){
      let globalFilters: string = "";
      for(let filter of filters){
        globalFilters = globalFilters + filter + ",";
      }
      //para eliminar la última coma del string generado
      globalFilters = globalFilters.substring(0, globalFilters.length-1);
      return globalFilters;
    }else{
      return undefined;
    }
  }


}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { ItemService } from '../service/item.service';
import { Item } from '../modelo/item.model';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {
  mode: "NEW" | "UPDATE" = "NEW";
  itemId?: number;
  item?: Item;

  constructor(private route: ActivatedRoute,
              private itemService: ItemService
              ){}
  ngOnInit(): void {

    const entreParam: string = this.route.snapshot.paramMap.get("itemId") ?? "new";

    if(entreParam !== "new"){
      this.itemId = +this.route.snapshot.paramMap.get("itemId")!;
      this.mode = "UPDATE";
      this.getItemById(this.itemId);
    }else{
      this.mode = "NEW";
      this.initializeItem();
    }
  }
  private getItemById(itemId: number){
    this.itemService.getItemById(itemId).subscribe({
      next: (itemRequest) =>{this.item = itemRequest},
      error: (err) => {this.handleError(err);}
    });
  }

  private initializeItem(): void{
    this.item = new Item(undefined, "", 0);
  }

  public saveItem():void{
    if(this.mode == "NEW"){
      this.insertItem();
    }

    if(this.mode == "UPDATE"){
      this.updateItem();
    }
  }

  private insertItem():void{
    this.itemService.insertItem(this.item!).subscribe({
      next: (itemInserted) => {
        console.log("insertado correctamente");
        console.log(itemInserted);
      },
      error: (err) => {this.handleError(err);}
    });
  }

  private updateItem():void{
    this.itemService.updatetItem(this.item!).subscribe({
      next: (itemUpdate) => {
      console.log("Actualizado correctamente");
      console.log(itemUpdate);
    },
    error: (err) => {this.handleError(err);}
  });
  }

  private handleError(err: any): void{
    //Lo que queramos que vea el usuario un alert....
  }
}

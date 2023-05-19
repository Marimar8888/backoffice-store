import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { ItemService } from '../service/item.service';
import { Item } from '../modelo/item.model';
import { Category } from '../../category/model/category.model';
import { CategoryService } from '../../category/service/category.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {
  mode: "NEW" | "UPDATE" = "NEW";
  itemId?: number;
  item?: Item;
  selectedCategory?: Category;
  categories: Category[] = [];

  constructor(private route: ActivatedRoute,
              private itemService: ItemService,
              private categoryService: CategoryService
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
      next: (itemRequest) =>{
        this.item = itemRequest;
        this.selectedCategory = new Category(itemRequest.categoryId!, itemRequest.categoryName!);
      },
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

  public getAllCategories(event?:any):void{
    let categorySearch: string | undefined;
    if(event?.query){
      categorySearch = event.query;
    }
    this.categoryService.getAllCategories(categorySearch).subscribe({
      next: (categoriesFiltered) => {this.categories = categoriesFiltered;},
      error: (err) => {this.handleError(err);}
    })
  }

  public categorySelected():void{
    this.item!.categoryId = this.selectedCategory!.id;
    this.item!.categoryName = this.selectedCategory!.name;
  }

  public categoryUnselected():void{
    this.item!.categoryId = undefined;
    this.item!.categoryName = undefined;
  }

  public includeImageInItem(event: any): void{
    const inputFile = event.target as HTMLInputElement;
    const file: File | null = inputFile.files?.item(0) ?? null;

    this.readFileAsString(file!).then(
      (result) => {
        const imageType: string = this.getImageType(result);
        console.log(imageType);
        const imageBase64: string = this.getImageBase64(result);
        console.log(imageBase64);
        this.item!.image = imageBase64;
      },
      (error) => {
        console.log("No se pudo cargar el archivo");
      }
    )
  }

  public getImageType(imageString: string): string{
    const imageStringParts: string[] =imageString.split(",");
    if(imageStringParts.length == 2){
      return imageStringParts[0];
    }else{
      console.log("No es un fichero correcto.");
      return ""
    }
  }
  public getImageBase64(imageString: string): string{
    const imageStringParts: string[] =imageString.split(",");
    if(imageStringParts.length == 2){
      return imageStringParts[1];
    }else{
      console.log("No es un fichero correcto.");
      return "";
    }
  }



  private readFileAsString(file:File) {
    return new Promise<string>(function(resolve, reject){
      let reader: FileReader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(){
        resolve(this.result as string)
      }
    })
  }

  private handleError(err: any): void{
    //Lo que queramos que vea el usuario un alert....
  }
}

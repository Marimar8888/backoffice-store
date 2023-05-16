import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../modelo/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private httpClient: HttpClient   ) { }

  public getAllItems(): Observable<Item[]>{
    const urlEndpoint: string = "http://localhost:8080/store/items";
    return this.httpClient.get<Item[]>(urlEndpoint);
  }
  public getAllItemsByCategoryId(categoryId: number): Observable<Item[]>{
    const urlEndpoint: string = "http://localhost:8080/store/categories/" + categoryId + "/items";
    return this.httpClient.get<Item[]>(urlEndpoint);
  }


}

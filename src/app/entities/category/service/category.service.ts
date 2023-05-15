import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../model/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient   ) { }

  public getAllCategories(): Observable<Category[]>{

    const urlEndpoint: string = "http://localhost:8080/store/categories";
    return this.httpClient.get<Category[]>(urlEndpoint);

  }
}

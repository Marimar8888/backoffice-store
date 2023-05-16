export class Item{
  id: number | undefined;
  name: string;
  price: number;
  description?: string;
  image?: string;

  constructor(id: number, name: string, price: number, description?: string, image?: string){
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.image = image;

  }
}

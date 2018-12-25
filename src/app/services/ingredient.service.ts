import { Injectable} from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  public startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    {name: 'Apple', amount: 10},
    {name: 'Orange', amount: 7}
  ];
  constructor() {}
  public ingredientChange = new Subject<Ingredient[]>();
  getIngredient() {
    return this.ingredients.slice();
  }
  private updateIngredientList() {
    this.ingredientChange.next(this.ingredients.slice());
  }
  addIngredient(item: Ingredient) {
    this.ingredients.push(item);
    this.updateIngredientList();
  }
  getIngredientByIndex(index: number) {
    return this.ingredients[index];
  }
  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.updateIngredientList();
  }
  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.updateIngredientList();
  }
}

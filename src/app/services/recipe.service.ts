import { Subject, Observable } from 'rxjs';
import { DatabaseService } from './database.service';
import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private _recipe$: Subject<Recipe[]> = new Subject();

  constructor(private databaseService: DatabaseService) {}
  recipe: Recipe[] = [
        // tslint:disable-next-line:max-line-length
    new Recipe('Musakhan', 'Musakhan is a Palestinian cuisine dish, composed of roasted chicken baked with onions, sumac, allspice, saffron, and fried pine nuts served over taboon bread. It is also known as muhammar. It is often considered the national dish of Palestine.', 'http://dubaieye1038.com/wp-content/uploads/2014/07/musakhan.jpg',
    [
      {name: 'Chicken', amount: 2},
      {name: 'Sumac', amount: 3},
      {name: 'Onion', amount: 2},
      {name: 'Taboon bread', amount: 3},
      {name: 'Olive oil', amount: 2},
    ]),
    // tslint:disable-next-line:max-line-length
    new Recipe('Baklava', 'Baklava is a rich, sweet dessert pastry made of layers of filo filled with chopped nuts and sweetened and held together with syrup or honey. It is characteristic of the cuisines of the Levant, the Caucasus, Balkans, Maghreb, and of Central and West Asia.', 'https://d3cizcpymoenau.cloudfront.net/images/25879/SFS_Baklava_026.jpg',
    [
      {name: 'Filo dough', amount: 2},
      {name: 'Nuts', amount: 20},
      {name: 'Sugar', amount: 1},
    ]),
    // tslint:disable-next-line:max-line-length
    new Recipe('Biriyani', 'Biryani, also known as biriyani, biriani, birani or briyani, is a mixed rice dish with its origins among the Muslims of the Indian subcontinent. It is popular throughout the Indian subcontinent as well as among the diaspora from the region. It is made with Indian spices, rice, meat, vegetables or eggs.', 'http://aleidrestaurant.com/wp-content/uploads/2017/04/2.Mutton-biriyani-1-1.jpg',
    [
      {name: 'Meat', amount: 1},
      {name: 'Rice', amount: 1},
      {name: 'Onion', amount: 4},
      {name: 'Garlic', amount: 1},
    ])
  ];

  getRecipeByIndex(index: number) {
    return this.recipe[index];
  }
  addRecipe(recipe: Recipe) {
    this.recipe.push(recipe);
    this.update();
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipe[index] = newRecipe;
    if (index > 2) {
      this.update();
    } else {
      this.emitRecipe(this.recipe);
    }

  }

  deleteRecipe(index: number) {
    this.recipe.splice(index, 1);
    this.emitRecipe(this.recipe);
    // this.update();
  }

  getRecipe(): Observable<Recipe[]> {
    return this._recipe$.asObservable();
  }
  emitRecipe(recipes: Recipe[]): void {
    this._recipe$.next(recipes);
  }

  private update() {
    this.databaseService.saveRecipe(this.recipe);
    this.emitRecipe(this.recipe);
  }
}
